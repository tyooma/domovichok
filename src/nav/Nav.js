import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LinearGradient from 'react-native-linear-gradient'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Home from '../screens/Home'
import Dispatch from '../screens/Dispatch/Dispatch'
import Instruction from '../screens/Instruction'
import Profile from '../screens/Profile/Profile'
import About from '../screens/About'
import Policy from '../screens/Policy'
import Settings from '../screens/Settings'
import History from '../screens/History/History'
// import { HeaderIcon } from '../components/HeaderIcon'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22
      },
      headerTintColor: '#fff',
      headerBackground: () => (
        <LinearGradient
          colors={['#00aeef', '#72a4ee']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )
    }}
  >
    <Stack.Screen
      name='Home'
      component={Home}
      options={{
        title: 'Домовичок'
        // headerRight: () => (
        //   <HeaderButtons HeaderButtonComponent={HeaderIcon}>
        //     <Item
        //       title='Instruction'
        //       iconName='ios-camera'
        //       onPress={() => navigation.push('Instruction')}
        //     />
        //   </HeaderButtons>
        // )
      }}
    />
    <Stack.Screen
      name='Instruction'
      component={Instruction}
      options={{
        title: 'Iнструкцiя'
      }}
    />
    <Stack.Screen
      name='Dispatch'
      component={Dispatch}
      options={{
        title: 'Передача показників'
      }}
    />
    <Stack.Screen
      name='Profile'
      component={Profile}
      options={{
        title: 'Профіль'
      }}
    />
    <Stack.Screen
      name='History'
      component={History}
      options={{
        title: 'Історія'
      }}
    />
  </Stack.Navigator>
)

const SettingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22
      },
      headerTintColor: '#fff',
      headerBackground: () => (
        <LinearGradient
          colors={['#00aeef', '#72a4ee']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )
    }}
  >
    <Stack.Screen
      name='Settings'
      component={Settings}
      options={{
        title: 'Налаштування'
      }}
    />
  </Stack.Navigator>
)

const InstructionStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22
      },
      headerTintColor: '#fff',
      headerBackground: () => (
        <LinearGradient
          colors={['#00aeef', '#72a4ee']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )
    }}
  >
    <Stack.Screen
      name='Instruction'
      component={Instruction}
      options={{
        title: 'Інструкція'
      }}
    />
  </Stack.Navigator>
)

const PolicyStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22
      },
      headerTintColor: '#fff',
      headerBackground: () => (
        <LinearGradient
          colors={['#00aeef', '#72a4ee']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )
    }}
  >
    <Stack.Screen
      name='Policy'
      component={Policy}
      options={{
        title: 'Політика конфіденційності'
      }}
    />
  </Stack.Navigator>
)

const AboutStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22
      },
      headerTintColor: '#fff',
      headerBackground: () => (
        <LinearGradient
          colors={['#00aeef', '#72a4ee']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )
    }}
  >
    <Stack.Screen
      name='About'
      component={About}
      options={{
        title: 'Довідка'
      }}
    />
  </Stack.Navigator>
)

const MainDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name='Home'
      component={HomeStack}
      options={{
        title: 'Головна'
      }}
    />
    <Drawer.Screen
      name='Settings'
      component={SettingsStack}
      options={{
        title: 'Налаштування'
      }}
    />
    <Drawer.Screen
      name='Instruction'
      component={InstructionStack}
      options={{
        title: 'Iнструкцiя'
      }}
    />
    <Drawer.Screen
      name='Policy'
      component={PolicyStack}
      options={{
        title: 'Полiтика конфіденційності'
      }}
    />
    <Drawer.Screen
      name='About'
      component={AboutStack}
      options={{
        title: 'Довідка'
      }}
    />
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
