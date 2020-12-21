import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { StateToProps } from '../../store/MapToProps'
import { ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'

export const ActionMenu = connect(StateToProps())(({ navigation, styles }) => {
  return (
    <Icon
      name='bars'
      onPress={() => navigation.openDrawer()}
      iconStyle={styles.ActionMenuIcon}
      type='font-awesome-5'
    />
  )
})

export const ActionBack = connect(StateToProps())(
  ({ navigation, screen, locale, styles }) => {
    return (
      <Icon
        name='chevron-left'
        onPress={() => {
          if (screen === 'CreateProfile') {
            Alert.alert(
              locale.info_warning,
              locale.info_profile_without_save,
              [
                { text: locale.action_ok, onPress: () => navigation.goBack() },
                { text: locale.action_cancel, onPress: () => null }
              ],
              { cancelable: false }
            )
          } else {
            navigation.goBack()
          }
        }}
        iconStyle={styles.ActionBackIcon}
        type='font-awesome-5'
      />
    )
  }
)

export const Spinner = connect(StateToProps())(({ styles }) => {
  return (
    <ActivityIndicator
      size={styles.ActionSpinner.size}
      color={styles.ActionSpinner.color}
      style={styles.ActionSpinnerStyle}
    />
  )
})
