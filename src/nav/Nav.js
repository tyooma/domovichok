import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LinearGradient from "react-native-linear-gradient";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";

import Home from "../screens/Home";
import Dispatch from "../screens/Dispatch/Dispatch";
import Instruction from "../screens/Instruction";
import Profile from "../screens/Profile/Profile";
import About from "../screens/About";
import Policy from "../screens/Policy";
import Settings from "../screens/Settings";
import History from "../screens/History/History";
import { HistoryDelete } from "../screens/History/HistoryActions";
import PreviewDispatchFeedback from "../screens/Dispatch/PreviewDispatchFeedback";
import { HeaderIcon } from "../components/HeaderIcon";
import { StateToProps, DispatchToProps } from "../store/MapToProps";
import { CustomDrawerHead } from "./CustomDrawerHead";
import { runProfileDelete } from "../screens/Profile/ProfileActions";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = connect(
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
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item
                title="Instruction"
                iconName="ios-help-circle-outline"
                onPress={() => navigation.push("Instruction")}
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
        }}
      />
      <Stack.Screen
        name="Dispatch"
        component={Dispatch}
        options={{
          title: "Передача показників",
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
          headerRight: () =>
            route.params.ProfileID !== undefined ? (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item
                  title="Trash"
                  iconName="ios-trash"
                  onPress={() => {
                    history.length
                      ? null
                      : HistoryDelete(
                          route.params.ProfileID,
                          history,
                          toHistory,
                          "undefined",
                          toLastValue,
                          locale,
                          navigation
                        );
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
        }}
      />
    </Stack.Navigator>
  )
);

const SettingsStack = connect(
  StateToProps(),
  DispatchToProps()
)(({ navigation, styles }) => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 20,
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
      name="Settings"
      component={Settings}
      options={{
        title: "Налаштування",
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
            <Item
              title="Drawer"
              iconName="ios-arrow-back"
              onPress={() => navigation.goBack()}
            />
          </HeaderButtons>
        ),
      }}
    />
  </Stack.Navigator>
));

const InstructionStack = connect(
  StateToProps(),
  DispatchToProps()
)(({ navigation, styles }) => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 20,
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
      name="Instruction"
      component={Instruction}
      options={{
        title: "Інструкція",
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
            <Item
              title="Drawer"
              iconName="ios-arrow-back"
              onPress={() => navigation.goBack()}
            />
          </HeaderButtons>
        ),
      }}
    />
  </Stack.Navigator>
));

const PolicyStack = connect(
  StateToProps(),
  DispatchToProps()
)(({ navigation, styles }) => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 20,
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
      name="Policy"
      component={Policy}
      options={{
        title: "Політика конфіденційності",
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
            <Item
              title="Drawer"
              iconName="ios-arrow-back"
              onPress={() => navigation.goBack()}
            />
          </HeaderButtons>
        ),
      }}
    />
  </Stack.Navigator>
));

const AboutStack = connect(
  StateToProps(),
  DispatchToProps()
)(({ navigation, styles }) => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 20,
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
      name="About"
      component={About}
      options={{
        title: "Довідка",
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
            <Item
              title="Drawer"
              iconName="ios-arrow-back"
              onPress={() => navigation.goBack()}
            />
          </HeaderButtons>
        ),
      }}
    />
  </Stack.Navigator>
));

const MainDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerHead />}>
    <Drawer.Screen
      name="Home"
      component={HomeStack}
      options={{
        title: "Головна",
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingsStack}
      options={{
        title: "Налаштування",
      }}
    />
    <Drawer.Screen
      name="Instruction"
      component={InstructionStack}
      options={{
        title: "Iнструкцiя",
      }}
    />
    <Drawer.Screen
      name="Policy"
      component={PolicyStack}
      options={{
        title: "Полiтика конфіденційності",
      }}
    />
    <Drawer.Screen
      name="About"
      component={AboutStack}
      options={{
        title: "Довідка",
      }}
    />
  </Drawer.Navigator>
);

const MainNav = () => (
  <Stack.Navigator headerMode={"none"}>
    <Stack.Screen name="MainDrawer" component={MainDrawer} />
  </Stack.Navigator>
);

export const Nav = () => (
  <NavigationContainer>
    <MainNav />
  </NavigationContainer>
);
