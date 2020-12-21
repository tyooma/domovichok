import React, { useCallback } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { StateToProps } from '../store/MapToProps';
import { ActionBack } from './components/Actions';

const url = "https://vodaslav.com.ua/";
const tel = "tel:+38045792-26-55"

const OpenUrlTouchableOpacity = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(`${locale.err_check_link} ${url}`);
    }
  }, [url]);
  return <TouchableOpacity onPress={handlePress} >{children}</TouchableOpacity>
}

const About = ({ navigation, locale, styles }) => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <View style={styles.HeaderLeft}>
          <View style={styles.HeaderIcon}><ActionBack navigation={navigation} /></View>
          <Text style={styles.HeaderCaption}>{locale.about_caption}</Text>
        </View>
        <View style={styles.HeaderRight}></View>
      </View>
      <Divider style={styles.Divider} />
      <View style={styles.About.Container}>
        <View style={styles.About.ContainerCaption}>
          <Text style={styles.About.CaptionText}>{locale.project_name}</Text>
        </View>
        <View style={styles.About.ContainerDetails}>
          <Text style={styles.About.Disclaimer}>{locale.about_disclaimer}</Text>
          <Text style={styles.About.Telephone}>{locale.about_telephone}</Text>
          <OpenUrlTouchableOpacity url={tel}>
            <Text style={styles.About.Telephone_2}>{locale.about_telephone_2}</Text>
          </OpenUrlTouchableOpacity>
          <Text style={styles.About.Link}>{locale.about_link}</Text>
          <OpenUrlTouchableOpacity url={url}>
            <Text style={styles.About.Link_2}>{locale.about_link_2}</Text>
          </OpenUrlTouchableOpacity>
        </View>
        <Text style={styles.About.Version}>{locale.about_version}</Text>
      </View>
    </SafeAreaView>
  );
}

export default connect(StateToProps())(About);
