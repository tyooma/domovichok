import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Icon, Divider, Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { DispatchToProps, StateToProps } from '../store/MapToProps';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { ActionBack } from './components/Actions';
import { PeriodUpdate } from './Dispatch/DispatchSend';

const Instruction = ({ locale, styles, media, toPeriod, navigation }) => {
  return (
    <SafeAreaView style={styles.Container}>
      {/* <View style={styles.Header}>
        <View style={styles.HeaderLeft}>
          <View style={styles.HeaderIcon}><ActionBack navigation={navigation} /></View>
          <Text style={styles.HeaderCaption}>{locale.instruction_caption}</Text>
        </View>
        <View style={styles.HeaderRight}>
          <View style={styles.HeaderIconRight}>
            <TouchableOpacity onPress={() => PeriodUpdate(locale, toPeriod)}>
              <Icon name="sync-alt" iconStyle={styles.Help.PeriodUpdate} type="font-awesome-5" />
            </TouchableOpacity>
          </View>
          <Text style={styles.HeaderCaption}></Text>
        </View>
      </View>
      <Divider style={styles.Divider} /> */}
      <View style={styles.Help.Container}>
      <ScrollView>
          {/* <Divider style={styles.Divider} /> */}
          <Collapse>
            <CollapseHeader>
              <View style={styles.Help.slideContainer}>
                <Text style={styles.Help.slideTitle}>{locale.help_main_page}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <View style={styles.Help.imageContainer}>
                  <Image style={styles.Help.imageContent} source={media.Help.HomeScreenEmpty} />
                </View>
                <Text style={styles.Help.regularText}>{locale.help_main_page_text_1}</Text>
                <Text style={styles.Help.regularText}>{locale.help_main_page_text_2}</Text>
                <Text style={styles.Help.lastRegularText}>{locale.help_main_page_text_3}</Text>
                <View style={styles.Help.imageContainer}>
                  <Image style={styles.Help.imageContent} source={media.Help.HomeScreenFull} />
                </View>
                <Text style={styles.Help.regularText}>{locale.help_main_page_text_4}</Text>
                <Text style={styles.Help.lastRegularText}>{locale.help_main_page_text_5}</Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Divider style={styles.Divider} />
          <Collapse>
            <CollapseHeader>
              <View style={styles.Help.slideContainer}>
                <Text style={styles.Help.slideTitle}>{locale.help_profile_page}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <View style={styles.Help.imageContainer}>
                  <Image style={styles.Help.imageContent} source={media.Help.Profile} />
                </View>
                <Text style={styles.Help.regularText}>{locale.help_profile_foreword}</Text>
                <Text style={styles.Help.regularText}>{locale.help_profile_paragraph}</Text>
                <Text style={styles.Help.regularText}>{locale.help_profile_paragraph_1_1}</Text>
                <Text style={styles.Help.regularText}>{locale.help_profile_paragraph_1_2}</Text>
                <Text style={styles.Help.regularText}>{locale.help_profile_paragraph_2}</Text>
                <Text style={styles.Help.regularText}>{locale.help_profile_paragraph_3}</Text>
                <Text style={styles.Help.regularText}>{locale.help_profile_paragraph_4}</Text>
                <Text style={styles.Help.regularText}>{locale.help_profile_heatmeter_details}</Text>
                <Text style={styles.Help.lastRegularText}>{locale.help_profile_save}</Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Divider style={styles.Divider} />
          <Collapse>
            <CollapseHeader>
              <View style={styles.Help.slideContainer}>
                <Text style={styles.Help.slideTitle}>{locale.help_send_page}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <View style={styles.Help.imageContainer}>
                  <Image style={styles.Help.imageContent} source={media.Help.SendDataEmpty} />
                </View>
                <Text style={styles.Help.regularText}>{locale.help_send_foreword}</Text>
                <Text style={styles.Help.regularText}>{locale.help_send_text_1}</Text>
                <Text style={styles.Help.regularText}>{locale.help_send_text_2}</Text>
                <Text style={styles.Help.lastRegularText}>{locale.help_send_text_3}</Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Divider style={styles.Divider} />
          <Collapse>
            <CollapseHeader>
              <View style={styles.Help.slideContainer}>
                <Text style={styles.Help.slideTitle}>{locale.help_history_page}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <View style={styles.Help.imageContainer}>
                  <Image style={styles.Help.imageContent} source={media.Help.HistoryScreen} />
                </View>
                <Text style={styles.Help.regularText}>{locale.help_history_foreword}</Text>
                <Text style={styles.Help.regularText}>{locale.help_history_condition}</Text>

                <Text style={styles.Help.lastRegularText}>{locale.help_history_delete}</Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Divider style={styles.Divider} />
          <Collapse>
            <CollapseHeader>
              <View style={styles.Help.slideContainer}>
                <Text style={styles.Help.slideTitle}>{locale.help_period}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View>
                <Text style={styles.Help.lastRegularText}>{locale.help_show_period}</Text>
              </View>
            </CollapseBody>
          </Collapse>
          <Divider style={styles.Divider} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default connect(StateToProps(), DispatchToProps())(Instruction);
