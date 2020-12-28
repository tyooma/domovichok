import { HISTORYEMPTY } from '../../libs/Consts';
import { getLocaleDT } from '../../libs/Utils';
import { SendFirebase, SendMail } from './DispatchSend';

export const runFeedback = async (dispatch, locale, history, toHistory, lastValue, toLastValue, toPeriod) => {
  let feedback = { status: true, head: '', body: '' }

  const currentTime = new Date();
  const timestamp = currentTime.getTime();
  const datetime = getLocaleDT(currentTime, 'UA');

  const pkg4History = {
    kitchenHot: dispatch.kitchenHot,
    kitchenCold: dispatch.kitchenCold,
    bathHot: dispatch.bathHot,
    bathCold: dispatch.bathCold,
    watering: dispatch.watering,
    sewage: dispatch.sewage,
    notes: dispatch.notes,
    profile: dispatch.profile,
    datetime: datetime,
    timestamp: timestamp
  }
  const pkg4Send = {
    account: dispatch.profile.id,
    address: dispatch.profile.address,
    fio: dispatch.profile.fio,
    phone: dispatch.profile.phone,
    kitchenHot: dispatch.kitchenHot,
    kitchenCold: dispatch.kitchenCold,
    bathHot: dispatch.bathHot,
    bathCold: dispatch.bathCold,
    watering: dispatch.watering,
    sewage: dispatch.sewage,
    notes: dispatch.notes,
    datetime: datetime,
    timestamp: timestamp
  }
  console.log('....................................................');
  console.log('runFeedback => pkg4History:', pkg4History);
  console.log('----------------------------------------------------');
  console.log('runFeedback => pkg4Send:', pkg4Send);
  console.log('....................................................');

  const firebase = await SendFirebase(pkg4Send);

  // console.log('');
  // console.log('----------------------------------------------------');
  // console.log('runFeedback => firebase:', firebase);
  // console.log('----------------------------------------------------');
  // console.log('');

  if (firebase.status) {
    const historyAnswer = saveHistory(pkg4History, history, toHistory, lastValue, toLastValue, locale);
    if (historyAnswer.status) {
      feedback.body = locale.info_dispatch_success;
      const email = await SendMail(pkg4History);
      if (!email.status) {
        feedback.status = false;
        feedback.head = locale.err_main_caption;
        feedback.body += `\n\n${email.details}`;
      }
    } else {
      feedback.status = false;
      feedback.head = locale.err_main_caption;
      feedback.body = historyAnswer.body;
    }
  } else {
    feedback.status = false;
    feedback.head = locale.err_main_caption;
    feedback.body = `${locale.err_dispatch_send_firebase}: ${firebase.details}`;
  }

  // console.log('....................................................');
  // console.log('runFeedback => feedback:', feedback);
  // console.log('....................................................');
  return feedback;
}

//--------------------------------------------------------------------------------------------------------------

const updateLastValue = (profileID, data, lastValue, toLastValue) => {
  let newLastValue = {}; Object.assign(newLastValue, lastValue);
  let prevLV = {}; Object.assign(prevLV, newLastValue[profileID]);
  let currLV = {}; Object.assign(currLV, newLastValue[profileID]);

  currLV.kitchenHot = data.kitchenHot!==HISTORYEMPTY ? data.kitchenHot:prevLV.kitchenHot;
  currLV.kitchenCold = data.kitchenCold!==HISTORYEMPTY ? data.kitchenCold:prevLV.kitchenCold;
  currLV.bathHot = data.bathHot!==HISTORYEMPTY ? data.bathHot:prevLV.bathHot;
  currLV.bathCold = data.bathCold!==HISTORYEMPTY ? data.bathCold:prevLV.bathCold;
  currLV.watering = data.watering!==HISTORYEMPTY ? data.watering:prevLV.watering;
  currLV.sewage = data.sewage!==HISTORYEMPTY ? data.sewage:prevLV.sewage;

  newLastValue[profileID] = {};
  Object.assign(newLastValue[profileID], currLV);

  toLastValue(newLastValue);
}

