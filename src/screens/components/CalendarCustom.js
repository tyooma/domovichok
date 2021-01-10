import React, { useState, useEffect } from "react";

import { ButtonDefault, ButtonDisabled } from "./Button";

import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";

import moment from "moment";

import { Text, View, StyleSheet, ScrollView } from "react-native";
const dayNames = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П’ятниця",
  "Субота",
];
const shortMonthName = [
  "Січ.",
  "Лют.",
  "Бер.",
  "Кв.",
  "Тр.",
  "Черв.",
  "Лип.",
  "Серп.",
  "Вер.",
  "Жовт.",
  "Лист.",
  "Гр.",
];

LocaleConfig.locales["ua"] = {
  monthNames: [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ],
  monthNamesShort: shortMonthName,
  dayNames,
  dayNamesShort: ["Нд.", "Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб."],
  today: "Сьогодні",
};
LocaleConfig.defaultLocale = "ua";

const CalendarCustom = ({
  onClose,
  ProfileID,
  history,
  clearCalendar,
  chooseDay,
}) => {
  const {
    monthText,
    dayText,
    yearText,
    middleBlock,
    topBlock,
    container,
    bg,
    btnDisabledWrap,
    mb,
  } = styles;

  let date = new Date().getDate();
  date.toString().length == 1 ? (date = "0" + date) : null;
  let month = new Date().getMonth() + 1;
  month.toString().length == 1 ? (month = "0" + month) : null;
  const year = new Date().getFullYear();

  const now = `${year}-${month}-${date}`;

  const [markedDates, setMarkedDates] = useState({});
  const [dates, setDates] = useState();

  const getDateStr = (date) => {
    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    const markedDatesObject = {};
    if (history[ProfileID] && history[ProfileID].length != 0) {
      history[ProfileID].forEach(
        (date) =>
          (markedDatesObject[getDateStr(moment(date.timestamp).toDate())] = {
            selected: true,
            selectedColor: "#B986DA",
            marked: true,
          })
      );
    }

    setMarkedDates({
      ...markedDatesObject,
      [now]: { selected: true, marked: true },
    });
  }, [now]);

  const onSelectDays = (day) => {
    for (let key in markedDates) {
      if (key === day.dateString) {
        setDates(day);
        setMarkedDates({
          ...markedDates,
          [day.dateString]: {
            selected: true,
            selectedColor: "#39b033",
            marked: true,
          },
        });
        chooseDay(day);
        onClose(false);
      }
    }

    // setMarkedDates({
    //   [day.dateString]: { selected: true, selectedColor: "#B986DA" },
    // });
  };

  return (
    <View style={bg}>
      <View style={container}>
        <ScrollView>
          <View style={topBlock}>
            <Text style={{ color: "#FFF" }}>
              {dayNames[new Date().getDay()]}
            </Text>
          </View>
          <View style={middleBlock}>
            <Text style={monthText}>{shortMonthName[month - 1]}</Text>
            <Text style={dayText}>{date}</Text>
            <Text style={yearText}>{year}</Text>
          </View>
          <Calendar
            markingType="multi-dot"
            markedDates={markedDates}
            firstDay={1}
            disabledByDefault
            hideExtraDays={true}
            onDayPress={(day) => onSelectDays(day)}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            theme={{
              textSectionTitleDisabledColor: "#d9e1e8",
              todayTextColor: "#00adf5",
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              selectedDayBackgroundColor: "green",
              selectedDayTextColor: "#fff",
              monthTextColor: "black",
              "stylesheet.calendar.header": {
                week: {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              },
            }}
          />
          <View style={btnDisabledWrap}>
            {/* <ButtonDefault
              title="Вибрати дату"
              active={true}
              style={mb}
              onPress={() => {
                cho(markedDates);
                onClose(false);
              }}
            /> */}
            <ButtonDefault
              title="Закрити"
              onPress={() => {
                clearCalendar && clearCalendar({});
                onClose(false);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    alignSelf: "center",
    justifyContent: "center",
  },
  topBlock: {
    height: 40,
    backgroundColor: "#C092DE",
    justifyContent: "center",
    alignItems: "center",
  },
  btnDisabledWrap: {
    backgroundColor: "#fff",
    padding: 8,
  },
  middleBlock: {
    backgroundColor: "#B986DA",
    justifyContent: "center",
    alignItems: "center",
  },
  monthText: {
    color: "#FFF",
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "FuturaPT-Medium",
  },
  dayText: {
    color: "#FFF",
    fontSize: 75,
    fontFamily: "FuturaPT-Medium",
  },
  yearText: {
    opacity: 0.5,
    color: "#FFF",
    fontSize: 24,
    fontFamily: "FuturaPT-Medium",
  },
  mb: {
    marginBottom: 8,
  },
});

export default CalendarCustom;
