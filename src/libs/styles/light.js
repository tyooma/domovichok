import { Dimensions } from 'react-native'

const screen = Dimensions.get('window')

export const sWidth = screen.width
export const sHeight = screen.height

export default {
  //DRAWER
  Drawer: {
    flex: 1,
    backgroundColor: '#fff',

    Head: {
      padding: 15,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    Logo: {
      width: 110,
      height: 82
    },

    List: {
      padding: 4
    }
  },

  //MAIN COLORS
  GradientColorFirst: {
    color: '#00AEEF'
  },

  GradientColorSecond: {
    color: '#72A4EE'
  },

  MainColor: {
    color: '#212121'
  },

  // MAIN
  Container: { flex: 1, backgroundColor: '#fff' },

  ContainerHeader: { flex: 1 },

  ActionSpinner: { size: 'large', color: '#00AEEF', style: { padding: 20 } },

  ActionSpinnerStyle: { padding: 20 },

  InputRequired: { color: '#FF7171' },

  InputSelection: '#212121',

  PlaceholderTextColor: '#00AEEF66',

  SwitchTrackColor: { true: '#d9fcf2', false: '#bababa' },

  SwitchThumbColor: { true: '#00AEEF', false: '#d6d6d6' },

  SwitchIOSBackgroundColor: '#7C7C7C',

  ColorNone: { color: '#212121' },

  DisplayNone: { display: 'none' },

  Error: {
    Caption: { fontSize: 18, fontWeight: 'bold', color: 'red' },
    Text: { fontSize: 18, color: 'red', paddingHorizontal: 10 }
  },

  Empty: {
    Content: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      paddingTop: sHeight / 3
    },
    homeView: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    Label: {
      marginBottom: 6,

      fontWeight: 'normal',
      fontSize: 14,
      textAlign: 'center',
      color: '#212121'
    },
    SubLabel: {
      fontWeight: 'normal',
      fontSize: 10,
      textAlign: 'center',
      color: '#212121'
    },
    SectionRow: { flexDirection: 'row', alignItems: 'center' },
    Link: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007BFF',
      paddingBottom: 2,
      borderBottomWidth: 1,
      borderColor: '#007BFF'
    },
    WarningSection: { alignItems: 'center', margin: 5 },
    WarningCaption: { fontSize: 18, fontWeight: 'normal', color: '#212121' }
  },

  Home: {
    Content: {
      paddingHorizontal: 15,
      flex: 1,
      justifyContent: 'space-between'
    },

    Profiles: {
      paddingTop: 30,
      marginTop: 50,

      flex: 1,
      justifyContent: 'space-between'
    },

    Profile: {
      marginBottom: 15,

      flexDirection: 'row',
      justifyContent: 'space-between',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#00AEEF',
      borderRadius: 6
    },

    ProfileInfo: {
      paddingTop: 14,
      paddingLeft: 17
    },

    ProfileCaption: {
      marginBottom: 8,

      fontSize: 14,
      fontWeight: 'normal',
      color: '#212121'
    },

    ProfileIcons: {
      paddingTop: 8,
      paddingRight: 11,
      paddingBottom: 11,

      flexDirection: 'column',
      justifyContent: 'center'
    },

    ProfileIcon: {
      marginBottom: 10,

      fontSize: 26,
      fontWeight: 'normal',
      color: '#00AEEF'
    },

    ProfileDispatchSection: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '17%',
      height: 40,
      backgroundColor: 'green',
      borderRadius: 10
    },

    ProfileCreateContainer: {
      paddingRight: 15,
      paddingBottom: 40,

      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },

    ProfileCreateSection: {
      marginTop: 2,
      padding: 15,

      width: 60,
      height: 60,

      alignItems: 'center',
      justifyContent: 'center',

      borderRadius: 20
    },

    ProfileCreateIcon: { fontSize: 30, color: '#fff' },

    ProfileSubBtn: {
      marginBottom: 8,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },

    ProfileCreateSubSection: {
      padding: 10,

      width: 50,
      height: 50,

      alignItems: 'center',
      justifyContent: 'center',

      borderRadius: 20
    },

    ProfileSubBtnText: {
      marginRight: 10,

      color: '#212121'
    },

    ProfileCreateSubIcon: {
      fontSize: 20,
      color: '#fff'
    }
  },

  Profile: {
    Content: {
      marginTop: 50,

      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    ScrollView: {
      paddingTop: 30,
      paddingHorizontal: 15
    },

    InputContainer: { paddingHorizontal: 7 },
    InputSection: { marginBottom: 7 },
    InputItem: { marginBottom: 13 },
    InputCaption: {
      marginBottom: 10,

      fontSize: 13,
      fontWeight: 'normal',
      color: '#212121'
    },

    InputDefault: {
      paddingVertical: 2,
      paddingHorizontal: 7,

      fontSize: 12,
      fontWeight: 'normal',
      color: '#212121',

      borderColor: '#00AEEF',
      borderWidth: 1,
      borderRadius: 6
    },
    InputNotModif: {
      padding: 0,
      margin: 0,

      fontSize: 16,
      fontWeight: 'bold',
      color: '#00AEEF'
    },

    EnumeratorContainer: {
      marginBottom: 10,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    EnumeratorCaption: {
      paddingBottom: 10,
      marginBottom: 10,

      fontSize: 14,
      fontWeight: 'bold',
      color: '#212121',

      borderColor: '#00AEEF',
      borderBottomWidth: 1
    },
    EnumeratorItem: {
      fontSize: 13,
      fontWeight: 'normal',
      color: '#212121',
      marginTop: 0
    },

    Toolbar: {
      marginBottom: 50,

      flexDirection: 'column'
    },

    Btns: {
      alignItems: 'center',
      justifyContent: 'center'
    },

    BtnContainer: {
      marginBottom: 15
    },

    Btn: {
      paddingVertical: 10,
      paddingHorizontal: 30,

      borderRadius: 10
    },

    BtnText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#fff'
    }
  },

  Dispatch: {
    Container: {
      paddingTop: 30,
      paddingBottom: 50,
      paddingHorizontal: 15,
      marginTop: 50,

      flex: 1
    },
    Content: { paddingHorizontal: 10, paddingTop: 5 },

    HeaderRememberSection: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      marginBottom: 15,

      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: '#00AEEF',

      borderRadius: 6
    },
    HeaderRememberCaption: {
      fontSize: 14,
      color: '#fff'
    },
    Profile: { marginBottom: 0 },
    ProfileItem: { marginBottom: 20 },
    ProfileItemCaption: {
      paddingBottom: 8,
      marginBottom: 12,

      fontSize: 16,
      fontWeight: 'bold',
      color: '#212121',

      borderColor: '#00AEEF',
      borderBottomWidth: 1
    },
    ProfileItemLabel: { fontSize: 13, fontWeight: 'normal', color: '#212121' },

    Enumerators: {},
    EnumeratorSection: { marginBottom: 10 },
    EnumeratorCaption: {
      paddingBottom: 8,
      marginBottom: 12,

      fontSize: 16,
      fontWeight: 'bold',
      color: '#212121',

      borderColor: '#00AEEF',
      borderBottomWidth: 1
    },

    EnumeratorContainer: {
      marginBottom: 10
    },

    EnumeratorItemWrap: {
      marginBottom: 10,

      flexDirection: 'row',
      alignItems: 'center'
    },

    EnumeratorItem: {
      width: '20%',

      fontSize: 13,
      fontWeight: 'normal',
      color: '#212121'
    },

    EnumeratorInput: {
      paddingVertical: 0,
      paddingHorizontal: 10,

      width: '80%',

      fontSize: 13,
      fontWeight: 'normal',
      color: '#00AEEF',

      borderColor: '#00AEEF',
      borderWidth: 1,
      borderRadius: 6
    },

    EnumeratorLastValueLabel: {
      fontSize: 11,
      color: '#212121'
    },

    EnumeratorLastValue: {
      fontSize: 11,
      color: '#00AEEF'
    },

    InputEnumerator: 7,
    InputNotes: 200,

    EnumeratorContainerNotes: { marginBottom: 5 },
    EnumeratorInputNotesSize: { minHeight: 120, borderBottomWidth: 0 },
    EnumeratorInputNotes: {
      paddingVertical: 6,
      paddingHorizontal: 15,
      margin: 0,

      height: 120,

      fontSize: 13,
      fontWeight: 'normal',
      textAlignVertical: 'top',
      color: '#212121',

      borderColor: '#00AEEF',
      borderWidth: 1,
      borderRadius: 10
    },

    Toolbar: {
      padding: 5,
      marginBottom: 50,

      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },

    SendBtn: {
      paddingVertical: 10,
      paddingHorizontal: 30,

      borderRadius: 10
    },

    SendBtnText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#fff'
    }
  },

  Feedback: {
    ViewArea: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    Container: {
      width: '80%',
      height: '60%',
      backgroundColor: '#fff',
      borderColor: '#007BFF',
      borderWidth: 2,
      padding: 0,
      margin: 0,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5
    },
    Head: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      borderColor: '#007BFF',
      borderBottomWidth: 2,
      borderRightWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },
    HeadCaption: { fontSize: 18, fontWeight: 'bold', color: '#007BFF' },

    Spinner: { justifyContent: 'flex-start' },
    SpinnerCaption: { alignItems: 'center' },
    SpinnerLabel: { fontSize: 18, fontWeight: 'bold', color: '#007BFF' },

    Content: { flex: 1, justifyContent: 'space-between', margin: 10 },
    ContentMessages: {},
    MessagesText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#212121',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10
    },
    MessagesTextError: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'red',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10
    },

    Toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    ToolbarButton: {
      backgroundColor: '#007BFF',
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#212121'
    }
  },

  History: {
    Content: {
      paddingHorizontal: 15,

      justifyContent: 'space-between'
    },


    InputDefault: {
      paddingVertical: 2,
      paddingHorizontal: 7,

      fontSize: 16,
      fontWeight: 'bold',
      color: '#212121',

      borderColor: '#00AEEF',
      borderWidth: 1,
      borderRadius: 6
    },

    ContentHead: { paddingTop: 30, paddingHorizontal: 10, marginTop: 50 },

    ContentItem: { marginBottom: 20 },

    HeaderRememberCaption: {
      fontSize: 14,
      color: '#212121'
    },

    ContentItemCaption: {
      paddingBottom: 8,
      marginBottom: 12,

      fontSize: 16,
      fontWeight: 'bold',
      color: '#212121',

      borderColor: '#00AEEF',
      borderBottomWidth: 1
    },

    ContentItemLabel: {
      fontSize: 13,
      fontWeight: 'normal',
      color: '#212121'
    },

    ContentRecords: { flex: 1, paddingHorizontal: 10 },

    RecordList: {
      marginBottom: 40
    },

    Record: {
      marginBottom: 15,

      borderWidth: 1,
      borderColor: '#00AEEF',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10
    },

    RecordGradient: {
      marginBottom: 13,

      borderTopRightRadius: 10,
      borderTopLeftRadius: 10
    },

    RecordHead: {
      paddingVertical: 10,
      paddingHorizontal: 15,

      flexDirection: 'row',
      alignItems: 'center',

      borderTopRightRadius: 10,
      borderTopLeftRadius: 10
    },

    RecordHeadCaption: { fontSize: 14, fontWeight: 'normal', color: '#212121' },

    RecordSection: { paddingHorizontal: 15, marginBottom: 15 },

    RecordSectionCaption: {
      marginBottom: 6,

      fontSize: 14,
      fontWeight: 'bold',
      color: '#212121'
    },

    RecordSectionItems: {},

    RecordItemContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    RecordItemHead: {
      fontSize: 13,
      fontWeight: 'normal',
      color: '#212121'
    },

    RecordItemBody: {
      fontSize: 13,
      fontWeight: 'normal',
      color: '#212121'
    },

    RecordItemBodyNotes: {
      fontSize: 13,
      fontWeight: 'normal',
      color: '#212121'
    }
  },

  Menu: {
    Container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-between'
    },
    Content: { height: '95%' },
    LogoContainer: { alignItems: 'center' },
    LogoContent: { width: 135, height: 95 },
    TopDivider: { backgroundColor: '#007BFF', height: 1, marginVertical: 5 },
    ItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10
    },
    ItemCaption: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007BFF',
      marginLeft: 20
    },
    InstructionIcon: { color: '#007BFF', fontSize: 25 },
    PrivatePolicyIcon: { color: '#007BFF', fontSize: 25 },
    SettingsIcon: { color: '#007BFF', fontSize: 25 },
    AboutIcon: { color: '#007BFF', fontSize: 25 }
  },

  Settings: {
    Content: { flex: 9, padding: 10 },
    Section: { paddingVertical: 0, marginBottom: 20 },
    SectionCaption: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'gray',
      borderColor: 'gray',
      borderBottomWidth: 1,
      paddingBottom: 2,
      marginBottom: 2
    },

    LocaleSection: { justifyContent: 'space-between', marginTop: 5 },
    LocaleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'gray',
      borderColor: 'gray',
      borderWidth: 1,
      padding: 5,
      marginVertical: 3
    },
    LocaleDefault: { backgroundColor: '#2A2A2A' },
    LocaleSelected: { backgroundColor: '#555555' },
    LocaleCaption: { fontSize: 18, marginTop: 0 },
    LocaleCaptionDefault: { color: 'white' },
    LocaleCaptionSelected: { color: '#007BFF', fontWeight: 'bold' },
    LocaleImage: { width: 45, height: 45 },

    ThemeItems: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    ThemeItem: { width: '48%' },
    ThemeItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'gray',
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      marginVertical: 10
    },
    ThemeDefault: { backgroundColor: '#2A2A2A' },
    ThemeSelected: { backgroundColor: '#555555' },
    ThemeCaption: { fontSize: 18, color: 'white', margin: 0 },
    ThemeDarkIcon: { ColorTrue: '#007BFF', ColorFalse: 'gray', Size: 40 },
    ThemeLightIcon: { ColorTrue: '#007BFF', ColorFalse: 'gray', Size: 40 },

    SwitchItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    SwitchItemCaption: { fontSize: 18, color: 'gray', marginTop: 0 }
  },

  Policy: {
    Container: { flex: 1 },
    ParagraphHead: {
      fontSize: 18,
      color: '#007BFF',
      marginTop: 20,
      marginBottom: 10,
      fontStyle: 'italic'
    },
    ParagraphText: { color: '#007BFF', marginBottom: 10, textAlign: 'justify' },
    Warning: {
      paddingLeft: 10,
      fontSize: 22,
      fontWeight: 'bold',
      color: '#C0392B'
    }
  },

  Help: {
    Container: { flex: 1, paddingTop: 5, marginTop: 50, marginHorizontal: 7 },

    PeriodUpdate: { color: 'green', fontSize: 24 },

    slideContainer: { alignItems: 'center' },

    slideTitle: {
      marginVertical: 10,

      fontSize: 20,
      fontWeight: 'normal',
      color: '#212121'
    },

    imageContainer: { alignItems: 'center' },

    imageContent: {
      width: 300,
      height: 480,
      resizeMode: 'contain'
    },

    explanationTitle: { fontSize: 16, color: '#212121', marginTop: 10 },

    regularText: { color: '#212121', marginTop: 10, textAlign: 'justify' },

    lastRegularText: {
      marginTop: 10,
      marginBottom: 20,

      textAlign: 'justify',
      color: '#212121'
    },

    button: { marginBottom: 7 }
  },

  About: {
    Container: {
      paddingVertical: 30,
      paddingHorizontal: 15,
      marginTop: 50,
      flex: 1
    },
    ContainerCaption: {
      marginBottom: 30,

      alignItems: 'center'
    },
    CaptionText: { fontSize: 18, fontWeight: 'normal', color: '#212121' },
    ContainerDetails: { flex: 1 },
    Disclaimer: { color: '#212121', marginBottom: 15 },
    Telephone: { color: '#212121' },
    Telephone_2: {
      color: '#00AEEF',
      marginBottom: 15,
      textDecorationLine: 'underline'
    },
    Link: { color: '#212121' },
    Link_2: {
      color: '#00AEEF',
      marginBottom: 15,
      textDecorationLine: 'underline'
    },
    Version: { color: '#00AEEF', alignSelf: 'flex-end', fontSize: 14 }
  },

  NoNetwork: {
    ContainerCenter: {
      padding: 7,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    Image: { marginBottom: 50 },

    ContainerCaption: { alignItems: 'center', marginVertical: 30 },

    Gradient: {
      padding: 10,

      borderRadius: 50
    },

    SuccessIcon: {
      fontSize: 60,
      color: '#fff'
    },

    CaptionText: {
      marginTop: 15,

      alignItems: 'center',

      fontSize: 18,
      fontWeight: 'normal',
      textAlign: 'center',
      color: '#212121'
    },

    retryText: {
      marginTop: 10,

      fontSize: 14,
      fontWeight: 'bold',
      color: '#00AEEF'
    }
  },

  Checkbox: {
    marginTop: 10,
    marginBottom: 40,

    flexDirection: 'row',

    CheckboxStyle: {
      height: 20,
      width: 20,

      justifyContent: 'center',
      alignItems: 'center',

      borderRadius: 5,
      borderWidth: 0.3,
      borderColor: '#00AEEF'
    },

    CheckboxImage: {
      height: 10,
      width: 14,
      resizeMode: 'contain'
    },

    Policy: {
      marginHorizontal: 10,

      flexDirection: 'row',
      flexWrap: 'wrap'
    },

    PolicyText: {
      color: '#212121'
    },

    PolicyTouch: {
      color: '#00AEEF'
    }
  },

  Warning: {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },

    modal: {
      backgroundColor: '#00000099',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    modalContainer: {
      backgroundColor: '#fff',
      borderRadius: 5
    },

    modalHeader: {
      alignItems: 'center',
      justifyContent: 'center'
    },

    title: {
      fontWeight: 'bold',
      fontSize: 20,
      padding: 15,
      color: '#000'
    },

    divider: {
      width: '100%',
      height: 1,
      backgroundColor: 'lightgray'
    },

    modalBody: {
      backgroundColor: '#fff',
      paddingVertical: 20,
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },

    bodyText: {
      fontSize: 20
    },

    modalFooter: {},

    actions: {
      borderRadius: 5,
      marginHorizontal: 10,
      paddingVertical: 10,
      paddingHorizontal: 20
    },

    actionText: {
      color: '#212121'
    }
  },
  sortBlockStyle:{  
    padding: 15,  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
}
