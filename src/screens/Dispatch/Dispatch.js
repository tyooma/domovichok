import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import {
  Modal,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { Input } from 'react-native-elements'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { StateToProps, DispatchToProps } from '../../store/MapToProps'
import { DISPATCH } from '../../libs/Consts'
import {
  getProfile,
  FixEnumeratorInput,
  Success4Dispatch,
  FixNotesInput
} from '../../libs/Tools'
import { Validation } from './DispatchActions'
import { PeriodUpdate } from './DispatchSend'

const ReducerDispatch = (state, action) => {
  switch (action.type) {
    case DISPATCH.kitchenHot:
      return { ...state, kitchenHot: action.value }
    case DISPATCH.kitchenCold:
      return { ...state, kitchenCold: action.value }
    case DISPATCH.bathHot:
      return { ...state, bathHot: action.value }
    case DISPATCH.bathCold:
      return { ...state, bathCold: action.value }
    case DISPATCH.watering:
      return { ...state, watering: action.value }
    case DISPATCH.sewage:
      return { ...state, sewage: action.value }
    case DISPATCH.notes:
      return { ...state, notes: action.value }
    case DISPATCH.profile:
      return { ...state, profile: action.value }
    default:
      return state
  }
}

const Dispatch = ({
  profiles,
  locale,
  styles,
  period,
  lastValue,
  navigation,
  route,
  toPeriod
}) => {
  const isNew = useRef(true)
  const [send, setSend] = useReducer(ReducerDispatch, {
    profile: getProfile(profiles, route),
    kitchenHot: '',
    kitchenCold: '',
    bathHot: '',
    bathCold: '',
    watering: '',
    sewage: '',
    notes: ''
  })
  const [modalVisible, setModalVisible] = useState(false)

  console.log("DISPATH ::: route -->",route, 'lastValue',lastValue, 'profiles ', profiles)
  useEffect(() => {
    PeriodUpdate(locale, toPeriod, 'HOME', navigation)
  }, [])

  const onChange = useCallback((inType, inValue, lastValue) => {
    // if (inValue < lastValue) {
    //   setModalVisible(true);
    // }
    switch (inType) {
      case DISPATCH.kitchenHot:
        setSend({
          type: DISPATCH.kitchenHot,
          value: FixEnumeratorInput(inValue)
        })
        break
      case DISPATCH.kitchenCold:
        setSend({
          type: DISPATCH.kitchenCold,
          value: FixEnumeratorInput(inValue)
        })
        break
      case DISPATCH.bathHot:
        setSend({ type: DISPATCH.bathHot, value: FixEnumeratorInput(inValue) })
        break
      case DISPATCH.bathCold:
        setSend({
          type: DISPATCH.bathCold,
          value: FixEnumeratorInput(inValue)
        })
        break
      case DISPATCH.watering:
        setSend({
          type: DISPATCH.watering,
          value: FixEnumeratorInput(inValue)
        })
        break
      case DISPATCH.sewage:
        setSend({ type: DISPATCH.sewage, value: FixEnumeratorInput(inValue) })
        break
      case DISPATCH.notes:
        setSend({ type: DISPATCH.notes, value: FixNotesInput(inValue) })
        break
      case DISPATCH.profile:
        setSend({ type: DISPATCH.profile, value: inValue })
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    const Init = (profiles, route) => {
      setSend({ type: DISPATCH.kitchenHot, value: '' })
      setSend({ type: DISPATCH.kitchenCold, value: '' })
      setSend({ type: DISPATCH.bathHot, value: '' })
      setSend({ type: DISPATCH.bathCold, value: '' })
      setSend({ type: DISPATCH.watering, value: '' })
      setSend({ type: DISPATCH.sewage, value: '' })
      setSend({ type: DISPATCH.notes, value: '' })
      setSend({ type: DISPATCH.profile, value: getProfile(profiles, route) })
      isNew.current = false
    }
    if (isNew) {
      Init(profiles, route)
    }
  }, [profiles, route, setSend])

  var buildPeriodMessage = (period, locale) => {
    let descr = locale.info_period_update_descr.replace('#begin#', period.begin)
    descr = descr.replace('#end#', period.end)
    return `${descr}`
  }

  const modalHeader = (
    <View style={styles.Warning.modalHeader}>
      <Text style={styles.Warning.title}>{modalVisible}</Text>
    </View>
  )

  const modalBody = (
    <View style={styles.Warning.modalBody}>
      <Text style={styles.Warning.bodyText}>{locale.info_warning_pokaz}</Text>
    </View>
  )

  const modalFooter = (
    <View style={styles.Warning.modalFooter}>
      <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
        <TouchableOpacity
          style={{ ...styles.Warning.actions, backgroundColor: '#0080ff' }}
          onPress={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <Text style={styles.Warning.actionText}>{locale.action_ok}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const modalContainer = (
    // Alert.alert(
    //   locale.info_warning,
    //   locale.info_warning_pokaz[
    //     {
    //       text: locale.action_ok,
    //       onPress: () => setModalVisible(!modalVisible),
    //     }
    //   ],
    //   { cancelable: false }
    // )
    <View style={styles.Warning.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  )

  const goToPreview = useCallback(() => {
    if (send.kitchenHot < lastValue[route.params.ProfileID].kitchenHot) {
      // setModalVisible(true);
      Alert.alert(
        locale.info_warning,
        locale.info_warning_pokaz,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false }
      )
    }
    if (send.kitchenCold < lastValue[route.params.ProfileID].kitchenCold) {
      Alert.alert(
        locale.info_warning,
        locale.info_warning_pokaz,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false }
      )
    }
    if (send.bathHot < lastValue[route.params.ProfileID].bathHot) {
      Alert.alert(
        locale.info_warning,
        locale.info_warning_pokaz,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false }
      )
    }
    if (send.bathCold < lastValue[route.params.ProfileID].bathCold) {
      Alert.alert(
        locale.info_warning,
        locale.info_warning_pokaz,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false }
      )
    }
    if (send.watering < lastValue[route.params.ProfileID].watering) {
      Alert.alert(
        locale.info_warning,
        locale.info_warning_pokaz,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false }
      )
    }
    if (send.sewage < lastValue[route.params.ProfileID].sewage) {
      Alert.alert(
        locale.info_warning,
        locale.info_warning_pokaz,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false }
      )
    }

    const validate = Validation(send, locale)
    if (validate.state) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          if (Success4Dispatch(period)) {
            navigation.navigate('PreviewDispatchFeedback', {
              send: send,
              period: period
            })
          } else {
            Alert.alert(
              locale.info_warning,
              `${locale.info_dispatch_unperiod_notification}`,
              [
                {
                  text: locale.action_ok,
                  onPress: () =>
                    navigation.navigate('PreviewDispatchFeedback', {
                      send: send,
                      period: period
                    })
                },
                { text: locale.action_cancel, onPress: () => null }
              ],
              { cancelable: false }
            )
          }
        } else {
          ;<NoNetwork />
        }
      })
    } else {
      Alert.alert(
        locale.valid_main_caption,
        `${validate.details}`,
        [{ text: 'OK', onPress: () => null }],
        { cancelable: false }
      )
    }
  }, [send])

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.Dispatch.Container}>
        <View style={styles.Dispatch.HeaderRememberSection}>
          <Text style={styles.Dispatch.HeaderRememberCaption}>
            {buildPeriodMessage(period, locale)}
          </Text>
        </View>
        <View style={styles.Dispatch.Content}>
          <View style={styles.Dispatch.Profile}>
            <View style={styles.Dispatch.ProfileItem}>
              <Text style={styles.Dispatch.ProfileItemCaption}>
                {locale.dispatch_profile_name}
              </Text>
              <Text style={styles.Dispatch.ProfileItemLabel}>
                {send.profile.address}
              </Text>
            </View>
            <View style={styles.Dispatch.ProfileItem}>
              <Text style={styles.Dispatch.ProfileItemCaption}>
                {locale.profile_id}
              </Text>
              <Text style={styles.Dispatch.ProfileItemLabel}>
                {send.profile.id}
              </Text>
            </View>
          </View>
          <View style={styles.Dispatch.Enumerators}>
            {(send.profile.kitchenHot || send.profile.kitchenCold) && (
              <View style={styles.Dispatch.EnumeratorSection}>
                <Text style={styles.Dispatch.EnumeratorCaption}>
                  {locale.profile_kitchen}
                </Text>
                {send.profile.kitchenHot && (
                  <View style={styles.Dispatch.EnumeratorContainer}>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorItem}>
                        {locale.profile_kitchen_hot}&nbsp;
                        <Text style={styles.InputRequired}>*</Text>
                      </Text>
                      <TextInput
                        placeholder='Введіть значення лічильника'
                        placeholderTextColor={styles.PlaceholderTextColor}
                        onChangeText={(text) =>
                          onChange(
                            DISPATCH.kitchenHot,
                            text,
                            lastValue[route.params.ProfileID].kitchenHot
                          )
                        }
                        selectionColor={styles.InputSelection}
                        keyboardType='number-pad'
                        value={send.kitchenHot}
                        maxLength={styles.Dispatch.InputEnumerator}
                        style={styles.Dispatch.EnumeratorInput}
                      />
                    </View>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorLastValueLabel}>
                        Попереднi показання:&nbsp;
                      </Text>
                      {lastValue[route.params.ProfileID].kitchenHot ? (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          {lastValue[route.params.ProfileID].kitchenHot}
                        </Text>
                      ) : (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          немає
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {send.profile.kitchenCold && (
                  <View style={styles.Dispatch.EnumeratorContainer}>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorItem}>
                        {locale.profile_kitchen_cold}&nbsp;
                        <Text style={styles.InputRequired}>*</Text>
                      </Text>
                      <TextInput
                        placeholder='Введіть значення лічильника'
                        placeholderTextColor={styles.PlaceholderTextColor}
                        onChangeText={(text) =>
                          onChange(
                            DISPATCH.kitchenCold,
                            text,
                            lastValue[route.params.ProfileID].kitchenCold
                          )
                        }
                        selectionColor={styles.InputSelection}
                        keyboardType='number-pad'
                        value={send.kitchenCold}
                        maxLength={styles.Dispatch.InputEnumerator}
                        style={styles.Dispatch.EnumeratorInput}
                      />
                    </View>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorLastValueLabel}>
                        Попереднi показання:&nbsp;
                      </Text>
                      {lastValue[route.params.ProfileID].kitchenCold ? (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          {lastValue[route.params.ProfileID].kitchenCold}
                        </Text>
                      ) : (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          немає
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            )}
            {(send.profile.bathHot || send.profile.bathCold) && (
              <View style={styles.Dispatch.EnumeratorSection}>
                <Text style={styles.Dispatch.EnumeratorCaption}>
                  {locale.profile_bath}
                </Text>
                {send.profile.bathHot && (
                  <View style={styles.Dispatch.EnumeratorContainer}>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorItem}>
                        {locale.profile_bath_hot}&nbsp;
                        <Text style={styles.InputRequired}>*</Text>
                      </Text>
                      <TextInput
                        placeholder='Введіть значення лічильника'
                        placeholderTextColor={styles.PlaceholderTextColor}
                        onChangeText={(text) =>
                          onChange(
                            DISPATCH.bathHot,
                            text,
                            lastValue[route.params.ProfileID].bathHot
                          )
                        }
                        selectionColor={styles.InputSelection}
                        keyboardType='number-pad'
                        value={send.bathHot}
                        maxLength={styles.Dispatch.InputEnumerator}
                        style={styles.Dispatch.EnumeratorInput}
                      />
                    </View>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorLastValueLabel}>
                        Попереднi показання:&nbsp;
                      </Text>
                      {lastValue[route.params.ProfileID].bathHot ? (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          {lastValue[route.params.ProfileID].bathHot}
                        </Text>
                      ) : (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          немає
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {send.profile.bathCold && (
                  <View style={styles.Dispatch.EnumeratorContainer}>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorItem}>
                        {locale.profile_bath_cold}&nbsp;
                        <Text style={styles.InputRequired}>*</Text>
                      </Text>
                      <TextInput
                        placeholder='Введіть значення лічильника'
                        placeholderTextColor={styles.PlaceholderTextColor}
                        onChangeText={(text) =>
                          onChange(
                            DISPATCH.bathCold,
                            text,
                            lastValue[route.params.ProfileID].bathCold
                          )
                        }
                        selectionColor={styles.InputSelection}
                        keyboardType='number-pad'
                        value={send.bathCold}
                        maxLength={styles.Dispatch.InputEnumerator}
                        style={styles.Dispatch.EnumeratorInput}
                      />
                    </View>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorLastValueLabel}>
                        Попереднi показання:&nbsp;
                      </Text>
                      {lastValue[route.params.ProfileID].bathCold ? (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          {lastValue[route.params.ProfileID].bathCold}
                        </Text>
                      ) : (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          немає
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            )}
            {(send.profile.watering || send.profile.sewage) && (
              <View style={styles.Dispatch.EnumeratorSection}>
                <Text style={styles.Dispatch.EnumeratorCaption}>
                  {locale.profile_other}
                </Text>
                {send.profile.watering && (
                  <View style={styles.Dispatch.EnumeratorContainer}>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorItem}>
                        {locale.profile_other_watering}&nbsp;
                        <Text style={styles.InputRequired}>*</Text>
                      </Text>
                      <TextInput
                        placeholder='Введіть значення лічильника'
                        placeholderTextColor={styles.PlaceholderTextColor}
                        onChangeText={(text) =>
                          onChange(
                            DISPATCH.watering,
                            text,
                            lastValue[route.params.ProfileID].watering
                          )
                        }
                        selectionColor={styles.InputSelection}
                        keyboardType='number-pad'
                        value={send.watering}
                        maxLength={styles.Dispatch.InputEnumerator}
                        style={styles.Dispatch.EnumeratorInput}
                      />
                    </View>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorLastValueLabel}>
                        Попереднi показання:&nbsp;
                      </Text>
                      {lastValue[route.params.ProfileID].watering ? (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          {lastValue[route.params.ProfileID].watering}
                        </Text>
                      ) : (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          немає
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                {send.profile.sewage && (
                  <View style={styles.Dispatch.EnumeratorContainer}>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorItem}>
                        {locale.profile_other_sewage}&nbsp;
                        <Text style={styles.InputRequired}>*</Text>
                      </Text>
                      <TextInput
                        placeholder='Введіть значення лічильника'
                        placeholderTextColor={styles.PlaceholderTextColor}
                        onChangeText={(text) =>
                          onChange(
                            DISPATCH.sewage,
                            text,
                            lastValue[route.params.ProfileID].sewage
                          )
                        }
                        selectionColor={styles.InputSelection}
                        keyboardType='number-pad'
                        value={send.sewage}
                        maxLength={styles.Dispatch.InputEnumerator}
                        style={styles.Dispatch.EnumeratorInput}
                      />
                    </View>
                    <View style={styles.Dispatch.EnumeratorItemWrap}>
                      <Text style={styles.Dispatch.EnumeratorLastValueLabel}>
                        Попереднi показання:&nbsp;
                      </Text>
                      {lastValue[route.params.ProfileID].sewage ? (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          {lastValue[route.params.ProfileID].sewage}
                        </Text>
                      ) : (
                        <Text style={styles.Dispatch.EnumeratorLastValue}>
                          немає
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            )}
            <View style={styles.Dispatch.EnumeratorSection}>
              <Text style={styles.Dispatch.EnumeratorCaption}>
                {locale.profile_notes}
              </Text>
              <View style={styles.Dispatch.EnumeratorContainerNotes}>
                <Input
                  onChangeText={(text) => onChange(DISPATCH.notes, text)}
                  value={send.notes}
                  maxLength={styles.Dispatch.InputNotes}
                  selectionColor={styles.InputSelection}
                  multiline={true}
                  numberOfLines={4}
                  inputContainerStyle={styles.Dispatch.EnumeratorInputNotesSize}
                  inputStyle={styles.Dispatch.EnumeratorInputNotes}
                  placeholder='Залиште примiтки'
                  placeholderTextColor={styles.PlaceholderTextColor}
                />
              </View>
            </View>
          </View>
        </View>

        <Modal transparent={false} visible={modalVisible}>
          <View style={styles.Warning.modal}>
            <View>{modalContainer}</View>
          </View>
        </Modal>

        <View style={styles.Dispatch.Toolbar}>
          <TouchableOpacity onPress={() => goToPreview()}>
            <LinearGradient
              colors={[
                styles.GradientColorFirst.color,
                styles.GradientColorSecond.color
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.Dispatch.SendBtn}
            >
              <View>
                <Text style={styles.Dispatch.SendBtnText}>Вiдправити</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default connect(StateToProps(), DispatchToProps())(Dispatch)
