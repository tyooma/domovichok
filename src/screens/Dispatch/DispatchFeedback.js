import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { StateToProps, DispatchToProps } from "../../store/MapToProps";
import { Spinner } from "../components/Actions";
import { runFeedback } from "./DispatchActions";

const DispatchFeedback = ({
  dispatch,
  setModal,
  locale,
  styles,
  history,
  toHistory,
  lastValue,
  toLastValue,
  toPeriod,
  navigation,
  theme,
}) => {
  console.log("dispatch ==>", dispatch, "setModal", setModal);  
  const needLoad = useRef(true);
  const [content, setContent] = useState(
    <View style={styles.NoNetwork.ContainerCenter}>
      <Spinner />
      <Text style={styles.NoNetwork.CaptionText}>
        {locale.dispatch_modal_spinner}
      </Text>
    </View>
  );

  const onExit = useCallback(() => {
    setModal(false);
    navigation.navigate("Home");
  }, []);

  // Update Content
  useEffect(() => {
    const getFeedback = async () => {
      const feedback = await runFeedback(
        dispatch,
        locale,
        history,
        toHistory,
        lastValue,
        toLastValue,
        toPeriod
      );
      setContent(
        <View style={styles.NoNetwork.ContainerCenter}>
          {theme === "DARK" ? (
            <Image
              style={styles.NoNetwork.Image}
              source={require("../../libs/assets/images/thanks.png")}
            />
          ) : (
            <Image
              style={styles.NoNetwork.Image}
              source={require("../../libs/assets/images/thanks-black.png")}
            />
          )}
          <Text style={styles.NoNetwork.CaptionText}>{locale.err_thans}</Text>
          <Text onPress={() => onExit()} style={styles.NoNetwork.retryText}>
            {locale.dispatch_modal_home}
          </Text>
        </View>
      );
      needLoad.current = false;
    };
    if (needLoad) {
      getFeedback();
    }
  }, []);

  return (
    // <View style={styles.Feedback.ViewArea}>
    //   <View style={styles.Feedback.Container}>
    //     <View style={styles.Feedback.Head}>
    //       <Text style={styles.Feedback.HeadCaption}>{locale.project_name}</Text>
    //     </View>
    //     { content }
    //   </View>
    // </View>
    <View style={styles.ContainerHeader}>{content}</View>
  );
};

export default connect(StateToProps(), DispatchToProps())(DispatchFeedback);
