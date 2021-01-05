import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { connect } from "react-redux";
import { StateToProps, DispatchToProps } from "../../store/MapToProps";
import { ActionBack, Spinner } from "../components/Actions";
import { HistoryDelete } from "./HistoryActions";
import { HistoryList } from "./HistoryList";

var { sWidth } = Dimensions.get("window");

const History = ({ locale, styles, history, route }) => {
  const needLoad = useRef(route.params.NeedLoad);
  const [sort, setSort] = useState(true);
  const [filter, setFilter] = useState(undefined);
  useEffect(() => {
    setSort(true);
    setFilter(undefined);
  }, [route]);

  console.log("history", history, "route", route, "sort", sort);
  return (
    <SafeAreaView style={styles.Container}>
      {needLoad && (
        <>
          <View style={styles.History.Content}>
            <View style={styles.History.ContentHead}>
              {/* {history && history.length != 0 ? 

:
null
} */}

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
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                width: sWidth,
                paddingLeft: 0,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "center",
                  textAlignVertical: "center",
                }}
              >
                {/* <Text style={styles.History.ContentItemCaption}>
                  {locale.filter} */}
                <Icon name="filter" size={25} color={styles.MainColor.color} />
                {/* {locale.sort} */}
                <Icon
                  name={sort ? "arrow-up" : "arrow-down"}
                  raised={true}
                  style={{ paddingHorizontal: 15 }}
                  size={25}
                  onPress={() => {
                    setSort(!sort);
                  }}
                />
              </View>
            </View>
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
  );
};

export default connect(StateToProps(), DispatchToProps())(History);
