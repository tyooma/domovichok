import React, { useState, useCallback } from 'react'
import { View, Image, Linking } from 'react-native'
import { connect } from 'react-redux'
import { StateToProps, DispatchToProps } from '../store/MapToProps'
import { Drawer, TouchableRipple } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { SETTINGS, THEME } from '../libs/Consts'
import { getLocale, getStyles, getMedia, LOCALES } from './../libs/Tools'

const DrawerContent = ({
  lang,
  toLang,
  locale,
  toLocale,
  toMedia,
  theme,
  toTheme,
  styles,
  toStyles,
  profilesDetails,
  toProfilesDetails,
  navigation
}) => {
  const onChange = useCallback(
    (inType, inValue) => {
      console.log(theme)
      switch (inType) {
        case SETTINGS.locale:
          toLang(inValue)
          toLocale(getLocale(inValue))
          toMedia(getMedia(inValue))
          break
        case SETTINGS.theme:
          toTheme(inValue)
          toStyles(getStyles(inValue))
          break
        case SETTINGS.profilesDetails:
          toProfilesDetails(inValue)
          break
        default:
          break
      }
    },
    [toLocale, toTheme, toProfilesDetails]
  )

  return (
    <View style={styles.Drawer}>
      <DrawerContentScrollView>
        <View>
          <Drawer.Section style={styles.Drawer.Head}>
            <View>
              {theme === THEME.dark ? (
                <Image
                  source={require('../libs/assets/images/logo-dark.png')}
                  style={styles.Drawer.Logo}
                />
              ) : (
                <Image
                  source={require('../libs/assets/images/logo-light.png')}
                  style={styles.Drawer.Logo}
                />
              )}
            </View>
            <TouchableRipple
              onPress={() =>
                theme === THEME.dark
                  ? onChange(SETTINGS.theme, THEME.light)
                  : onChange(SETTINGS.theme, THEME.dark)
              }
            >
              <View pointerEvents='none'>
                {theme === THEME.dark ? (
                  <Icon
                    name='moon'
                    size={25}
                    color={styles.Drawer.LogoColor.color}
                  />
                ) : (
                  <Icon
                    name='sun'
                    size={25}
                    color={styles.Drawer.LogoColor.color}
                  />
                )}
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section style={styles.Drawer.List}>
            <DrawerItem
              icon={() => (
                <View style={styles.Drawer.IconContainer}>
                  <Icon
                    name='home'
                    size={25}
                    color={styles.Drawer.LogoColor.color}
                  />
                </View>
              )}
              label='Головна'
              activeTintColor={styles.MainColor.color}
              inactiveTintColor={styles.MainColor.color}
              onPress={() => {
                navigation.navigate('Home') 
              }}
            />
            <DrawerItem
              icon={() => (
                <View style={styles.Drawer.IconContainer}>
                  <Icon
                    name='book'
                    size={25}
                    color={styles.Drawer.LogoColor.color}
                  />
                </View>
              )}
              label='Iнструкцiя'
              activeTintColor={styles.MainColor.color}
              inactiveTintColor={styles.MainColor.color}
              onPress={() => {
                navigation.navigate('Instruction')
              }}
            />
            <DrawerItem
              icon={() => (
                <View style={styles.Drawer.IconContainer}>
                  <Icon
                    name='shield-alt'
                    size={25}
                    color={styles.Drawer.LogoColor.color}
                  />
                </View>
              )}
              label='Політика конфіденційності'
              activeTintColor={styles.MainColor.color}
              inactiveTintColor={styles.MainColor.color}
              onPress={() =>
                Linking.openURL(
                  'https://tau-quadra.com/privacy-policy-mob-app/'
                )
              }
            />
            <DrawerItem
              icon={() => (
                <View style={styles.Drawer.IconContainer}>
                  <Icon
                    name='info-circle'
                    size={25}
                    color={styles.Drawer.LogoColor.color}
                  />
                </View>
              )}
              label='Довідка'
              activeTintColor={styles.MainColor.color}
              inactiveTintColor={styles.MainColor.color}
              onPress={() => {
                navigation.navigate('About')
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

export default connect(StateToProps(), DispatchToProps())(DrawerContent)
