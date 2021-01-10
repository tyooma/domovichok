import React from 'react';

import {Text, View, TouchableOpacity} from 'react-native';

export const ButtonDefault = ({
  title,
  active,
  onPress,
  style,
  flex,
  styles
}) => {
  // const {btn, btnText, notActiveBtn} = styles;
  console.log("ButtonDefault ---- styles",styles,'style',style)
  return (
    <View style={flex ? {flex: 1} : null}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.Calendar.btn,            
            styles.Calendar.notActiveBtn
          ]}>
          <Text
            style={styles.Calendar.btnTextClose}>
            {title}
          </Text>          
        </View>
      </TouchableOpacity>
    </View>
  );
};
