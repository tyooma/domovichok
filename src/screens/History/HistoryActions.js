import { Alert } from "react-native";

export const HistoryDelete = (
  profileID,
  history,
  toHistory,
  lastValue,
  toLastValue,
  locale,
  navigation
) => {
  const Execute = (
    profileID,
    history,
    toHistory,
    lastValue,
    toLastValue,
    locale,
    navigation
  ) => {
    try {
      let newHistory = {};
      Object.assign(newHistory, history);
      newHistory[profileID] = [];
      toHistory(newHistory);
      let newLastValue = {};
      Object.assign(newLastValue, lastValue);
      newLastValue[profileID] = [];
      toLastValue(newLastValue);
      //navigation.navigate('Home');
    } catch (err) {
      console.log("HistoryDelete => Try-Catch:", err);
      Alert.alert(
        locale.err_main_caption,
        `${locale.err_history_delete}\n${err}`,
        [{ text: locale.action_ok, onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  Alert.alert(
    locale.info_warning,
    locale.info_history_delete,
    [
      {
        text: locale.action_ok,
        onPress: () =>
          Execute(
            profileID,
            history,
            toHistory,
            lastValue,
            toLastValue,
            locale,
            navigation
          ),
      },
      { text: locale.action_cancel, onPress: () => null },
    ],
    { cancelable: false }
  );
};

//-------------------------------------------------------------------------------------------------------

export const HistoryFilter = (history, filter, locale) => {
  let current = [];
  try {
    const startDate = filter.startDate;
    const endDate = filter.endDate;
    history.forEach((item) => {
      if (item.timestamp >= startDate && item.timestamp <= endDate) {
        current.push(item);
      }
    });
  } catch (error) {
    console.log("HistoryFilter => CatchError:", error);
    Alert.alert(
      locale.err_main_caption,
      locale.err_history_filter,
      [{ text: locale.action_ok, onPress: () => null }],
      { cancelable: false }
    );
  }
  return current;
};

//-------------------------------------------------------------------------------------------------------

export const HistorySort = (history, DESC, locale) => {
  console.log("HISTORY in HistorySort", history, " DESC in HistorySort", DESC);
  let current = [];
  try {
    if (DESC) {
      // сортировка истории по дате: от "свежих" к "старым"
      // console.log('HistorySort => DESC');
      current = history.sort((a, b) => a.timestamp - b.timestamp).reverse();
    } else {
      // сортировка истории по дате: от "старых" к "свежим"
      // console.log('HistorySort => ASC');
      current = history.sort((a, b) => a.timestamp - b.timestamp);
    }
  } catch (error) {
    console.log("HistorySort => CatchError:", error);
    Alert.alert(
      locale.err_main_caption,
      locale.err_history_sort,
      [{ text: locale.action_ok, onPress: () => null }],
      { cancelable: false }
    );
  }
  return current;
};
