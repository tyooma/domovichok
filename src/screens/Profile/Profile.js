import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { Alert, BackHandler, SafeAreaView, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { StateToProps, DispatchToProps } from '../../store/MapToProps';
import { ActionBack } from './../components/Actions';
import { PROFILE } from '../../libs/Consts';
import { getProfile } from '../../libs/Tools';
import { runProfileSave, runProfileDelete, runHistorySearch } from './ProfileActions';
import { FixAddressInput, FixDigitInput, FixNameInput, FixPhoneInput } from '../../libs/Tools';

const ReducerProfile = (state, action) => {
  // console.log('ReducerProfile => ['+action.type+']: <'+action.value+'> => STATE:', state);
  switch(action.type) {
    case PROFILE.id: return {...state, id: action.value}
    case PROFILE.fio: return {...state, fio: action.value}
    case PROFILE.address: return {...state, address: action.value}
    case PROFILE.phone: return {...state, phone: action.value}
    case PROFILE.kitchenHot: return {...state, kitchenHot: action.value}
    case PROFILE.kitchenCold: return {...state, kitchenCold: action.value}
    case PROFILE.bathHot: return {...state, bathHot: action.value}
    case PROFILE.bathCold: return {...state, bathCold: action.value}
    case PROFILE.watering: return {...state, watering: action.value}
    case PROFILE.sewage: return {...state, sewage: action.value}
    default: return state;
  }
}

const Profile = ({locale, styles, profiles, toProfiles, history, toHistory, lastValue, toLastValue, navigation, route}) => {
  const [profile, setProfile] = useReducer(ReducerProfile, getProfile(profiles, route));
  const isNew = useRef(true);

  const onChange = useCallback((inType, inValue) => {
    switch(inType) {
      case PROFILE.id: setProfile({type: PROFILE.id, value: FixDigitInput(inValue)}); break;
      case PROFILE.fio: setProfile({type: PROFILE.fio, value: FixNameInput(inValue)}); break;
      case PROFILE.address: setProfile({type: PROFILE.address, value: FixAddressInput(inValue)}); break;
      case PROFILE.phone: setProfile({type: PROFILE.phone, value: FixPhoneInput(inValue)}); break;
      case PROFILE.kitchenHot: setProfile({type: PROFILE.kitchenHot, value: inValue}); break;
      case PROFILE.kitchenCold: setProfile({type: PROFILE.kitchenCold, value: inValue}); break;
      case PROFILE.bathHot: setProfile({type: PROFILE.bathHot, value: inValue}); break;
      case PROFILE.bathCold: setProfile({type: PROFILE.bathCold, value: inValue}); break;
      case PROFILE.watering: setProfile({type: PROFILE.watering, value: inValue}); break;
      case PROFILE.sewage: setProfile({type: PROFILE.sewage, value: inValue}); break;
      default: break;
    }
  }, [setProfile]);

  const onBackPress = () => {
    if (!route.params.ProfileID) {
      Alert.alert(
        locale.info_warning, locale.info_profile_without_save,
        [ { text: locale.action_ok, onPress: () => navigation.goBack() },
          { text: locale.action_cancel, onPress: () => null }
        ], { cancelable: false },
      );
      return true;
    }
  }

  // Init fields
  useEffect(() => {
    if (!route.params.ProfileID) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [route.params.ProfileID]);

  // Init fields
  useEffect(() => {
    const Init = (init) => {
      setProfile({type: PROFILE.id, value: init.id});
      setProfile({type: PROFILE.fio, value: init.fio});
      setProfile({type: PROFILE.address, value: init.address});
      setProfile({type: PROFILE.phone, value: init.phone});
      setProfile({type: PROFILE.kitchenHot, value: init.kitchenHot});
      setProfile({type: PROFILE.kitchenCold, value: init.kitchenCold});
      setProfile({type: PROFILE.bathHot, value: init.bathHot});
      setProfile({type: PROFILE.bathCold, value: init.bathCold});
      setProfile({type: PROFILE.watering, value: init.watering});
      setProfile({type: PROFILE.sewage, value: init.sewage});
      isNew.current = false;
    }
    if(isNew) {
      Init( getProfile(profiles, route) );
    }
  }, [profiles, route, setProfile]);

  // console.log('Profile => lastValue:', lastValue);

  return (
    <SafeAreaView style={styles.Container}>
      {/* <View style={styles.Header}>
        <View style={styles.HeaderLeft}>
          <View style={styles.HeaderIcon}><ActionBack navigation={navigation} screen={!route.params.ProfileID?'CreateProfile':''}/></View>
          <Text style={styles.HeaderCaption}>
            {!route.params.ProfileID ? locale.profile_new_caption : locale.profile_edit_caption}
          </Text>
        </View>
        <View style={styles.HeaderRight}></View>
      </View>
      <Divider style={styles.Divider}/> */}
      <View style={styles.Profile.Content}>
        <ScrollView>
          <View style={styles.Profile.InputContainer}>
            <View style={styles.Profile.InputSection}>
              <View style={styles.Profile.InputItem}>
                <Text style={styles.Profile.InputCaption}>
                  {locale.profile_name}&nbsp;
                  {!route.params.ProfileID && <Text style={styles.InputRequired}>*</Text>}
                </Text>
                <TextInput
                  onChangeText={text => onChange(PROFILE.address, text)}
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
                  {!route.params.ProfileID && <Text style={styles.InputRequired}>*</Text>}
                </Text>
                {/*********************************************************************************/}
                {/* <TextInput
                  editable={!route.params.ProfileID}
                  onChangeText={text => onChange(PROFILE.id, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_id_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={profile.id}
                  style={{color: '#007BFF'}}
                  // style={route.params.ProfileID?styles.Profile.InputDefault:styles.Profile.InputNotModif}
                /> */}
                { !route.params.ProfileID &&
                <TextInput
                  editable={true}
                  onChangeText={text => onChange(PROFILE.id, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_id_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={profile.id}
                  style={styles.Profile.InputDefault}
                />
                }
                { route.params.ProfileID &&
                <TextInput
                  editable={false}
                  onChangeText={text => onChange(PROFILE.id, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_id_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={profile.id}
                  style={styles.Profile.InputNotModif}
                />
                }
                {/*********************************************************************************/}
              </View>
              <View style={styles.Profile.InputItem}>
                <Text style={styles.Profile.InputCaption}>{locale.profile_fio}</Text>
                <TextInput
                  onChangeText={text => onChange(PROFILE.fio, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_fio_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={36}
                  value={profile.fio}
                  style={styles.Profile.InputDefault}
                />
              </View>
              <View style={styles.Profile.InputItem}>
                <Text style={styles.Profile.InputCaption}>{locale.profile_phone}</Text>
                <TextInput
                  onChangeText={text => onChange(PROFILE.phone, text)}
                  selectionColor={styles.InputSelection}
                  placeholder={locale.profile_phone_placeholder}
                  placeholderTextColor={styles.PlaceholderTextColor}
                  maxLength={36}
                  keyboardType="phone-pad"
                  value={profile.phone}
                  style={styles.Profile.InputDefault}
                />
              </View>
            </View>
            <View style={styles.Profile.InputSection}>
              <Text style={styles.Profile.EnumeratorCaption}>{locale.profile_kitchen}</Text>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>{locale.profile_kitchen_hot}</Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={profile.kitchenHot ? styles.SwitchThumbColor.true:styles.SwitchThumbColor.false}
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={value => onChange(PROFILE.kitchenHot, value)}
                  value={profile.kitchenHot}
                />
              </View>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>{locale.profile_kitchen_cold}</Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={profile.kitchenCold ? styles.SwitchThumbColor.true:styles.SwitchThumbColor.false}
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={value => onChange(PROFILE.kitchenCold, value)}
                  value={profile.kitchenCold}
                />
              </View>
            </View>
            <View style={styles.Profile.InputSection}>
              <Text style={styles.Profile.EnumeratorCaption}>{locale.profile_bath}</Text>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>{locale.profile_bath_hot}</Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={profile.bathHot ? styles.SwitchThumbColor.true:styles.SwitchThumbColor.false}
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={value => onChange(PROFILE.bathHot, value)}
                  value={profile.bathHot}
                />
              </View>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>{locale.profile_bath_cold}</Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={profile.bathCold ? styles.SwitchThumbColor.true:styles.SwitchThumbColor.false}
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={value => onChange(PROFILE.bathCold, value)}
                  value={profile.bathCold}
                />
              </View>
            </View>
            <View style={styles.Profile.InputSection}>
              <Text style={styles.Profile.EnumeratorCaption}>{locale.profile_other}</Text>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>{locale.profile_other_watering}</Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={profile.watering ? styles.SwitchThumbColor.true:styles.SwitchThumbColor.false}
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={value => onChange(PROFILE.watering, value)}
                  value={profile.watering}
                />
              </View>
              <View style={styles.Profile.EnumeratorContainer}>
                <Text style={styles.Profile.EnumeratorItem}>{locale.profile_other_sewage}</Text>
                <Switch
                  trackColor={styles.SwitchTrackColor}
                  thumbColor={profile.sewage ? styles.SwitchThumbColor.true:styles.SwitchThumbColor.false}
                  ios_backgroundColor={styles.SwitchIOSBackgroundColor}
                  onValueChange={value => onChange(PROFILE.sewage, value)}
                  value={profile.sewage}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.Toolbar.Container}>
          <Divider style={styles.Divider}/>
          <View style={styles.Toolbar.Icons}>
            <View style={styles.Toolbar.Icon}>
              <TouchableOpacity onPress={() => route.params.ProfileID ? runProfileDelete(profile.id, profiles, toProfiles, locale, history, toHistory, lastValue, toLastValue, navigation):null}>
                <Icon name="trash-alt" iconStyle={route.params.ProfileID ? styles.Profile.DeleteIcon:styles.ColorNone} type="font-awesome-5"/>
              </TouchableOpacity>
            </View>
            <View style={styles.Toolbar.Icon}>
              <TouchableOpacity onPress={() => runProfileSave(profile, route.params.ProfileID, locale, profiles, toProfiles, lastValue, toLastValue, navigation)}>
                <Icon name="save" iconStyle={styles.Profile.SaveIcon} type="font-awesome-5"/>
              </TouchableOpacity>
            </View>
            <View style={styles.Toolbar.Icon}>
              <TouchableOpacity onPress={() => runHistorySearch(history, profile) ? navigation.navigate('History', { ProfileID: profile.id, ProfileName: profile.address, NeedLoad: true }):null}>
                <Icon name="history" iconStyle={runHistorySearch(history, profile) ? styles.Profile.HistoryIcon:styles.ColorNone} type="font-awesome-5"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(StateToProps(), DispatchToProps())(Profile);
