import { APP } from './Actions'
import { STORAGE } from '../storage/Actions'
import { SaveToStorage } from '../storage/Storage'

export default AppReducer = (state, action) => {
  switch (action.type) {
    case APP.saveLang:
      SaveToStorage(STORAGE.lang, action.value)
      return { ...state, lang: action.value }

    case APP.saveLocale:
      SaveToStorage(STORAGE.locale, action.value)
      return { ...state, locale: action.value }

    case APP.saveTheme:
      SaveToStorage(STORAGE.theme, action.value)
      return { ...state, theme: action.value }

    case APP.saveStyles:
      SaveToStorage(STORAGE.styles, action.value)
      return { ...state, styles: action.value }

    case APP.saveProfiles:
      SaveToStorage(STORAGE.profiles, action.value)
      return { ...state, profiles: action.value }

    case APP.saveProfilesDetails:
      SaveToStorage(STORAGE.profilesDetails, action.value)
      return { ...state, profilesDetails: action.value }

    case APP.saveHistory:
      SaveToStorage(STORAGE.history, action.value)
      return { ...state, history: action.value }

    case APP.saveLastValue:
      SaveToStorage(STORAGE.lastValue, action.value)
      return { ...state, lastValue: action.value }

    case APP.savePeriod:
      SaveToStorage(STORAGE.period, action.value)
      return { ...state, period: action.value }

    case APP.saveMedia:
      SaveToStorage(STORAGE.media, action.value)
      return { ...state, media: action.value }

    case APP.saveFBToken:
      SaveToStorage(STORAGE.fbtoken, action.value)
      return { ...state, fbtoken: action.value }

    case APP.saveLoaded:
      return { ...state, loaded: action.value }

    default:
      return state
  }
}
