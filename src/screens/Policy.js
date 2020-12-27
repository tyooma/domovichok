import React, { useCallback } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableOpacity
} from 'react-native'
import { Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import { StateToProps } from '../store/MapToProps'
import { ActionBack } from './components/Actions'
import { ScrollView } from 'react-native-gesture-handler'

const Policy = ({ navigation, locale, styles }) => {
  return (
    <SafeAreaView style={styles.Container}>
      {/* <View style={styles.Header}>
        <View style={styles.HeaderLeft}>
          <View style={styles.HeaderIcon}><ActionBack navigation={navigation} /></View>
          <Text style={styles.HeaderCaption}>{locale.policy_caption}</Text>
        </View>
        <View style={styles.HeaderRight}></View>
      </View>
      <Divider style={styles.Divider} /> */}
      <ScrollView style={styles.Policy.Container}>
        <View>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_company}
          </Text>
          <Text style={styles.Policy.ParagraphText}>{locale.policy_city}</Text>
          <Text style={styles.Policy.ParagraphText}>{locale.policy_date}</Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_foreword}
          </Text>
        </View>
        <View>
          <Text style={styles.Policy.ParagraphHead}>
            {locale.policy_first_paragraph}
          </Text>
          <OpenUrlTouchableOpacity url={urlPolicy}>
            <Text style={styles.Policy.ParagraphText}>
              {locale.policy_first_subparagraph1}
            </Text>
          </OpenUrlTouchableOpacity>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_first_subparagraph2}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_first_subparagraph3}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_first_subparagraph4}
          </Text>
        </View>
        <View>
          <Text style={styles.Policy.ParagraphHead}>
            {locale.policy_second_paragraph}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph1}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph1_1}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph1_2}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph2}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph3}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph4}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph5}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_second_subparagraph6}
          </Text>
        </View>
        <View>
          <Text style={styles.Policy.ParagraphHead}>
            {locale.policy_third_paragraph}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_third_subparagraph1}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_third_subparagraph2}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_third_subparagraph2_1}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_third_subparagraph2_2}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_third_subparagraph2_3}
          </Text>
        </View>
        <View>
          <Text style={styles.Policy.ParagraphHead}>
            {locale.policy_fourth_paragraph}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fourth_subparagraph1}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fourth_subparagraph2}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fourth_subparagraph3}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fourth_subparagraph3_1}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fourth_subparagraph3_2}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fourth_subparagraph3_3}
          </Text>
        </View>
        <View>
          <Text style={styles.Policy.ParagraphHead}>
            {locale.policy_fifth_paragraph}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fifth_subparagraph1}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_fifth_subparagraph2}
          </Text>
        </View>

        <View>
          <Text style={styles.Policy.ParagraphHead}>
            {locale.policy_sixth_paragraph}
          </Text>
          <Text style={styles.Policy.ParagraphText}>
            {locale.policy_sixth_subparagraph1}
          </Text>
          <OpenUrlTouchableOpacity url={urlPolicy}>
            <Text style={styles.Policy.ParagraphText}>
              {locale.policy_sixth_subparagraph2}
            </Text>
          </OpenUrlTouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const urlPolicy = 'https://tau-quadra.com/privacy-policy'

const OpenUrlTouchableOpacity = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(`${locale.err_check_link} ${url}`)
    }
  }, [url])
  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>
}

export default connect(StateToProps())(Policy)
