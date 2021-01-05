import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { StateToProps, DispatchToProps } from "../../store/MapToProps";
import { Spinner } from "../components/Actions";
import { HistoryList } from "./HistoryList";

const History = ({ 
  locale,
  styles,
  history, 
  route,
}) => {
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
            {history && history.length != 0 ? (
              <View style={styles.sortBlockStyle}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      locale.info_warning,
                      "Тимчасово не працюэ",
                      [{ text: "ОК", onPress: () => null }],
                      { cancelable: false }
                    );
                  }}
                >
                  <View style={styles.History.InputDefault}>
                    <Text style={styles.Dispatch.HeaderRememberCaption}>
                      {"  "}
                      {locale.filter}
                      {"  "}
                      <Icon
                        name="filter"
                        size={25}
                        color={styles.MainColor.color}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSort(!sort);
                  }}
                >
                  <View style={styles.History.InputDefault}>
                    <Text style={styles.Dispatch.HeaderRememberCaption}>
                      {"  "}
                      {locale.sort}
                      {"  "}
                      <Icon
                        name={sort ? "sort-amount-up" : "sort-amount-down"}
                        size={25}
                        color={styles.MainColor.color}
                      />
                    </Text>
                  </View>
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
  );
};

export default connect(StateToProps(), DispatchToProps())(History);
