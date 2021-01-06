import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, View, Alert, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { StateToProps, DispatchToProps } from '../../store/MapToProps'
import { Spinner } from '../components/Actions'
import { HistoryList } from './HistoryList'

const History = ({ locale, styles, history, route }) => {
  const needLoad = useRef(route.params.NeedLoad)
  const [sort, setSort] = useState(true)
  const [filter, setFilter] = useState(undefined)
  useEffect(() => {
    setSort(true)
    setFilter(undefined)
  }, [route])

  console.log('history', history, 'route', route, 'sort', sort)
  return (
    <SafeAreaView style={styles.Container}>
      {needLoad && (
        <>
          <View style={styles.History.Content}>
            <View style={styles.History.ContentHead}>
              <View style={styles.History.ContentItem}>
                <Text style={styles.History.ContentItemCaption}>
                  {locale.dispatch_profile_name}
                </Text>
                <Text style={styles.History.ContentItemLabel}>
                  {route.params.ProfileName}
                </Text>
              </View>
              <View style={styles.History.ContentItem}>
                <Text style={styles.History.ContentItemCaption}>
                  {locale.profile_id}
                </Text>
                <Text style={styles.History.ContentItemLabel}>
                  {route.params.ProfileID}
                </Text>
              </View>
            </View>
            {/* ----------------------------------------------------------------- */}
            {history[route.params.ProfileID] &&
            history[route.params.ProfileID].length != 0 ? (
              <View style={styles.sortBlockStyle}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      locale.info_warning,
                      'В стадії розробки',
                      [{ text: 'ОК', onPress: () => null }],
                      { cancelable: false }
                    )
                  }}
                >
                  <LinearGradient
                    colors={[
                      styles.GradientColorFirst.color,
                      styles.GradientColorSecond.color
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.History.SortGradient}
                  >
                    <View style={styles.History.InputDefault}>
                      <Icon
                        name='filter'
                        size={18}
                        color={styles.MainColor.color}
                      />
                      <Text style={styles.History.HeaderRememberCaption}>
                        {locale.filter}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSort(!sort)
                  }}
                >
                  <LinearGradient
                    colors={[
                      styles.GradientColorFirst.color,
                      styles.GradientColorSecond.color
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.History.SortGradient}
                  >
                    <View style={styles.History.InputDefault}>
                      <Icon
                        name={sort ? 'sort-amount-up' : 'sort-amount-down'}
                        size={18}
                        color={styles.MainColor.color}
                      />
                      <Text style={styles.History.HeaderRememberCaption}>
                        {locale.sort}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}
            {/* ----------------------------------------------------------------- */}
            {/* <View style={styles.History.ContentRecords}> */}
            <HistoryList
              ProfileID={route.params.ProfileID}
              sort={sort}
              filter={filter}
            />
            {/* </View> */}
          </View>
        </>
      )}
      {!needLoad && (
        <View style={styles.Feedback.Spinner}>
          <Spinner />
          <View style={styles.Feedback.SpinnerCaption}>
            <Text style={styles.Feedback.SpinnerLabel}>
              {locale.dispatch_modal_spinner}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

export default connect(StateToProps(), DispatchToProps())(History)
