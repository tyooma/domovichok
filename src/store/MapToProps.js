import { bindActionCreators } from 'redux';
import * as App from './Creators';

export const StateToProps = () => {
  return (state) => {
    return {
      lang: state.lang,
      locale: state.locale,
      theme: state.theme,
      styles: state.styles,
      profiles: state.profiles,
      profilesDetails: state.profilesDetails,
      history: state.history,
      lastValue: state.lastValue,
      period: state.period,
      media: state.media,
      fbtoken: state.fbtoken,
    };
  }
}

export const DispatchToProps = () => {
  return (dispatch) => {
    return {
      toLang: bindActionCreators(App.saveLang, dispatch),
      toLocale: bindActionCreators(App.saveLocale, dispatch),
      toTheme: bindActionCreators(App.saveTheme, dispatch),
      toStyles: bindActionCreators(App.saveStyles, dispatch),
      toProfiles: bindActionCreators(App.saveProfiles, dispatch),
      toProfilesDetails: bindActionCreators(App.saveProfilesDetails, dispatch),
      toHistory: bindActionCreators(App.saveHistory, dispatch),
      toLastValue: bindActionCreators(App.saveLastValue, dispatch),
      toPeriod: bindActionCreators(App.savePeriod, dispatch),
      toMedia: bindActionCreators(App.saveMedia, dispatch),
      toFBToken: bindActionCreators(App.saveFBToken, dispatch),
    }
  }
}
