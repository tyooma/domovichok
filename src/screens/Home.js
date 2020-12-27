import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { StateToProps, DispatchToProps } from '../store/MapToProps'
import { PeriodUpdate } from './Dispatch/DispatchSend'

export default Home = connect(
  StateToProps(),
  DispatchToProps()
)(({ navigation, styles, locale, toPeriod, profiles, profilesDetails }) => {
  useEffect(() => {
    PeriodUpdate(locale, toPeriod, 'HOME', navigation)
  }, [])

  return (
    <SafeAreaView style={styles.Container}>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', { ProfileID: undefined })
            }
            style={styles.Home.ProfileCreateSection}
          >
            <Icon
              name='user-plus'
              iconStyle={styles.Home.ProfileCreateIcon}
              type='font-awesome-5'
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
})

const ProfileList = ({ profiles, isDetails, styles, locale, navigation }) => {
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.Home.Profile}>
              <View style={styles.Home.ProfileSection}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Profile', { ProfileID: item.id })
                  }
                >
                  <Text style={styles.Home.ProfileCaption}>{item.address}</Text>
                  {isDetails && (
                    <View style={styles.Home.ProfileDetails}>
                      <Text style={styles.Home.ProfileDetailsText}>
                        {locale.profile_id}&nbsp;&nbsp;{item.id}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.Home.ProfileDispatchSection}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Dispatch', {
                      ProfileID: item.id,
                      IsNewDispatch: true
                    })
                  }
                >
                  <Icon
                    name='sign-out-alt'
                    iconStyle={styles.Home.ProfileDispatchIcon}
                    type='font-awesome-5'
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )
    } else {
      content = (
        <>
          <View style={styles.Empty.Filler}></View>
          <View style={styles.Empty.Content}>
            <View style={styles.Empty.Section}>
              <Text style={styles.Empty.Label}>
                {locale.home_profiles_empty_1}
              </Text>
            </View>
          </View>
          <View style={styles.Empty.Filler}></View>
        </>
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
