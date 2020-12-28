import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppReducer from './store/Reducer'
import { setAppInit, setAppInitDefault } from './store/StoreDefault'
import { Nav } from './nav/Nav'

const store = createStore(AppReducer)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const Init = async () => {
      // await setAppInit(store) // PROD

       await setAppInitDefault(store) // For DEV, clear AsyncStorage, work only with REDUX

      if (store.getState().loaded) {
        setLoaded(true)
      }
    }
    Init()
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide()
    }
  }, [loaded])

  return <Provider store={store}>{loaded && <Nav />}</Provider>
}
