import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import Icon from 'react-native-vector-icons/Ionicons'

export const HeaderIcon = (props) => (
  <HeaderButton
    {...props}
    iconSize={36}
    IconComponent={Icon}
    color='#fff'
  />
)
