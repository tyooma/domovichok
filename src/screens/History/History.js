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
import {importMeterReadingFromFile} from '../Profile/ProfileActions'

const History = ({ locale, styles, history, route }) => {
  const needLoad = useRef(route.params.NeedLoad)
  const [sort, setSort] = useState(true)
  const [filter, setFilter] = useState(undefined)
  const [reload, setReload] = useState(false)
  useEffect(() => {
    setSort(true)
    setFilter(undefined)
  }, [route, reload])


  return (
    <SafeAreaView style={styles.Container}>
      {needLoad && (
        <>
          <View style={styles.History.Content}>
            <View style={styles.History.ContentHead}>
            <View style={styles.Dispatch.Toolbar}>
          <TouchableOpacity
          onPress={() => {
            importMeterReadingFromFile(history)
            setReload(!reload)
          }}
          >
            <LinearGradient
            colors={[
              styles.GradientColorFirst.color,
              styles.GradientColorSecond.color
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.Dispatch.SendBtn}>
              <View>
               <Text style={styles.Dispatch.SendBtnText}>
                Импортувати покази
               </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
