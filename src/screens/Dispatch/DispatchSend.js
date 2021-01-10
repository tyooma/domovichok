import { Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import firestore from '@react-native-firebase/firestore';
import RNSmtpMailer from "react-native-smtp-mailer";


const dbDispatch = 'Indication';
const dbPeriod = 'constants';

const smtpHost = 'smtp.gmail.com';
const smtpPort = '465';
const ssl = true;
const userName = 'mobile.user.office';
const userPassword = 'ASDqwe123';
const emailFrom = 'mobile.user.office@gmail.com';

// const emailTo = 'watercounters@gmail.com';
// const emailTo = 'api-tester@email.ua'; // FOR DEV
const emailTo = 'pochta26779@gmail.com'; // FOR TEST

export const SendFirebase = async (dispatch) => {
  return await firestore().collection(dbDispatch).add(dispatch).then((data) => {
    if (data.id && data.id.length>0) {
      console.log('SendFirebase => Firestore Add Success => ID:', data.id);
      console.log('-------------------------------------------------------------------------');
      return { status: true, details: 'Firebase: Add Data Success' };
    } else {
      console.log(`Firebase: Error with Inserted ID: ${data.id}`);
      return { status: false, details: `Firebase: Error with Inserted ID: ${data.id}` };
    }
  }).catch((error) => {
    console.log(`Firebase: Add in Collection Error: ${error}`);
    return { status: false, details: `Firebase: Add in Collection Error: ${error}` };
  });
}

//----------------------------------------------------------------------------------------------------------------

export const SendMail = async (dispatch) => {
  return await RNSmtpMailer.sendMail({
    mailhost: smtpHost,
    port: smtpPort,
    ssl: ssl,
    username: userName,
    password: userPassword,
    from: emailFrom,
    recipients: emailTo,
    subject: getEmailSubject(),
    htmlBody: getEmailBody(dispatch),
    attachmentPaths: [],
    attachmentNames: [],
    attachmentTypes: [],
  }).then(success => {
    console.log('sendDispatch => SendMail:', success.status);
    console.log('-------------------------------------------------------------------------');
    return { status: true, details: 'SendMail Success' };
  }).catch(error => {
    console.log(`SendMail Error: ${error}`);
    return { status: false, details: `SendMail Error: ${error}` };
  });
}

const getEmailSubject = () => {
  return 'Domovichok';
}

const getEmailBody = (dispatch) => {
  console.log('getEmailBody => dispatch:', dispatch);

  let enumerators = '';
  enumerators += dispatch.profile.kitchenHot ? `КУХНЯ (гаряча): <b>${dispatch.kitchenHot}</b><br>`:'';
  enumerators += dispatch.profile.kitchenCold ? `\nКУХНЯ (холодна): <b>${dispatch.kitchenCold}</b><br>`:'';
  enumerators += dispatch.profile.bathHot ? `\nВАНА-ТУАЛЕТ (гаряча): <b>${dispatch.bathHot}</b><br>`:'';
  enumerators += dispatch.profile.bathCold ? `\nВАНА-ТУАЛЕТ (холодна): <b>${dispatch.bathCold}</b><br>`:'';
  enumerators += dispatch.profile.watering ? `\nПолив: <b>${dispatch.watering}</b><br>`:'';
  enumerators += dispatch.profile.sewage ? `\nСтоки: <b>${dispatch.sewage}</b><br>`:'';
  enumerators += dispatch.notes.trim()!=='' ? `\nПримітка: <b>${dispatch.notes}</b><br>`:'';

  const parsePkg = JSON.stringify({
    senderAccount: dispatch.profile.id,
    senderFio: dispatch.profile.fio,
    senderAddress: dispatch.profile.address,
    senderPhone: dispatch.profile.phone,
    sendingDate: dispatch.datetime,
    counters: {
      kitchenHot: dispatch.kitchenHot,
      kitchenCold: dispatch.kitchenCold, 
      bathHot: dispatch.bathHot,
      bathCold: dispatch.bathCold,
      watering: dispatch.watering,
      sewage: dispatch.sewage,
      notes: dispatch.notes
    }
  });

  const body = `
  <h3>Дата відправлення: ${dispatch.datetime}</h3>
  Особовий рахунок: <b>${dispatch.profile.id}</b><br>
  Відправник: <b>${dispatch.profile.fio}</b><br>
  Адреса: <b>${dispatch.profile.address}</b><br>
  Телефон: <b>${dispatch.profile.phone}</b><br>
  <br>
  ${enumerators}
  <br>
  ##
  <br>
  ${parsePkg}
  `;
  
  console.log('sendMail => getEmailBody:', body);
  return body;
}

//----------------------------------------------------------------------------------------------------------------

export const getDispatchPeriod = async () => {
  console.log('-------------------------------------------------------------------------');
  let result = { status: false, details: '', data: null }
  try {
    const period = await firestore().collection(dbPeriod).get();
    const records = await period.docs.map(d => d.data());
    const len = await Object.keys(records).length;
    if (len > 0) {
      result.status = true;
      result.data = { begin: records[0].begin, end: records[0].end }
    }
    else {
      console.log('getDispatchPeriod => No records found:', records);
      result.details = 'Firebase->Period: No records found';
    }
  } catch (err) {
    console.log('getDispatchPeriod => Catch Error:', err);
    result.details = `getDispatchPeriod => Catch Error: ${err}`;
  }
  // console.log('getDispatchPeriod => result:', result);
  console.log('-------------------------------------------------------------------------');
  return result;
}

export const PeriodUpdate = async (locale, toPeriod, screen, navigation) => {  
  const buildPeriodMessage = (period, locale) => {    
    let descr = locale.info_period_update_descr.replace('#begin#', period.begin);
    descr = descr.replace('#end#', period.end);
    // return `${locale.info_period_update_head}\n\n${descr}`;
    return `${descr}`;
  }

	NetInfo.fetch().then(state => {
		//console.log("Connection type", state.type);
    //console.log("Is connected?", state.isConnected);
    // console.log("PeriodUpdate => screen:", screen);

		if (state.isConnected) {
			getDispatchPeriod().then(period => {
				console.log('PeriodUpdate => period:', period);
				if (period.status) {
					console.log('PeriodUpdate => getPeriod success: ', period.data);
					try {
						toPeriod(period.data);
            console.log('PeriodUpdate => savePeriod: success!', screen);
            if (!screen) {
              Alert.alert(
                locale.project_name, `${buildPeriodMessage(period.data, locale)}`,
                [{ text: locale.action_ok, onPress: () => null }], { cancelable: false },
              );
            }
					} catch (error) {
            console.log('PeriodUpdate => savePeriod => CatchError:', error);
            if (!screen) {
              Alert.alert(
                locale.err_main_caption, `${locale.err_dispatch_period_save}`,
                [{ text: locale.action_ok, onPress: () => null }], { cancelable: false },
              );
            }
					}
				} else {
          console.log('PeriodUpdate => getPeriod Error:', period.details);
          if (!screen) {
            Alert.alert(
              locale.err_main_caption, `${locale.err_dispatch_period_get}`,
              [{ text: locale.action_ok, onPress: () => null }], { cancelable: false },
            );
          }
				}
			});
		} else {
      if (screen==="HOME") {
        Alert.alert(
          locale.info_warning, `${locale.err_home_period_update}`,
          [ { text: locale.action_ok, onPress: () => null},
            { text: locale.menu_instruction, onPress: () => navigation.navigate('Instruction') }
          ], { cancelable: false },
        );
      } else {
        navigation.navigate('NoNetwork')
        // Alert.alert(
        //   locale.info_warning, `${locale.err_check_link}`,
        //   [{ text: locale.action_ok, onPress: () => null }], { cancelable: false },
        // );
      }
		}
	});
}
