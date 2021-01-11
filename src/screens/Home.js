import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity, Animated } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { importProfileFromFile } from './Profile/ProfileActions'

import { StateToProps, DispatchToProps } from '../store/MapToProps'
import { PeriodUpdate } from './Dispatch/DispatchSend'
import { ScrollView } from 'react-native-gesture-handler'

export default Home = connect(
  StateToProps(),
  DispatchToProps()
)(
  ({
    navigation,
    styles,
    locale,
    toPeriod,
    profiles,
    profilesDetails,
    toProfiles,
    history,
    toHistory,
    lastValue,
    toLastValue,
    ProfileID,
    route
  }) => {
    const [dropDown, setDrowDown] = useState(false)
    const [prevHistory, setPrevHistory] = useState(history)
    const up = useState(new Animated.Value(60))[0]
    const opacity = useState(new Animated.Value(0))[0]

    useEffect(() => {
      PeriodUpdate(locale, toPeriod, 'HOME', navigation)
    }, [])

    const moveBtns = (opacityValue, upValue) => {
      Animated.timing(opacity, {
        toValue: opacityValue,
        duration: 300,
        useNativeDriver: true
      }).start()

      Animated.timing(up, {
        toValue: upValue,
        duration: 300,
        useNativeDriver: true
      }).start()
    }

    return (
      <View style={styles.Container}>
        <View style={styles.Home.Content}>
          <View style={styles.Home.Profiles}>
            <ProfileList
              profiles={profiles}
              isDetails={profilesDetails}
              styles={styles}
              locale={locale}
              navigation={navigation}
            />
          </View>
          <View style={styles.Home.ProfileCreateContainer}>
            {dropDown ? (
              <Animated.View
                style={[
                  {
                    opacity,
                    transform: [{ translateY: up }]
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setDrowDown(!dropDown)
                    navigation.navigate('Profile', { ProfileID: undefined })
                  }}
                  style={styles.Home.ProfileSubBtn}
                >
                  <Text style={styles.Home.ProfileSubBtnText}>Створити</Text>
                  <LinearGradient
                    colors={[
                      styles.GradientColorFirst.color,
                      styles.GradientColorSecond.color
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.Home.ProfileCreateSubSection}
                  >
                    <Icon
                      name='user-plus'
                      iconStyle={styles.Home.ProfileCreateSubIcon}
                      type='font-awesome-5'
                    ></Icon>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.Home.ProfileSubBtn}
                  onPress={() => {
                    importProfileFromFile(
                      ProfileID,
                      locale,
                      profiles,
                      toProfiles,
                      lastValue,
                      toLastValue,
                      navigation,
                      toHistory,
                      // true
                      history
                    )
                  }}
                >
                  <Text style={styles.Home.ProfileSubBtnText}>Імпортувати</Text>
                  <LinearGradient
                    colors={[
                      styles.GradientColorFirst.color,
                      styles.GradientColorSecond.color
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.Home.ProfileCreateSubSection}
                  >
                    <Icon
                      name='upload'
                      iconStyle={styles.Home.ProfileCreateSubIcon}
                      type='font-awesome-5'
                    ></Icon>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                setDrowDown(!dropDown)
                !dropDown ? moveBtns(1, 0) : moveBtns(0, 60)
              }}
            >
              <LinearGradient
                colors={[
                  styles.GradientColorFirst.color,
                  styles.GradientColorSecond.color
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.Home.ProfileCreateSection}
              >
                <Icon
                  name='plus'
                  iconStyle={styles.Home.ProfileCreateIcon}
                  type='font-awesome-5'
                ></Icon>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
)

const ProfileList = ({ profiles, styles, locale, navigation }) => {
  let validate = false
  let errors = false
  let content = undefined
  if (profiles && styles && locale && navigation) {
    if (profiles.length > 0) {
      validate = true
    }
  } else {
    errors = true
  }

  if (!errors) {
    if (validate) {
      content = (
        <FlatList
          data={profiles}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.Home.Profile}
              onPress={() =>
                navigation.navigate('Dispatch', {
                  ProfileID: item.id,
                  IsNewDispatch: true
                })
              }
            >
              <View style={styles.Home.ProfileInfo}>
                <Text style={styles.Home.ProfileCaption}>{item.address}</Text>
                <Text style={styles.Home.ProfileDescription}>
                  О/Р:&nbsp;{item.id}
                </Text>
              </View>

              <View style={styles.Home.ProfileIcons}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Profile', { ProfileID: item.id })
                  }
                >
                  <Icon
                    name='edit'
                    iconStyle={styles.Home.ProfileIcon}
                    type='font-awesome-5'
                  ></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('History', {
                      ProfileID: item.id,
                      ProfileName: item.address,
                      NeedLoad: true
                    })
                  }
                >
                  <Icon
                    name='inbox'
                    iconStyle={styles.Home.ProfileIcon}
                    type='font-awesome-5'
                  ></Icon>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )
    } else {
      content = (
        <ScrollView
          style={styles.Empty.Content}
          contentContainerStyle={styles.Empty.homeView}
        >
          <Text style={styles.Empty.Label}>{locale.home_profiles_empty_1}</Text>
          <Text style={styles.Empty.SubLabel}>
            {locale.home_profiles_empty_2}
          </Text>
        </ScrollView>
      )
    }
  } else {
    content = (
      <>
        <View style={styles.Empty.Filler}></View>
        <View style={styles.Empty.Content}>
          <View style={styles.Empty.Section}>
            <Text style={styles.Error.Caption}>{locale.err_main_caption}</Text>
          </View>
          <View style={styles.Empty.Section}>
            <Text style={styles.Error.Text}>{locale.err_home_build_list}</Text>
          </View>
        </View>
        <View style={styles.Empty.Filler}></View>
      </>
    )
  }
  return content
}
