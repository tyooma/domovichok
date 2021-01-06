import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore'
import { LANG, THEME } from '../libs/Consts'
import { getLocale, getStyles, getMedia } from '../libs/Tools'
import * as RCreator from './Creators'
import { STORAGE } from '../storage/Actions' 

const dbTokens = 'PushSubscribers'

export const DefaultInit = {
  lang: LANG.ua,
  locale: getLocale(LANG.ua),
  theme: THEME.light,
  styles: getStyles(THEME.light),
  profiles: [],
  profilesDetails: true,
  history: [],
  lastValue: {},
  period: { begin: 1, end: 4 },
  loaded: false,
  media: getMedia(LANG.ua),
  fbtoken: null
}

export const setAppInit = async (store) => {
  let current = await AsyncStorage.getItem(STORAGE.lang)
  const as_lang = current ? current : DefaultInit.lang
  store.dispatch(RCreator.saveLang(as_lang))

  current = await AsyncStorage.getItem(STORAGE.locale)
  const as_locale = current ? JSON.parse(current) : DefaultInit.locale
  store.dispatch(RCreator.saveLocale(as_locale))

  current = await AsyncStorage.getItem(STORAGE.theme)
  const as_theme = current ? current : DefaultInit.theme
  store.dispatch(RCreator.saveTheme(as_theme))

  current = await AsyncStorage.getItem(STORAGE.styles)
  const as_styles = current ? JSON.parse(current) : DefaultInit.styles
  store.dispatch(RCreator.saveStyles(as_styles))
  // store.dispatch(RCreator.saveStyles(DefaultInit.styles)); // FOR DEV

  current = await AsyncStorage.getItem(STORAGE.profiles)
  const as_profiles = current ? JSON.parse(current) : DefaultInit.profiles
  store.dispatch(RCreator.saveProfiles(as_profiles))

  current = await AsyncStorage.getItem(STORAGE.profilesDetails)
  const as_profilesDetails = current
    ? JSON.parse(current)
    : DefaultInit.profilesDetails
  store.dispatch(RCreator.saveProfilesDetails(as_profilesDetails))

  current = await AsyncStorage.getItem(STORAGE.history)
  const as_history = current ? JSON.parse(current) : DefaultInit.history
  store.dispatch(RCreator.saveHistory(as_history))

  current = await AsyncStorage.getItem(STORAGE.lastValue)
  const as_lastValue = current ? JSON.parse(current) : DefaultInit.lastValue
  store.dispatch(RCreator.saveLastValue(as_lastValue))

  current = await AsyncStorage.getItem(STORAGE.period)
  const as_period = current ? JSON.parse(current) : DefaultInit.period
  store.dispatch(RCreator.savePeriod(as_period))

  current = await AsyncStorage.getItem(STORAGE.media)
  const as_media = current ? JSON.parse(current) : DefaultInit.media
  store.dispatch(RCreator.saveMedia(as_media))

  //-----------------------------------------------------------------------------
  current = await AsyncStorage.getItem(STORAGE.fbtoken)
  // console.log('.........................................................................');
  // console.log('INIT => current:', current);
  if (!current) {
    await UpdateToken(store)
  } else {
    const exist = await ExistInDB(current)
    // console.log('.........................................................................');
    // console.log('ExistInDB =>', exist);
    // console.log('.........................................................................');
    if (exist) {
      // console.log('RESUX => SaveFBToken');
      store.dispatch(RCreator.saveFBToken(current))
    } else {
      await UpdateToken(store)
    }
  }
  //-----------------------------------------------------------------------------

  store.dispatch(RCreator.saveLoaded(true))
}

export const setAppInitDefault = async (store) => {
  store.dispatch(RCreator.saveLang(DefaultInit.lang))
  store.dispatch(RCreator.saveLocale(DefaultInit.locale))
  store.dispatch(RCreator.saveTheme(DefaultInit.theme))
  store.dispatch(RCreator.saveStyles(DefaultInit.styles))
  store.dispatch(RCreator.saveProfiles(DefaultInit.profiles))
  store.dispatch(RCreator.saveProfilesDetails(DefaultInit.profilesDetails))
  store.dispatch(RCreator.saveHistory(DefaultInit.history))
  store.dispatch(RCreator.saveLastValue(DefaultInit.lastValue))
  store.dispatch(RCreator.savePeriod(DefaultInit.period))
  store.dispatch(RCreator.saveMedia(DefaultInit.media))
  await UpdateToken(store)
  store.dispatch(RCreator.saveLoaded(true))
}

const UpdateToken = async (store) => {
  console.log('')
  console.log('>>  UpdateToken: START')
  console.log(
    '*************************************************************************'
  )
  try {
    const authStatus = await messaging().requestPermission()
    const AUTHORIZED = messaging.AuthorizationStatus.AUTHORIZED
    const PROVISIONAL = messaging.AuthorizationStatus.PROVISIONAL
    if (authStatus === AUTHORIZED || authStatus === PROVISIONAL) {
      console.log('UpdateToken => Firebase => AuthStatus:', authStatus)
      const tget = await GetToken()
      // console.log('UpdateToken >> tget:', tget);
      if (tget.status) {
        console.log(
          '-------------------------------------------------------------------------'
        )
        const tokenStr = tget.token
        console.log('UpdateToken => Firebase => Token:', tokenStr)
        if (await ExistInDB(tokenStr)) {
          console.log('UpdateToken => Token already exists in the Firebase')
        } else {
          const token = { token: tokenStr }
          const tsave = await SetPushSubscriber(token)
          // console.log('UpdateToken >> tsave:', tsave);
          if (tsave.status) {
            console.log('UpdateToken =>', tsave.details)
            store.dispatch(RCreator.saveFBToken(tokenStr))
          } else {
            console.log('UpdateToken =>', tsave.details)
          }
        }
        console.log(
          '-------------------------------------------------------------------------'
        )
      } else {
        console.log('UpdateToken =>', tget.details)
      }
    } else {
      console.log(
        'UpdateToken => RequestPermission => !AUTHORIZED || !PROVISIONAL'
      )
    }
  } catch (error) {
    console.log(
      'UpdateToken => Messaging.RequestPermission Catch Error:',
      error
    )
  }
  console.log(
    '*************************************************************************'
  )
  console.log('>>  UpdateToken: END')
  console.log('')
}

const GetToken = async () => {
  let answer = { status: false, details: '', token: null }
  try {
    const token = await messaging().getToken()
    if (token) {
      answer.status = true
      answer.token = token
    } else {
      answer.details = 'Firebase. No token received'
    }
  } catch (error) {
    answer.details = `Messaging.GetToken Catch Error: ${error}`
  }
  return answer
}

const ExistInDB = async (inValue) => {
  return await firestore()
    .collection(dbTokens)
    .get()
    .then((snapshot) => {
      let result = false
      snapshot.docs.forEach((doc) => {
        const token = doc.data().token
        if (token === inValue) {
          result = true
        }
      })
      return result
    })
}

const SetPushSubscriber = async (token) => {
  return await firestore()
    .collection(dbTokens)
    .add(token)
    .then((data) => {
      if (data.id && data.id.length > 0) {
        return {
          status: true,
          details: `Firebase: Save Token Success => ID: ${data.id}`
        }
      } else {
        return {
          status: false,
          details: `Firebase: Error with Inserted: ${data.id}`
        }
      }
    })
    .catch((error) => {
      return {
        status: false,
        details: `Firebase: Add in Collection Error: ${error}`
      }
    })
}
