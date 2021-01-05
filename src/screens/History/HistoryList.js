import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { StateToProps } from "../../store/MapToProps";
import { HISTORYEMPTY } from "../../libs/Consts";
import { HistorySort } from "./HistoryActions";

export const HistoryList = connect(StateToProps())(
  ({ ProfileID, history, sort, filter, styles, locale }) => {         
    if (history[ProfileID] && history[ProfileID].length != 0) {      
      const dataList = history[ProfileID];
      return (
        <FlatList
          data={HistorySort(dataList, sort, locale)}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={({ item }) => (
            <View style={styles.History.Record} key={item.timestamp.toString()}>
              <View style={styles.History.RecordHead}>
                <Text style={styles.History.RecordHeadCaption}>
                  {locale.history_record_caption}
                </Text>
                <Text style={styles.History.RecordHeadCaption}>
                  {item.datetime}
                </Text>
              </View>
              {(item.kitchenHot !== HISTORYEMPTY ||
                item.kitchenCold !== HISTORYEMPTY) && (
                <View style={styles.History.RecordSection}>
                  <Text style={styles.History.RecordSectionCaption}>
                    {locale.profile_kitchen}
                  </Text>
                  <View style={styles.History.RecordSectionItems}>
                    {item.kitchenHot !== HISTORYEMPTY && (
                      <View style={styles.History.RecordItemContainer}>
                        <Text style={styles.History.RecordItemHead}>
                          {locale.profile_kitchen_hot}
                        </Text>
                        <Text style={styles.History.RecordItemBody}>
                          {item.kitchenHot}
                        </Text>
                      </View>
                    )}
                    {item.kitchenCold !== HISTORYEMPTY && (
                      <View style={styles.History.RecordItemContainer}>
                        <Text style={styles.History.RecordItemHead}>
                          {locale.profile_kitchen_cold}
                        </Text>
                        <Text style={styles.History.RecordItemBody}>
                          {item.kitchenCold}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
              {(item.bathHot !== HISTORYEMPTY ||
                item.bathCold !== HISTORYEMPTY) && (
                <View style={styles.History.RecordSection}>
                  <Text style={styles.History.RecordSectionCaption}>
                    {locale.profile_bath}
                  </Text>
                  <View style={styles.History.RecordSectionItems}>
                    {item.bathHot !== HISTORYEMPTY && (
                      <View style={styles.History.RecordItemContainer}>
                        <Text style={styles.History.RecordItemHead}>
                          {locale.profile_bath_hot}
                        </Text>
                        <Text style={styles.History.RecordItemBody}>
                          {item.bathHot}
                        </Text>
                      </View>
                    )}
                    {item.bathCold !== HISTORYEMPTY && (
                      <View style={styles.History.RecordItemContainer}>
                        <Text style={styles.History.RecordItemHead}>
                          {locale.profile_bath_cold}
                        </Text>
                        <Text style={styles.History.RecordItemBody}>
                          {item.bathCold}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
              {(item.watering !== HISTORYEMPTY ||
                item.sewage !== HISTORYEMPTY) && (
                <View style={styles.History.RecordSection}>
                  <Text style={styles.History.RecordSectionCaption}>
                    {locale.profile_other}
                  </Text>
                  <View style={styles.History.RecordSectionItems}>
                    {item.watering !== HISTORYEMPTY && (
                      <View style={styles.History.RecordItemContainer}>
                        <Text style={styles.History.RecordItemHead}>
                          {locale.profile_other_watering}
                        </Text>
                        <Text style={styles.History.RecordItemBody}>
                          {item.watering}
                        </Text>
                      </View>
                    )}
                    {item.sewage !== HISTORYEMPTY && (
                      <View style={styles.History.RecordItemContainer}>
                        <Text style={styles.History.RecordItemHead}>
                          {locale.profile_other_sewage}
                        </Text>
                        <Text style={styles.History.RecordItemBody}>
                          {item.sewage}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
              {item.notes && (
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
        />
      );
    } else {
      return (
        <View style={styles.Empty.WarningSection}>
          <Text style={styles.Empty.WarningCaption}>
            {locale.history_records_empty}
          </Text>
        </View>
      );
    }
  }
);
