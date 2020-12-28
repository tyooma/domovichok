import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { connect } from "react-redux";

import { StateToProps } from "../store/MapToProps";
import { CheckOnline } from "../libs/Tools";

const NoNetwork = ({ navigation, locale, styles, theme }) => {
  console.log("NoNetwork => styles", styles.NoNetwork);
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.NoNetwork.ContainerCenter}>
        {theme === "DARK" ? (
          <Image
            style={styles.NoNetwork.Image}
            source={require("../libs/assets/images/no-wifi-white.png")}
          />
        ) : (
          <Image
            style={styles.NoNetwork.Image}
            source={require("../libs/assets/images/no-wifi-black.png")}
          />
        )}
        <Text style={styles.NoNetwork.CaptionText}>
          {locale.err_check_link}
        </Text>
        <View>
          <TouchableOpacity onPress={() => CheckOnline(navigation)}>
            <Text style={styles.NoNetwork.retryText}>
              {locale.err_check_button}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default connect(StateToProps())(NoNetwork);
