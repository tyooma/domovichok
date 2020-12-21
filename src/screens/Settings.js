import React, { useCallback } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Switch, Text, View } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { StateToProps, DispatchToProps } from './../store/MapToProps';
import { ActionBack } from './components/Actions';
import { THEME, SETTINGS } from './../libs/Consts';
import { getLocale, getStyles, getMedia, LOCALES } from './../libs/Tools';

const Settings = ({
  lang, toLang, locale, toLocale, toMedia, theme, toTheme, styles, toStyles,
  profilesDetails, toProfilesDetails, navigation
}) => {
  const onChange = useCallback((inType, inValue) => {
    switch(inType) {
      case SETTINGS.locale: toLang(inValue); toLocale(getLocale(inValue)); toMedia(getMedia(inValue)); break;
      case SETTINGS.theme: toTheme(inValue); toStyles(getStyles(inValue)); break;
      case SETTINGS.profilesDetails: toProfilesDetails(inValue); break;
      default: break;
    }
  }, [toLocale, toTheme, toProfilesDetails]);

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <View style={styles.HeaderLeft}>
          <View style={styles.HeaderIcon}><ActionBack navigation={navigation}/></View>
          <Text style={styles.HeaderCaption}>{locale.settings_caption}</Text>
        </View>
        <View style={styles.HeaderRight}></View>
      </View>
      <Divider style={styles.Divider}/>
      <View style={styles.Settings.Content}>
        <View style={styles.Settings.Section}>
            <Text style={styles.Settings.SectionCaption}>{locale.settings_lang.toUpperCase()}</Text>
            <FlatList
              data={LOCALES}
              keyExtractor={item => item.name}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => onChange(SETTINGS.locale, item.name)}>
                  <View style={styles.Settings.LocaleSection}>
                    <View style={[styles.Settings.LocaleItem, lang===item.name ? styles.Settings.LocaleSelected:styles.Settings.LocaleDefault]}>
                      <Text style={[styles.Settings.LocaleCaption, lang===item.name ? styles.Settings.LocaleCaptionSelected:styles.Settings.LocaleCaptionDefault]}>{item.caption}</Text>
                      <Image source={item.image} style={styles.Settings.LocaleImage}/>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        <View style={styles.Settings.Section}>
            <Text style={styles.Settings.SectionCaption}>{locale.settings_theme.toUpperCase()}</Text>
            <View style={styles.Settings.ThemeItems}>
              <View style={styles.Settings.ThemeItem}>
                <TouchableOpacity onPress={() => onChange(SETTINGS.theme, THEME.light)}>
                  <View style={[styles.Settings.ThemeItemContainer, theme===THEME.light ? styles.Settings.ThemeSelected:styles.Settings.ThemeDefault]}>
                    <Text style={styles.Settings.ThemeCaption}>{locale.settings_theme_light}</Text>
                    <Icon name="sun" color={theme===THEME.light ? styles.Settings.ThemeDarkIcon.ColorTrue:styles.Settings.ThemeDarkIcon.ColorFalse} size={styles.Settings.ThemeDarkIcon.Size} type="font-awesome-5"/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.Settings.ThemeItem}>
                <TouchableOpacity onPress={() => onChange(SETTINGS.theme, THEME.dark)}>
                  <View style={[styles.Settings.ThemeItemContainer, theme===THEME.dark ? styles.Settings.ThemeSelected:styles.Settings.ThemeDefault]}>
                    <Text style={styles.Settings.ThemeCaption}>{locale.settings_theme_dark}</Text>
                    <Icon name="moon" color={theme===THEME.dark ? styles.Settings.ThemeLightIcon.ColorTrue:styles.Settings.ThemeLightIcon.ColorFalse} size={styles.Settings.ThemeLightIcon.Size} type="font-awesome-5"/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        <View style={styles.Settings.Section}>
            <Text style={styles.Settings.SectionCaption}>{locale.settings_profile.toUpperCase()}</Text>
            <View style={styles.Settings.SwitchItem}>
              <Text style={styles.Settings.SwitchItemCaption}>{locale.settings_profile_details}</Text>
              <Switch
                onValueChange={value => onChange(SETTINGS.profilesDetails, value)}
                value={profilesDetails}
                trackColor={styles.SwitchTrackColor}
                thumbColor={profilesDetails ? styles.SwitchThumbColor.true:styles.SwitchThumbColor.false}
                ios_backgroundColor={styles.SwitchIOSBackgroundColor}
              />
            </View>
          </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(StateToProps(), DispatchToProps())(Settings);
