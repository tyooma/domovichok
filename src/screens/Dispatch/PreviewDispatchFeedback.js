import React, { useRef, useCallback, useState } from 'react'

import moment from 'moment'

import {
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { StateToProps, DispatchToProps } from '../../store/MapToProps'
import { ActionBack, Spinner } from '../components/Actions'
import { Validation } from './DispatchActions'

import DispatchFeedback from './DispatchFeedback'

import NoNetwork from '../NoNetwork'

import NetInfo from '@react-native-community/netinfo'

import { Success4Dispatch } from '../../libs/Tools'

const PreviewDispatchFeedback = ({
  send,
  locale,
  styles,
  navigation,
  route,
  period
}) => {
  console.log('route ==>', route, 'period  ==>', period)
  const needLoad = useRef(route.params.NeedLoad)
  const [modal, setModal] = useState(false)

  const SendOnline = useCallback(() => {
    // const validate = Validation(route.params.send, locale);
    // if (validate.state) {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setModal(true)
        // if (Success4Dispatch(period)) {
        //   setModal(true);
        // } else {
        //   Alert.alert(
        //     locale.info_warning,
        //     `${locale.info_dispatch_unperiod_notification}`,
        //     [
        //       { text: locale.action_ok, onPress: () => setModal(true) },
        //       { text: locale.action_cancel, onPress: () => null },
        //     ],
        //     { cancelable: false }
        //   );
        // }
      } else {
        ;<NoNetwork />
      }
    })
    // } else {
    //   Alert.alert(
    //     locale.valid_main_caption,
    //     `${validate.details}`,
    //     [{ text: "OK", onPress: () => null }],
    //     { cancelable: false }
    //   );
    // }
  }, [route.params.send, setModal])

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
                  {route.params.send.profile.address}
                </Text>
              </View>
              <View style={styles.History.ContentItem}>
                <Text style={styles.History.ContentItemCaption}>
                  {locale.profile_id}
                </Text>
                <Text style={styles.History.ContentItemLabel}>
                  {route.params.send.profile.id}
                </Text>
              </View>

              <FlatList
                data={[route.params.send]}
                keyExtractor={(item) => item.profile.id}
                renderItem={({ item }) => (
                  <View style={styles.History.Record} key={item.profile.id}>
                    <LinearGradient
                      colors={[
                        styles.GradientColorFirst.color,
                        styles.GradientColorSecond.color
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.History.RecordGradient}
                    >
                      <View style={styles.History.RecordHead}>
                        <Text style={styles.History.RecordHeadCaption}>
                          {locale.history_record_caption}&nbsp;
                        </Text>
                        <Text style={styles.History.RecordHeadCaption}>
                          {moment().format('DD.MM.YYYY')}
                        </Text>
                      </View>
                    </LinearGradient>
                    {(item.kitchenHot !== '' || item.kitchenCold !== '') && (
                      <View style={styles.History.RecordSection}>
                        <Text style={styles.History.RecordSectionCaption}>
                          {locale.profile_kitchen}
                        </Text>
                        <View style={styles.History.RecordSectionItems}>
                          {item.kitchenHot !== '' && (
                            <View style={styles.History.RecordItemContainer}>
                              <Text style={styles.History.RecordItemHead}>
                                {locale.profile_kitchen_hot}:&nbsp;
                              </Text>
                              <Text style={styles.History.RecordItemBody}>
                                {item.kitchenHot}
                              </Text>
                            </View>
                          )}
                          {item.kitchenCold !== '' && (
                            <View style={styles.History.RecordItemContainer}>
                              <Text style={styles.History.RecordItemHead}>
                                {locale.profile_kitchen_cold}:&nbsp;
                              </Text>
                              <Text style={styles.History.RecordItemBody}>
                                {item.kitchenCold}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    )}

                    {(item.bathHot !== '' || item.bathCold !== '') && (
                      <View style={styles.History.RecordSection}>
                        <Text style={styles.History.RecordSectionCaption}>
                          {locale.profile_bath}
                        </Text>
                        <View style={styles.History.RecordSectionItems}>
                          {item.bathHot !== '' && (
                            <View style={styles.History.RecordItemContainer}>
                              <Text style={styles.History.RecordItemHead}>
                                {locale.profile_bath_hot}:&nbsp;
                              </Text>
                              <Text style={styles.History.RecordItemBody}>
                                {item.bathHot}
                              </Text>
                            </View>
                          )}
                          {item.bathCold !== '' && (
                            <View style={styles.History.RecordItemContainer}>
                              <Text style={styles.History.RecordItemHead}>
                                {locale.profile_bath_cold}:&nbsp;
                              </Text>
                              <Text style={styles.History.RecordItemBody}>
                                {item.bathCold}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                    {(item.watering !== '' || item.sewage !== '') && (
                      <View style={styles.History.RecordSection}>
                        <Text style={styles.History.RecordSectionCaption}>
                          {locale.profile_other}
                        </Text>
                        <View style={styles.History.RecordSectionItems}>
                          {item.watering !== '' && (
                            <View style={styles.History.RecordItemContainer}>
                              <Text style={styles.History.RecordItemHead}>
                                {locale.profile_other_watering}:&nbsp;
                              </Text>
                              <Text style={styles.History.RecordItemBody}>
                                {item.watering}
                              </Text>
                            </View>
                          )}
                          {item.sewage !== '' && (
                            <View style={styles.History.RecordItemContainer}>
                              <Text style={styles.History.RecordItemHead}>
                                {locale.profile_other_sewage}:&nbsp;
                              </Text>
                              <Text style={styles.History.RecordItemBody}>
                                {item.sewage}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                    {item.notes !== '' && (
                      <View style={styles.History.RecordSection}>
                        <Text style={styles.History.RecordSectionCaption}>
                          {locale.profile_notes}
                        </Text>
                        <Text style={styles.History.RecordItemBodyNotes}>
                          {item.notes}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                style={styles.History.RecordList}
              />
            </View>
            <View style={styles.Dispatch.Toolbar}>
              <LinearGradient
                colors={[
                  styles.GradientColorFirst.color,
                  styles.GradientColorSecond.color
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.Dispatch.SendBtn}
              >
                <TouchableOpacity onPress={() => SendOnline()}>
                  <Text style={styles.Dispatch.SendBtnText}>Вiдправити</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
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
      <Modal visible={modal} animationType='fade' transparent={false}>
        <DispatchFeedback
          dispatch={route.params.send}
          navigation={navigation}
          setModal={setModal}
        />
      </Modal>
    </SafeAreaView>
  )
}

export default connect(
  StateToProps(),
  DispatchToProps()
)(PreviewDispatchFeedback)
