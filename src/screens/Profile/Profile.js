import React, {
  useCallback,
  useState,
  useEffect,
  useReducer,
  useRef
} from 'react'
import {
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  Image,
  TextInput,
  View,
  Linking
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import LinearGradient from 'react-native-linear-gradient'
import { StateToProps, DispatchToProps } from '../../store/MapToProps'
import { ActionBack } from './../components/Actions'
import { PROFILE } from '../../libs/Consts'
import { getProfile } from '../../libs/Tools'
import {
  runProfileSave,
  runProfileDelete,
  runHistorySearch,
  importMeterReadingFromFile
} from './ProfileActions'
import {
  FixAddressInput,
  FixDigitInput,
  FixNameInput,
  FixPhoneInput
} from '../../libs/Tools'
import { THEME } from '../../libs/Consts'

const ReducerProfile = (state, action) => {
  switch (action.type) {
    case PROFILE.id:
      return { ...state, id: action.value }
    case PROFILE.fio:
      return { ...state, fio: action.value }
    case PROFILE.address:
      return { ...state, address: action.value }
    case PROFILE.phone:
      return { ...state, phone: action.value }
    case PROFILE.kitchenHot:
      return { ...state, kitchenHot: action.value }
    case PROFILE.kitchenCold:
      return { ...state, kitchenCold: action.value }
    case PROFILE.bathHot:
      return { ...state, bathHot: action.value }
    case PROFILE.bathCold:
      return { ...state, bathCold: action.value }
    case PROFILE.watering:
      return { ...state, watering: action.value }
    case PROFILE.sewage:
      return { ...state, sewage: action.value }
    default:
      return state
  }
}

const Profile = ({
  locale,
  styles,
  theme,
  profiles,
  toProfiles,
  history,
  toHistory,
  lastValue,
  toLastValue,
  navigation,
  route
}) => {
  //console.log("PROFILE.js ---> profiles -->", profiles, "route ==>", route);
  const [profile, setProfile] = useReducer(
    ReducerProfile,
    getProfile(profiles, route)
  )
  const isNew = useRef(true)
  const [changeProfile, setChangeProfile] = useState(true)
  const [lookHistory, setLookHistory] = useState(true)
  const [checkPolicy, setCheckPolicy] = useState(false)

  const onChange = useCallback(
    (inType, inValue) => {
      switch (inType) {
        case PROFILE.id:
          setChangeProfile(false)
          setProfile({ type: PROFILE.id, value: FixDigitInput(inValue) })
          break
        case PROFILE.fio:
          setChangeProfile(false)
          setProfile({ type: PROFILE.fio, value: FixNameInput(inValue) })
          break
        case PROFILE.address:
          setChangeProfile(false)
          setProfile({
            type: PROFILE.address,
            value: FixAddressInput(inValue)
          })
          break
        case PROFILE.phone:
          setChangeProfile(false)
          setProfile({ type: PROFILE.phone, value: FixPhoneInput(inValue) })
          break
        case PROFILE.kitchenHot:
          setChangeProfile(false)
          setProfile({ type: PROFILE.kitchenHot, value: inValue })
          break
        case PROFILE.kitchenCold:
          setChangeProfile(false)
          setProfile({ type: PROFILE.kitchenCold, value: inValue })
          break
        case PROFILE.bathHot:
          setChangeProfile(false)
          setProfile({ type: PROFILE.bathHot, value: inValue })
          break
        case PROFILE.bathCold:
          setChangeProfile(false)
          setProfile({ type: PROFILE.bathCold, value: inValue })
          break
        case PROFILE.watering:
          setChangeProfile(false)
          setProfile({ type: PROFILE.watering, value: inValue })
          break
        case PROFILE.sewage:
          setChangeProfile(false)
          setProfile({ type: PROFILE.sewage, value: inValue })
          break
        default:
          break
      }
    },
    [setProfile]
  )

  const onBackPress = () => {
    if (!route.params.ProfileID) {
      Alert.alert(
        locale.info_warning,
        locale.info_profile_without_save,
        [
          { text: locale.action_ok, onPress: () => navigation.goBack() },
          { text: locale.action_cancel, onPress: () => null }
        ],
        { cancelable: false }
      )
      return true
    }
  }

  // Init fields
  useEffect(() => {
    if (!route.params.ProfileID) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
    }
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [route.params.ProfileID])

  // Init fields
  useEffect(() => {
    const Init = (init) => {
      setProfile({ type: PROFILE.id, value: init.id })
      setProfile({ type: PROFILE.fio, value: init.fio })
      setProfile({ type: PROFILE.address, value: init.address })
      setProfile({ type: PROFILE.phone, value: init.phone })
      setProfile({ type: PROFILE.kitchenHot, value: init.kitchenHot })
      setProfile({ type: PROFILE.kitchenCold, value: init.kitchenCold })
      setProfile({ type: PROFILE.bathHot, value: init.bathHot })
      setProfile({ type: PROFILE.bathCold, value: init.bathCold })
      setProfile({ type: PROFILE.watering, value: init.watering })
      setProfile({ type: PROFILE.sewage, value: init.sewage })
      isNew.current = false
    }
    if (isNew) {
      Init(getProfile(profiles, route))
    }
  }, [profiles, route, setProfile])

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Profile.Content}>
        <ScrollView style={styles.Profile.ScrollView}>
          <View style={styles.Profile.InputContainer}>
            <View style={styles.Profile.InputSection}>
              <View style={styles.Profile.InputItem}>
                {/* <TouchableOpacity
                  onPress={
                    () => console.log(" route", route, "toHistory", toHistory)
                    // importProfileFromFile(
                    //   route.params.ProfileID,
                    //   locale,
                    //   profiles,
                    //   toProfiles,
                    //   lastValue,
                    //   toLastValue,
                    //   navigation,
                    //   toHistory
                    // )
                  }
                >
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      padding: 30,
                      backgroundColor: "green",
                      color: "#fff",
                      marginBottom: 50,
                    }}
                  >
                    Импортувати профиль
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    importMeterReadingFromFile(history);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      padding: 10,
                      backgroundColor: "#FF7171",
                      color: "#fff",
                    }}
                  >
                    Импортувати покази
                  </Text>
                </TouchableOpacity>
                <Text style={styles.Profile.InputCaption}>
                  {locale.profile_name}&nbsp;
                  {!route.params.ProfileID && (
                    <Text style={styles.InputRequired}>*</Text>
                  )}
                </Text>
                <TextInput
                  onChangeText={(text) => onChange(PROFILE.address, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_name_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={20}
                  value={profile.address}
                  style={styles.Profile.InputDefault}
                />
              </View>
              <View style={styles.Profile.InputItem}>
                <Text style={styles.Profile.InputCaption}>
                  {locale.profile_id}&nbsp;
                  {!route.params.ProfileID && (
                    <Text style={styles.InputRequired}>*</Text>
                  )}
                </Text>
                {!route.params.ProfileID && (
                  <TextInput
                    editable={true}
                    onChangeText={(text) => onChange(PROFILE.id, text)}
                    selectionColor={styles.InputSelection}
                    placeholder={locale.profile_id_placeholder}
                    placeholderTextColor={styles.PlaceholderTextColor}
                    maxLength={10}
                    keyboardType='number-pad'
                    value={profile.id}
                    style={styles.Profile.InputDefault}
                  />
                )}
                {route.params.ProfileID && (
                  <TextInput
                    editable={false}
                    onChangeText={(text) => onChange(PROFILE.id, text)}
                    selectionColor={styles.InputSelection}
                    placeholder={locale.profile_id_placeholder}
                    placeholderTextColor={styles.PlaceholderTextColor}
                    maxLength={10}
                    keyboardType='number-pad'
                    value={profile.id}
                    style={styles.Profile.InputNotModif}
                  />
                )}
              </View>
              <View style={styles.Profile.InputItem}>
                <Text style={styles.Profile.InputCaption}>
                  {locale.profile_fio}
                </Text>
                <TextInput
                  onChangeText={(text) => onChange(PROFILE.fio, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_fio_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={36}
                  value={profile.fio}
                  style={styles.Profile.InputDefault}
                />
              </View>
              <View style={styles.Profile.InputItem}>
                <Text style={styles.Profile.InputCaption}>
                  {locale.profile_phone}
                </Text>
                <TextInput
                  onChangeText={(text) => onChange(PROFILE.phone, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_phone_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={36}
                  keyboardType='phone-pad'
                  value={profile.phone}
                  style={styles.Profile.InputDefault}
                />
              </View>
            </View>
            <View style={styles.Profile.InputSection}>
              <Text style={styles.Profile.EnumeratorCaption}>
                {locale.profile_kitchen}
              </Text>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>
                  {locale.profile_kitchen_hot}
                </Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={
                    profile.kitchenHot
                      ? styles.SwitchThumbColor.true
                      : styles.SwitchThumbColor.false
                  }
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={(value) => onChange(PROFILE.kitchenHot, value)}
                  value={profile.kitchenHot}
                />
              </View>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>
                  {locale.profile_kitchen_cold}
                </Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={
                    profile.kitchenCold
                      ? styles.SwitchThumbColor.true
                      : styles.SwitchThumbColor.false
                  }
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={(value) =>
                    onChange(PROFILE.kitchenCold, value)
                  }
                  value={profile.kitchenCold}
                />
              </View>
            </View>
            <View style={styles.Profile.InputSection}>
              <Text style={styles.Profile.EnumeratorCaption}>
                {locale.profile_bath}
              </Text>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>
                  {locale.profile_bath_hot}
                </Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={
                    profile.bathHot
                      ? styles.SwitchThumbColor.true
                      : styles.SwitchThumbColor.false
                  }
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={(value) => onChange(PROFILE.bathHot, value)}
                  value={profile.bathHot}
                />
              </View>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>
                  {locale.profile_bath_cold}
                </Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={
                    profile.bathCold
                      ? styles.SwitchThumbColor.true
                      : styles.SwitchThumbColor.false
                  }
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={(value) => onChange(PROFILE.bathCold, value)}
                  value={profile.bathCold}
                />
              </View>
            </View>
            <View style={styles.Profile.InputSection}>
              <Text style={styles.Profile.EnumeratorCaption}>
                {locale.profile_other}
              </Text>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>
                  {locale.profile_other_watering}
                </Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={
                    profile.watering
                      ? styles.SwitchThumbColor.true
                      : styles.SwitchThumbColor.false
                  }
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={(value) => onChange(PROFILE.watering, value)}
                  value={profile.watering}
                />
              </View>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>
                  {locale.profile_other_sewage}
                </Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={
                    profile.sewage
                      ? styles.SwitchThumbColor.true
                      : styles.SwitchThumbColor.false
                  }
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={(value) => onChange(PROFILE.sewage, value)}
                  value={profile.sewage}
                />
              </View>
            </View>
            {!route.params.ProfileID && (
              <View style={styles.Checkbox}>
                <TouchableOpacity onPress={() => setCheckPolicy(!checkPolicy)}>
                  <View style={styles.Checkbox.CheckboxStyle}>
                    {checkPolicy ? (
                      <Image
                        source={
                          theme === THEME.dark
                            ? require('../../libs/assets/images/checkbox-dark.png')
                            : require('../../libs/assets/images/checkbox-light.png')
                        }
                        style={styles.Checkbox.CheckboxImage}
                        key={'tickCheckbox'}
                      />
                    ) : (
                      <View style={styles.Checkbox.CheckboxStyle} />
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.Checkbox.Policy}>
                  <Text style={styles.Checkbox.PolicyText}>
                    {locale.profile_policy1}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        'https://tau-quadra.com/privacy-policy-mob-app/'
                      )
                    }
                  >
                    <Text style={styles.Checkbox.PolicyTouch}>
                      {locale.profile_policy2}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.Checkbox.PolicyText}>
                    {locale.profile_policy3}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.Profile.Toolbar}>
            <View style={styles.Profile.Btns}>
              <View style={styles.Profile.BtnContainer}>
                <TouchableOpacity
                  onPress={() =>
                    runProfileSave(
                      profile,
                      route.params.ProfileID,
                      locale,
                      profiles,
                      toProfiles,
                      lastValue,
                      toLastValue,
                      navigation,
                      checkPolicy
                    )
                  }
                >
                  <LinearGradient
                    disabled={changeProfile}
                    colors={[
                      styles.GradientColorFirst.color,
                      styles.GradientColorSecond.color
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.Profile.Btn}
                  >
                    <View>
                      <Text style={styles.Profile.BtnText}>Зберегти</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default connect(StateToProps(), DispatchToProps())(Profile)
