import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { StateToProps, DispatchToProps } from '../../store/MapToProps'
import { ActionBack, Spinner } from '../components/Actions'
import { HistoryDelete } from './HistoryActions'
import { HistoryList } from './HistoryList'

const History = ({ locale, styles, history, route }) => {
  const needLoad = useRef(route.params.NeedLoad)
  const [sort, setSort] = useState(true)
  const [filter, setFilter] = useState(undefined)
  useEffect(() => {
    setSort(true)
    setFilter(undefined)
  }, [route])

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
