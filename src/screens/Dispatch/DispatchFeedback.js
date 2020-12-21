import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StateToProps, DispatchToProps } from '../../store/MapToProps';
import { Spinner } from '../components/Actions';
import { runFeedback } from './DispatchActions';

const DispatchFeedback = ({dispatch, setModal, locale, styles, history, toHistory, lastValue, toLastValue, toPeriod, navigation}) => {
  const needLoad = useRef(true);
  const [content, setContent] = useState(
    <View style={styles.Feedback.Content}>
      <View style={styles.Feedback.Spinner}>
        <Spinner/>
        <View style={styles.Feedback.SpinnerCaption}>
          <Text style={styles.Feedback.SpinnerLabel}>{locale.dispatch_modal_spinner}</Text>
        </View>
      </View>
    </View>
  );

  const onExit = useCallback(() => {
    setModal(false);
    navigation.navigate('Home');
  }, []);

  // Update Content
  useEffect(() => {
    const getFeedback = async () => {
      const feedback = await runFeedback(dispatch, locale, history, toHistory, lastValue, toLastValue, toPeriod);
      // console.log('..........................................................');
      // console.log('DispatchFeedback => feedback:', feedback);
      // console.log('..........................................................');
      setContent(
        <View style={styles.Feedback.Content}>
          <ScrollView>
            <View style={styles.Feedback.ContentMessages}>
              { !feedback.status &&
              <Text style={styles.Feedback.MessagesTextError}>{feedback.head}</Text>
              }
              <Text style={feedback.status?styles.Feedback.MessagesText:styles.Feedback.MessagesTextError}>
                {feedback.body}
              </Text>
            </View>
          </ScrollView>
          <View style={styles.Feedback.Toolbar}>
            <Text onPress={() => onExit()} style={styles.Feedback.ToolbarButton}>{locale.dispatch_modal_home}</Text>
          </View>
        </View>
      );
      needLoad.current = false;
    }
    if (needLoad) {
      getFeedback();
    }
  }, []);

  return (
    <View style={styles.Feedback.ViewArea}>
      <View style={styles.Feedback.Container}>
        <View style={styles.Feedback.Head}>
          <Text style={styles.Feedback.HeadCaption}>{locale.project_name}</Text>
        </View>
        { content }
      </View>
    </View>
  );
}

export default connect(StateToProps(), DispatchToProps())(DispatchFeedback);
