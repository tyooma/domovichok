import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import { AntDesign } from '@expo/vector-icons'

import Home from '../screens/Home'
import Dispatch from '../screens/Dispatch/Dispatch'
import Instruction from '../screens/Instruction'
import Profile from '../screens/Profile/Profile'
import About from '../screens/About'
import Policy from '../screens/Policy'
import Settings from '../screens/Settings'
import History from '../screens/History/History'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='Instruction' component={Instruction} />
    <Stack.Screen name='Dispatch' component={Dispatch} />
    <Stack.Screen name='Profile' component={Profile} />
    <Stack.Screen name='History' component={History} />
  </Stack.Navigator>
)

const SettingsStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name='Settings' component={Settings} />
  </Stack.Navigator>
)

const InstructionStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name='Instruction' component={Instruction} />
  </Stack.Navigator>
)

const PolicyStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name='Policy' component={Policy} />
  </Stack.Navigator>
)

const AboutStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name='About' component={About} />
  </Stack.Navigator>
)

const MainDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name='Головна' component={HomeStack} />
    <Drawer.Screen name='Налаштування' component={SettingsStack} />
    <Drawer.Screen name='Iнструкцiя' component={InstructionStack} />
    <Drawer.Screen name='Полiтика конфіденційності' component={PolicyStack} />
    <Drawer.Screen name='Довiдка' component={AboutStack} />
  </Drawer.Navigator>
)

const MainNav = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name='MainDrawer' component={MainDrawer} />
  </Stack.Navigator>
)

export const Nav = () => (
  <NavigationContainer>
    <MainNav />
  </NavigationContainer>
)
