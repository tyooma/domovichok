import React, { useState, useEffect } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import LinearGradient from 'react-native-linear-gradient'

import { ButtonDefault, ButtonDisabled } from './Button'
import moment from 'moment'

import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
const dayNames = [
  'Неділя',
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П’ятниця',
  'Субота'
]
const shortMonthName = [
  'Січ.',
  'Лют.',
  'Бер.',
  'Кв.',
  'Тр.',
  'Черв.',
  'Лип.',
  'Серп.',
  'Вер.',
  'Жовт.',
  'Лист.',
  'Гр.'
]

LocaleConfig.locales['ua'] = {
  monthNames: [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень'
  ],
  monthNamesShort: shortMonthName,
  dayNames,
  dayNamesShort: ['Нд.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
  today: 'Сьогодні'
}
LocaleConfig.defaultLocale = 'ua'

const CalendarCustom = ({
  onClose,
  ProfileID,
  history,
  clearCalendar,
  chooseDay,
  styles
}) => {
  let date = new Date().getDate()
  date.toString().length == 1 ? (date = '0' + date) : null
  let month = new Date().getMonth() + 1
  month.toString().length == 1 ? (month = '0' + month) : null
  const year = new Date().getFullYear()

  const now = `${year}-${month}-${date}`

  const [markedDates, setMarkedDates] = useState({})
  const [dates, setDates] = useState()

  const getDateStr = date => {
    return date.toISOString().slice(0, 10)
  }

  useEffect(() => {
    const markedDatesObject = {}
    console.log('styles', styles.Calendar)

    if (history[ProfileID] && history[ProfileID].length != 0) {
      history[ProfileID].forEach(
        date =>
          (markedDatesObject[getDateStr(moment(date.timestamp).toDate())] = {
            selected: true,
            selectedColor: styles.Calendar.btnTextClose.color,
            marked: true
          })
      )
    }

    setMarkedDates({
      ...markedDatesObject,
      [now]: { selected: true, marked: true }
    })
  }, [now])

  const onSelectDays = day => {
    for (let key in markedDates) {
      if (key === day.dateString) {
        setDates(day)
        setMarkedDates({
          ...markedDates,
          [day.dateString]: {
            selected: true,
            selectedColor: '#39b033',
            marked: true
          }
        })
        chooseDay(day)
        onClose(false)
      }
    }

    // setMarkedDates({
    //   [day.dateString]: { selected: true, selectedColor: "#B986DA" },
    // });
  }

  return (
    <View style={styles.Calendar.bg}>
      <View style={styles.Calendar.container}>
        <ScrollView>
          <View style={styles.Calendar.topBlock}>
            <Text style={styles.Calendar.text}>
              {dayNames[new Date().getDay()]}
            </Text>
          </View>
          <LinearGradient
            colors={[
              styles.GradientColorFirst.color,
              styles.GradientColorSecond.color
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.Calendar.middleBlock}
          >
            <Text style={styles.Calendar.monthText}>
              {shortMonthName[month - 1]}
            </Text>
            <Text style={styles.Calendar.dayText}>{date}</Text>
            <Text style={styles.Calendar.yearText}>{year}</Text>
          </LinearGradient>
          <Calendar
            markingType='multi-dot'
            markedDates={markedDates}
            firstDay={1}
            disabledByDefault
            hideExtraDays={true}
            onDayPress={day => onSelectDays(day)}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            theme={{
              textSectionTitleDisabledColor:
                styles.Calendar.textSectionTitleDisabledColor,
              todayTextColor: styles.Calendar.todayTextColor,
              backgroundColor: styles.Calendar.backgroundColor,
              calendarBackground: styles.Calendar.calendarBackground,
              selectedDayBackgroundColor:
                styles.Calendar.selectedDayBackgroundColor,
              selectedDayTextColor: styles.Calendar.selectedDayTextColor,
              monthTextColor: styles.Calendar.monthTextColor,
              'stylesheet.calendar.header': {
                week: {
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
              }
            }}
          />
          <LinearGradient
            colors={[
              styles.GradientColorFirst.color,
              styles.GradientColorSecond.color
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.Calendar.btnDisabledWrap}
          >
            <TouchableOpacity
              styles={styles}
              onPress={() => {
                clearCalendar && clearCalendar({})
                onClose(false)
              }}
            >
              <Text style={styles.Calendar.btnTextClose}>Закрити</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>
    </View>
  )
}

export default CalendarCustom
