import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-elements'
import { StateToProps, DispatchToProps } from '../../store/MapToProps'
import { Spinner } from '../components/Actions'
import { runFeedback } from './DispatchActions'

const DispatchFeedback = ({
  dispatch,
  setModal,
  locale,
  styles,
  history,
  toHistory,
  lastValue,
  toLastValue,
  toPeriod,
  navigation
}) => {
  console.log('dispatch ==>', dispatch, 'setModal', setModal)
  const needLoad = useRef(true)
  const [content, setContent] = useState(
    <View style={styles.NoNetwork.ContainerCenter}>
      <Spinner />
      <Text style={styles.NoNetwork.CaptionText}>
        {locale.dispatch_modal_spinner}
      </Text>
    </View>
  )

  const onExit = useCallback(() => {
    setModal(false)
    navigation.navigate('Home')
  }, [])

  useEffect(() => {
    const getFeedback = async () => {
      const feedback = await runFeedback(
        dispatch,
        locale,
        history,
        toHistory,
        lastValue,
        toLastValue,
        toPeriod
      )
      setContent(
        <View style={styles.NoNetwork.ContainerCenter}>
          <LinearGradient
            colors={[
              styles.GradientColorFirst.color,
              styles.GradientColorSecond.color
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.NoNetwork.Gradient}
          >
            <Icon
              name='check-circle'
              iconStyle={styles.NoNetwork.SuccessIcon}
              type='font-awesome-5'
            />
          </LinearGradient>
          <Text style={styles.NoNetwork.CaptionText}>{locale.err_thans}</Text>
          <Text onPress={() => onExit()} style={styles.NoNetwork.retryText}>
            {locale.dispatch_modal_home}
          </Text>
        </View>
      )
      needLoad.current = false
    }
    if (needLoad) {
      getFeedback()
    }
  }, [])

  return <View style={styles.ContainerHeader}>{content}</View>
}

export default connect(StateToProps(), DispatchToProps())(DispatchFeedback)
