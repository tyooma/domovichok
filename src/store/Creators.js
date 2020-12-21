import { APP } from './Actions';

export const saveLang = (inValue) => {
  // console.log('saveLang => lang:', inValue);
  return { type: APP.saveLang, value: inValue }
}

export const saveLocale = (inValue) => {
  // console.log('saveLocale => locale:', inValue);
  return { type: APP.saveLocale, value: inValue }
}

export const saveTheme = (inValue) => {
  // console.log('saveTheme => theme:', inValue);
  return { type: APP.saveTheme, value: inValue }
}

export const saveStyles = (inValue) => {
  // console.log('saveStyles => styles:', inValue);
  return { type: APP.saveStyles, value: inValue }
}

export const saveProfiles = (inValue) => {
  // console.log('saveProfiles => profiles:', inValue);
  return { type: APP.saveProfiles, value: inValue }
}

export const saveProfilesDetails = (inValue) => {
  // console.log('saveProfilesDetails => profilesDetails:', inValue);
  return { type: APP.saveProfilesDetails, value: inValue }
}

export const saveHistory = (inValue) => {
  // console.log('saveHistory => history:', inValue);
  return { type: APP.saveHistory, value: inValue }
}

export const saveLastValue = (inValue) => {
  // console.log('saveLastValue => lastValue:', inValue);
  return { type: APP.saveLastValue, value: inValue }
}

export const savePeriod = (inValue) => {
  // console.log('savePeriod => period:', inValue);
  return { type: APP.savePeriod, value: inValue }
}

export const saveLoaded = (inValue) => {
  // console.log('saveLoaded => loaded:', inValue);
  return { type: APP.saveLoaded, value: inValue }
}

export const saveMedia = (inValue) => {
  // console.log('saveMedia => media:', inValue);
  return { type: APP.saveMedia, value: inValue }
}

export const saveFBToken = (inValue) => {
  // console.log('saveFBToken => fbtoken:', inValue);
  return { type: APP.saveFBToken, value: inValue }
}
