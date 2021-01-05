import AsyncStorage from '@react-native-community/async-storage'
import { STORAGE } from './Actions'

export const SaveToStorage = (action, value) => {
  try {
    let parse = null;// JSON.stringify(profiles), default from Larin let parse = undefined;
    switch (action) {
      case STORAGE.lang:
        parse = value
        break
      case STORAGE.theme:
        parse = value
        break
      case STORAGE.fbtoken:
        parse = value
        break
      default:
        parse = JSON.stringify(value)
    }
    AsyncStorage.setItem(action, parse)
    console.log(`action:::${action},value---${value}`, value)
  } catch (err) {
    console.log(
      'SaveToStorage: ERROR => action: ' + action + ' value: ' + value + ' >',
      err
    )
  }
}
