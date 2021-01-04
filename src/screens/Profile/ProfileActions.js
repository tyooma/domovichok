import { Alert } from "react-native";
import { LASTVALUE } from "../../libs/Consts";
import DocumentPicker from "react-native-document-picker";
import * as RNFS from "react-native-fs";
import moment from "moment";

export const runProfileSave = (
  profile,
  ProfileID,
  locale,
  profiles,
  toProfiles,
  lastValue,
  toLastValue,
  navigation,
  checkPolicy
) => {
  const checkProfile = (profile, profiles, ProfileID) => {
    // console.log(
    //   "ProfileID ==>",
    //   ProfileID,
    //   "profiles==>",
    //   profiles,
    //   "profile==>",
    //   profile
    // );
    let result = true;
    if (!ProfileID) {
      // Add new Profile
      profiles.forEach((item) => {
        console.log('item==============>', item)
        if (item.id === profile.id || item.address === profile.address) {
          result = false;
        }
      });
    } else {
      // Update current Profile
      let newProfiles = [];
      profiles.forEach((item) => {
        
        if (item.id !== profile.id) {
          newProfiles.push(item);
        }
      });
      newProfiles.forEach((item) => {
        if (item.address === profile.address) {
          result = false;
        }
      });
    }
    return result;
  };

  const validation = (profile, profiles, ProfileID, locale, checkPolicy = true) => {
    console.log("checkPolicy checkPolicy----->", checkPolicy);
    let result = true;
    let details = "";
    if (!checkProfile(profile, profiles, ProfileID)) {
      result = false;
      details += `${locale.valid_profile_unique}\n`;
    }
    if (profile.id && profile.id.length === 10) {
    } else {
      result = false;
      details += `${locale.valid_profile_invalid_id}\n`;
    }
    if (profile.address && profile.address.length > 0) {
    } else {
      result = false;
      details += `${locale.valid_profile_address_empty}\n`;
    }
    if (
      profile.kitchenHot ||
      profile.kitchenCold ||
      profile.bathHot ||
      profile.bathCold ||
      profile.watering ||
      profile.sewage
    ) {
    } else {
      result = false;
      details += locale.valid_profile_enumerators_unchecked;
    }
    if (checkPolicy) {
    } else {
      if (ProfileID == undefined) result = false;
      details += `${locale.valid_profile_policy_read}\n`;
    }
    return { state: result, details: details };
  };

  const ExecuteProfileSave = (
    profile,
    profiles,
    ProfileID,
    locale,
    toProfiles,
    lastValue,
    toLastValue,
    navigation,
    checkPolicy
  ) => {
    const validate = validation(
      profile,
      profiles,
      ProfileID,
      locale,
      checkPolicy
    );
    if (validate.state) {
      let newProfiles = [];
      if (!ProfileID) {
        // Add New Profile
        profiles.forEach((item) => {
          newProfiles.push(item);
        });
        newProfiles.push(profile);
        // Create LastValue structure by ProfileID
        let newLastValue = {};
        Object.assign(newLastValue, lastValue);
        newLastValue[profile.id] = {};
        Object.assign(newLastValue[profile.id], LASTVALUE);
        toLastValue(newLastValue);
      } else {
        // Update Profile
        profiles.forEach((item) => {
          if (item.id !== profile.id) {
            newProfiles.push(item);
          } else {
            newProfiles.push(profile);
          }
        });
      }
      toProfiles(newProfiles);
      navigation.navigate("Home");
    } else {
      Alert.alert(
        locale.valid_main_caption,
        `${validate.details}`,
        [{ text: locale.action_ok, onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  if (ProfileID) {
    Alert.alert(
      locale.info_warning,
      locale.info_profile_save,
      [
        {
          text: locale.action_ok,
          onPress: () =>
            ExecuteProfileSave(
              profile,
              profiles,
              ProfileID,
              locale,
              toProfiles,
              lastValue,
              toLastValue,
              navigation
            ),
        },
        { text: locale.action_cancel, onPress: () => null },
      ],
      { cancelable: false }
    );
  } else {
    ExecuteProfileSave(
      profile,
      profiles,
      ProfileID,
      locale,
      toProfiles,
      lastValue,
      toLastValue,
      navigation,
      checkPolicy
    );
  }
};

//----------------------------------------------------------------------------------------------------------

export const runProfileDelete = (
  id,
  profiles,
  toProfiles,
  locale,
  history,
  toHistory,
  lastValue,
  toLastValue,
  navigation
) => {
  const ExecuteProfileDelete = (
    id,
    profiles,
    toProfiles,
    locale,
    history,
    toHistory,
    lastValue,
    toLastValue,
    navigation
  ) => {
    try {
      let newProfiles = [];
      profiles.forEach((profile) => {
        if (profile.id !== id) {
          newProfiles.push(profile);
        }
      });
      toProfiles(newProfiles);

      let newHistory = {};
      for (let profileID in history) {
        if (profileID !== id) {
          newHistory[profileID] = [];
          newHistory[profileID].push(history[profileID]);
        }
      }
      toHistory(newHistory);

      let newLastValue = {};
      for (let profileID in lastValue) {
        if (profileID !== id) {
          newLastValue[profileID] = {};
          Object.assign(newLastValue[profileID], lastValue[profileID]);
        }
      }
      toLastValue(newLastValue);

      navigation.navigate("Home");
    } catch (err) {
      console.log("runProfileDelete => Try-Catch:", err);
      Alert.alert(
        locale.err_main_caption,
        `${locale.err_profile_delete}\n${err}`,
        [{ text: locale.action_ok, onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  Alert.alert(
    locale.info_warning,
    locale.info_profile_delete,
    [
      {
        text: locale.action_ok,
        onPress: () =>
          ExecuteProfileDelete(
            id,
            profiles,
            toProfiles,
            locale,
            history,
            toHistory,
            lastValue,
            toLastValue,
            navigation
          ),
      },
      { text: locale.action_cancel, onPress: () => null },
    ],
    { cancelable: false }
  );
};

//----------------------------------------------------------------------------------------------------------

export const runHistorySearch = (history, profile) => {
  let result = false;
  const currentHistory = history[profile.id];
  if (currentHistory) {
    if (currentHistory.length > 0) {
      result = true;
    }
  }
  return result;
};

export const importProfileFromFile = async (
  ProfileID,
  locale,
  profiles,
  toProfiles,
  lastValue,
  toLastValue,
  navigation,
  toHistory,
) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.plainText],
    });
    RNFS.readFile(res.uri).then((res) => {
      const toStore = JSON.parse(JSON.parse(res));
      const personalNumber = toStore.personalNumber.slice(0, 10);
      const storeFromFile = {
        address: toStore.personalNumber,
        bathCold: toStore.years[0].months[0].countersValues.toiletHotCounter
          ? true
          : false,
        bathHot: false,
        fio: "",
        id: toStore.personalNumber.slice(0, 10),
        kitchenCold: false,
        kitchenHot: toStore.years[0].months[0].countersValues.kitchenHotCounter
          ? true
          : false,
        phone: "",
        sewage: false,
        watering: false,
      };
      const counters = [];
      toStore.years.map((item) => {
        item.months.map((item) => {
          let obj = {};
          obj.bathHot = item.countersValues.toiletHotCounter
            ? item.countersValues.toiletHotCounter
            : "";
          obj.kitchenHot = item.countersValues.kitchenHotCounter
            ? item.countersValues.kitchenHotCounter
            : "";
          obj.bathCold = "";
          obj.kitchenCold = "";
          obj.sewage = "";
          obj.watering = "";
          obj.datetime = moment(
            item.countersValuesDate.kitchenHotCounter
          ).format("DD.MM.YYYY, h:mm:ss");
          counters.push(obj);
        });
      });
      // counters.filter(function (date, i, array) {
      //   return array.indexOf(date) === i;
      // });
      const historyFromFile = {
        [personalNumber]: counters,
      };

      runProfileSave(
        storeFromFile,
        ProfileID,
        locale,
        profiles,
        toProfiles,
        lastValue,
        toLastValue,//toLastValue
        navigation,
      );
      console.log("toHistory", toHistory);
      console.log("historyFromFile", historyFromFile);
      toHistory(historyFromFile);
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log("err in PRofileActions", err);
    } else {
      throw err;
    }
  }
};

export const importMeterReadingFromFile = async (route, usingHook) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.plainText],
    });
    RNFS.readFile(res.uri).then((res) => {
      const toStore = JSON.parse(JSON.parse(res));
      const personalNumber = toStore.personalNumber.slice(0, 10);

      const counters = [];
      toStore.years.map((item) => {
        item.months.map((item) => {
          let obj = {};
          obj.bathHot = item.countersValues.toiletHotCounter
            ? item.countersValues.toiletHotCounter
            : "";
          obj.kitchenHot = item.countersValues.kitchenHotCounter
            ? item.countersValues.kitchenHotCounter
            : "";
          obj.bathCold = "";
          obj.kitchenCold = "";
          obj.sewage = "";
          obj.watering = "";
          obj.datetime = moment(
            item.countersValuesDate.kitchenHotCounter
          ).format("DD.MM.YYYY, h:mm:ss");
          counters.push(obj);
        });
      });

      counters.filter(function (date, i, array) {
        return array.indexOf(date) === i;
      });

      usingHook((prevState) => ({
        prevState: prevState[route.params.ProfileID].push(...counters),
      }));
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log(err);
    } else {
      throw err;
    }
  }
};
