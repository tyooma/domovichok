import { LANG, THEME } from "./Consts";

import NetInfo from "@react-native-community/netinfo";
import NoNetwork from "../screens/NoNetwork";

export const LOCALES = [
  {
    name: LANG.ua,
    caption: "Українська",
    image: require("./locales/flags/ua.png"),
  },
  {
    name: LANG.en,
    caption: "English",
    image: require("./locales/flags/en.png"),
  },
  {
    name: LANG.ru,
    caption: "Русский",
    image: require("./locales/flags/ru.png"),
  },
];

export const getLocale = (lang) => {
  let locale = null;
  switch (lang) {
    case LANG.en:
      locale = require("./locales/EN").default;
      break;
    case LANG.ru:
      locale = require("./locales/RU").default;
      break;
    default:
      locale = require("./locales/UA").default;
  }
  return locale;
};

//-------------------------------------------------------------------------------------

export const getStyles = (theme) => {
  let styles = null;
  switch (theme) {
    case THEME.light:
      styles = require("./styles/light").default; 
      break;
    case THEME.dark:
      styles = require("./styles/dark").default;
      break;
    default:
      styles = require("./styles/dark").default;
      break;
  }
  // console.log('--------------------------------------------------');
  // console.log('getStyles => styles:', styles);
  return styles;
};

//-------------------------------------------------------------------------------------

export const getProfile = (profiles, route) => {  
  const ProfileID = route.params.ProfileID;
  let profile = {
    id: "",
    fio: "",
    address: "",
    phone: "",
    kitchenHot: false,
    kitchenCold: false,
    bathHot: false,
    bathCold: false,
    watering: false,
    sewage: false,
  };
  if (profiles && ProfileID) {
    profiles.forEach((item) => {
      if (item.id === ProfileID) {        
        profile = {
          id: item.id,
          fio: item.fio,
          address: item.address,
          phone: item.phone,
          kitchenHot: item.kitchenHot,
          kitchenCold: item.kitchenCold,
          bathHot: item.bathHot,
          bathCold: item.bathCold,
          watering: item.watering,
          sewage: item.sewage,          
        };
      }
    });
  }
  return profile;
};

//-------------------------------------------------------------------------------------

export const getMedia = (lang) => {
  let media = null;
  switch (lang) {
    case LANG.en:
      media = require("./media/EN").default;
      break;
    case LANG.ru:
      media = require("./media/RU").default;
      break;
    default:
      media = require("./media/UA").default;
  }
  return media;
};

//-------------------------------------------------------------------------------------

export const Success4Dispatch = (period) => {
  let result = true;
  const current = new Date().getDate();
  if (current < period.begin || current > period.end) {
    result = false;
  }
  return result;
};

//-------------------------------------------------------------------------------------

export const CheckOnline = async (navigation) => {
  const state = await NetInfo.fetch();
  // console.log("CheckOnline => state:", state, "nanavigationvigate =>", navigation);
  if (state) {
    navigation.goBack()
    //return true;
  } else {
    <NoNetwork/>
    //return false;
  }
  /*
  const supported = await Linking.canOpenURL('https://google.com/');
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
	*/
};

//-------------------------------------------------------------------------------------

// test string:
// "1234567890 qwertyuiopasdfghjklzxcvbnm QWERTYUIOPASDFGHJKLZXCVBNM йцукенгшщзхъфывапролджэячсмитьбю ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ `-=!@#$%^&*()_+ {}[];':\| /,.<?>"

// Only [0-9]
export const FixDigitInput = (value) => {
  return value.replace(/[^\d]/gi, "");
};

// Only [A-Za-z] && [А-Яа-я] && [0-9] && [\s\(\)\_\+\/\-\.\,]
export const FixAddressInput = (value) => {
  const address = value.replace(/[^\s\d\w\W]/gi, "");
  return address.replace(/[\*\~\!\@\#\$\%\^\&\|\>\<\'\"\=\?]/gi, "");
};

// Only [A-Za-z] && [А-Яа-я] && [\'\s]
export const FixNameInput = (value) => {
  const name = value.replace(/[^\s\d\w\W]/gi, "");
  // return name.replace(/[\d\*\~\!\@\#\$\%\^\&\(\)\_\+\|\>\<\/\"\-\=\.\,\?]/gi, '');
  return name.replace(
    /[\d\*\~\!\@\#\$\%\^\&\(\)\_\`\{\}\[\]\+\|\>\<\/\;\:\"\=\.\,\?]/gi,
    ""
  );
};

export const FixPhoneInput = (value) => {
  return value.replace(/[^+()-\s\d]/gi, "");
};

// Only [0-9] && [\,]
export const FixEnumeratorInput = (value) => {
  // const IsFirstZero = (value) => {
  //   let result = false;
  //   if (value.length === 1 && parseInt(value) === 0) {
  //     result = true;
  //   }
  //   return result;
  // };
  // let result = undefined;
  // const isZero = IsFirstZero(value);
  // if (!isZero) {
    const fixInput = value.replace(/[^,\d]/gi, "");
    const data = fixInput.split(",");
    const len = data.length;
    result = data[0];
    let tail = "";
    if (len > 1) {
      for (let i = 1; i < len; i++) {
        tail += data[i];
      }
      result += "," + tail.slice(0, 1);
    }
  // } else {
  //   result = "";
  // }
  // console.log('FixInput => zero: ', isZero, ' value:', value, ' result:', result);
  return result;
};

export const FixNotesInput = (value) => {
  const name = value.replace(/[^\s\d\w\W]/gi, "");
  // return name.replace(/[\d\~\!\@\#\$\^\&\*\_\|\>\<\/\'\"\?]/gi, '');
  return name.replace(/[\~\$\^\%\&\*\_\|\>\<\/\`\'\"\!\?]/gi, "");
};