//--------------------------------------------------------------------------------------------------------------

const saveHistory = (dispatch, history, toHistory, lastValue, toLastValue, locale) => {
  let answer = { status: true, head: '', body: '' };
  try {
    const profile = dispatch.profile;
    const profileID = profile.id;

    const data = {
      kitchenHot: profile.kitchenHot ? dispatch.kitchenHot : HISTORYEMPTY,
      kitchenCold: profile.kitchenCold ? dispatch.kitchenCold : HISTORYEMPTY,
      bathHot: profile.bathHot ? dispatch.bathHot : HISTORYEMPTY,
      bathCold: profile.bathCold ? dispatch.bathCold : HISTORYEMPTY,
      watering: profile.watering ? dispatch.watering : HISTORYEMPTY,
      sewage: profile.sewage ? dispatch.sewage : HISTORYEMPTY,
      notes: dispatch.notes ? dispatch.notes : undefined,
      timestamp: dispatch.timestamp,
      datetime: dispatch.datetime,
    }

    updateLastValue(profileID, data, lastValue, toLastValue);

    let newHistory = {};
    Object.assign(newHistory, history);

    if ( history[profileID] ) {
      // Add new Data to History Storage by ProfileID
      (newHistory[profileID]).push(data);
    } else {
      // Create new Storage in History Storage by ProfileID and Add First Data
      newHistory[profileID] = [];
      (newHistory[profileID]).push(data);
    }
    toHistory(newHistory);
  } catch (error) {
    console.log('saveHistory => Catch Error:', error);
    answer.status = false;
    answer.head = locale.err_main_caption;
    answer.body = `${locale.err_dispatch_save_history}\n${err}`;
  }
  return answer;
}

//--------------------------------------------------------------------------------------------------------------

export const Validation = (dispatch, locale) => {  
  const fixVal = (value) => {
    return value.replace(',','.');
  }

  const checkVal = (inValue) => {
    console.log("inValue ===<",inValue)
    let result = false;
    const fixed = fixVal(inValue);
    try {
      const value = parseFloat(fixed);
      if (value>=0) {
        result = true;
      }
    } catch (error) {
      console.log('Validation => checkVal Catch Error:', error);
    }
    return result;
  }

  const getWarnings = (field) => {
    console.log('ValidgetWarningsation => field:', field);
    const item = field.replace(':', '');
    const message = locale.valid_dispatch_required.replace('#', item);
    return `${message}\n\n`;
  }

  const { profile, kitchenHot, kitchenCold, bathHot, bathCold, watering, sewage } = dispatch;
  let result = true;
  let details = '';
  if (profile.kitchenHot) {
    // console.log('Dispatch => validation => kitchenHot:', kitchenHot);
    // console.log('Dispatch => validation => typeof kitchenHot:', typeof kitchenHot);
    if (!kitchenHot || !checkVal(kitchenHot)) {
      result = false;
      details += getWarnings(`${locale.profile_kitchen}->${locale.profile_kitchen_hot}`);
    }
  }
  if (profile.kitchenCold) {    
    if (!kitchenCold || !checkVal(kitchenCold)) {
      result = false;
      details += getWarnings(`${locale.profile_kitchen}->${locale.profile_kitchen_cold}`);
    }
  }
  if (profile.bathHot) {
    if (!bathHot || !checkVal(bathHot)) {
      result = false;
      details += getWarnings(`${locale.profile_bath}->${locale.profile_bath_hot}`);
    }
  }
  if (profile.bathCold) {
    if (!bathCold || !checkVal(bathCold)) {
      result = false;
      details += getWarnings(`${locale.profile_bath}->${locale.profile_bath_cold}`);
    }
  }
  if (profile.watering) {
    if (!watering || !checkVal(watering)) {
      result = false;
      details += getWarnings(`${locale.profile_other_watering}`);
    }
  }
  if (profile.sewage) {
    if (!sewage || !checkVal(sewage)) {
      result = false;
      details += getWarnings(`${locale.profile_other_sewage}`);
    }
  }
  return { state: result, details: details };
}
