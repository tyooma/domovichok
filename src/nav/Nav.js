import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'
import LinearGradient from 'react-native-linear-gradient'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { connect } from 'react-redux'

import Home from '../screens/Home'
import Dispatch from '../screens/Dispatch/Dispatch'
import Instruction from '../screens/Instruction'
import Profile from '../screens/Profile/Profile'
import About from '../screens/About'
import Policy from '../screens/Policy'
import Settings from '../screens/Settings'
import History from '../screens/History/History'
import { HistoryDelete } from "../screens/History/HistoryActions";
import PreviewDispatchFeedback from '../screens/Dispatch/PreviewDispatchFeedback'
import { HeaderIcon } from '../components/HeaderIcon'
import { StateToProps, DispatchToProps } from '../store/MapToProps'
import { runProfileDelete } from '../screens/Profile/ProfileActions'
import DrawerContent from './DrawerContent'
import NoNetwork from "../screens/NoNetwork";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = connect(
  StateToProps(),
  DispatchToProps()
)(
  ({
    navigation,
    styles,
    locale,
    profiles,
    toProfiles,
    toHistory,
    toLastValue,
    history,
  }) => (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Montserrat-SemiBold",
          fontSize: 22,
          fontWeight: 'bold',
        },        
        headerTintColor: "#fff",
        headerBackground: () => (
          <LinearGradient
            colors={[
              styles.GradientColorFirst.color,
              styles.GradientColorSecond.color,
            ]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Домовичок",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item
                title='Instruction'
                iconName='ios-help-circle-outline'
                onPress={() => navigation.navigate('Instruction')}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item
                title="Drawer"
                iconName="ios-menu"
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Instruction"
        component={Instruction}
        options={{
          title: "Iнструкцiя",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Dispatch"
        component={Dispatch}
        options={{
          title: "Передача показників",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          title: "Профіль",
          headerRight: () =>
            route.params.ProfileID !== undefined ? (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item
                  title="Trash"
                  iconName="ios-trash"
                  onPress={() => {
                    route.params.ProfileID
                      ? runProfileDelete(
                          route.params.ProfileID,
                          profiles,
                          toProfiles,
                          locale,
                          [],
                          toHistory,
                          "undefined",
                          toLastValue,
                          navigation
                        )
                      : null;
                  }}
                />
              </HeaderButtons>
            ) : null,
        })}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={({ navigation, route }) => ({
          title: "Історія",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () =>
            route.params.ProfileID !== undefined ? (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item
                  title="Trash"
                  iconName="ios-trash"
                  onPress={() => {
                    history[route.params.ProfileID] &&
                    history[route.params.ProfileID].length != 0
                      ? HistoryDelete(
                          route.params.ProfileID,
                          history,
                          toHistory,
                          "undefined",
                          toLastValue,
                          locale,
                          navigation
                        )
                      : null;
                  }}
                />
              </HeaderButtons>
            ) : null,
        })}
      />

      <Stack.Screen
        name="PreviewDispatchFeedback"
        component={PreviewDispatchFeedback}
        options={{
          title: "Підтвердження показань",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
        <Stack.Screen
        name="NoNetwork"
        component={NoNetwork}
        options={{
          title: "Домовичок",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{
          title: 'Налаштування',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item
                title='Drawer'
                iconName='ios-arrow-back'
                onPress={() => navigation.goBack()}
              />
            </HeaderButtons>
          )
        }}
      />
      <Stack.Screen
        name='Policy'
        component={Policy}
        options={{
          title: 'Політика конфіденційності',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item
                title='Drawer'
                iconName='ios-arrow-back'
                onPress={() => navigation.goBack()}
              />
            </HeaderButtons>
          )
        }}
      />
      <Stack.Screen
        name='About'
        component={About}
        options={{
          title: 'Довідка',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item
                title='Drawer'
                iconName='ios-arrow-back'
                onPress={() => navigation.goBack()}
              />
            </HeaderButtons>
          )
        }}
      />
    </Stack.Navigator>
  )
);

const MainDrawer = ({ navigation, route }) => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name='MainStack' component={MainStack} />
  </Drawer.Navigator>
);

export const Nav = () => (
  <NavigationContainer>
    <MainDrawer />
  </NavigationContainer>
);
