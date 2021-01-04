import { Dimensions } from 'react-native'

const screen = Dimensions.get('window')

export const sWidth = screen.width
export const sHeight = screen.height

export default {
  //MAIN COLOR
  GradientColorFirst: {
    color: '#00AEEF'
  },
  GradientColorSecond: {
    color: '#72A4EE'
  },
  // MAIN
  Container: { flex: 1, backgroundColor: '#fff' },
  ContainerHeader: { marginTop: 55, flex: 1 },
  //--------------------------------------------------------------------------------------------------
  ActionSpinner: { size: 'large', color: '#007BFF', style: { padding: 20 } },
  ActionSpinnerStyle: { padding: 20 }, 
  //--------------------------------------------------------------------------------------------------
  InputRequired: { color: '#FF7171' },
  InputSelection: '#FFFFFF',
  PlaceholderTextColor: '#725cae66',
  //--------------------------------------------------------------------------------------------------
  SwitchTrackColor: { true: '#6e6685e1', false: '#7C7C7C' },
  SwitchThumbColor: { true: '#725CAE', false: '#A7A7A7' },
  SwitchIOSBackgroundColor: '#7C7C7C',
  //--------------------------------------------------------------------------------------------------
  ColorNone: { color: '#00000000' },
  DisplayNone: { display: 'none' },
  //--------------------------------------------------------------------------------------------------

  Error: {
    Caption: { fontSize: 18, fontWeight: 'bold', color: 'red' },
    Text: { fontSize: 18, color: 'red', paddingHorizontal: 10 }
  },

  Empty: {
    Content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    Label: {
      marginBottom: 6,
      fontWeight: 'normal',
      fontSize: 14,
      color: '#fff',
      textAlign: 'center'
    },
    SubLabel: {
      fontWeight: 'normal',
      fontSize: 10,
      color: '#ccc',
      textAlign: 'center'
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
    WarningCaption: { fontSize: 18, fontWeight: 'bold', color: 'yellow' }
  },

  Toolbar: {
    // HISTORY
    Container: { flexDirection: 'column', padding: 0, margin: 0 },
    Icons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
      paddingHorizontal: 20
    },
    Icon: { alignItems: 'center', justifyContent: 'center' }
  },

  Home: {
    Content: {
      paddingHorizontal: 15,
      flex: 1,
      justifyContent: 'space-between'
    },

    Profiles: {
      marginTop: 50,
      paddingTop: 30,
      flex: 1,
      justifyContent: 'space-between'
    },

    Profile: {
      marginBottom: 15,

      flexDirection: 'row',
      justifyContent: 'space-between',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#725CAE',
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
      color: '#fff'
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
      color: '#725CAE'
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
      padding: 15,

      width: 60,
      height: 60,

      alignItems: 'center',
      justifyContent: 'center',

      borderRadius: 20
    },
    ProfileCreateIcon: { color: '#fff', fontSize: 30 }
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
      color: '#fff'
    },

    InputDefault: {
      paddingVertical: 2,
      paddingHorizontal: 7,

      fontSize: 12,
      fontWeight: 'normal',
      color: '#fff',

      borderColor: '#725CAE',
      borderWidth: 1,
      borderRadius: 6
    },
    InputNotModif: {
      padding: 0,
      paddingHorizontal: 5,
      margin: 0,

      fontSize: 16,
      fontWeight: 'bold',
      color: '#725CAE'
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
      color: '#fff',

      borderColor: '#725cae66',
      borderBottomWidth: 1
    },
    EnumeratorItem: {
      fontSize: 13,
      fontWeight: 'normal',
      color: '#fff',
      marginTop: 0
    },

    DeleteIcon: { color: '#FF4D4D', fontSize: 35 },
    SaveIcon: { color: '#007BFF', fontSize: 35 },
    HistoryIcon: { color: 'orange', fontSize: 35 }
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

      backgroundColor: '#725CAE',

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
      color: '#fff',

      borderColor: '#725CAE',
      borderBottomWidth: 1
    },
    ProfileItemLabel: { fontSize: 13, fontWeight: 'normal', color: '#fff' },

    Enumerators: {},
    EnumeratorSection: { marginBottom: 10 },
    EnumeratorCaption: {
      paddingBottom: 8,
      marginBottom: 12,

      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',

      borderColor: '#725CAE',
      borderBottomWidth: 1
    },

    EnumeratorContainer: {
      marginBottom: 10,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    EnumeratorItem: {
      width: '20%',

      fontSize: 13,
      fontWeight: 'normal',
      color: '#fff'
    },
    EnumeratorInput: {
      paddingVertical: 0,
      paddingHorizontal: 10,

      width: '80%',

      fontSize: 13,
      fontWeight: 'normal',
      color: '#725CAE',

      borderColor: '#725CAE',
      borderWidth: 1,
      borderRadius: 6
    },
    EnumeratorLastValue: {
      padding: 0,
      margin: 0,

      fontSize: 11,
      color: '#725CAE'
    },

    InputEnumerator: 7,
    InputNotes: 200,

    EnumeratorContainerNotes: { marginBottom: 5 },
    EnumeratorInputNotesSize: { minHeight: 120 },
    EnumeratorInputNotes: {
      paddingVertical: 6,
      paddingHorizontal: 15,
      margin: 0,

      height: 120,

      fontSize: 13,
      fontWeight: 'normal',
      textAlignVertical: 'top',
      color: '#fff',

      borderColor: '#725CAE',
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
      
      width: '40%',

      borderRadius: 10
    },

    SendBtnText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#fff'
    }
    // SendIcon: { color: 'green', fontSize: 45 }
  },

  Feedback: {
    ViewArea: {
      flex: 1,
      backgroundColor: '#212121',
      alignItems: 'center',
      justifyContent: 'center'
    },
    Container: {
      width: '80%',
      height: '60%',
      backgroundColor: '#212121',
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
      backgroundColor: '#000000',
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
      color: '#FFFFFF',
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
      color: '#FFFFFF'
    }
  },

  History: {
    Content: {
      flex: 9,
      justifyContent: 'space-between',
      padding: 0,
      margin: 0
    },
    //------------------------------------------------------------------------------------------------
    ContentHead: { padding: 0, margin: 10 },
    ContentItem: { marginBottom: 5 },
    ContentItemCaption: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'gray',
      paddingRight: 10
    },
    ContentItemLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007BFF',
      marginHorizontal: 10
    },
    //------------------------------------------------------------------------------------------------
    ContentRecords: { flex: 1, paddingHorizontal: 10 },
    //------------------------------------------------------------------------------------------------
    Record: {
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5
    },
    RecordHead: {
      flexDirection: 'row',
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: 'gray',
      borderBottomWidth: 1,
      borderRightWidth: 1,
      paddingHorizontal: 5,
      paddingVertical: 3,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },
    RecordHeadCaption: { fontSize: 16, fontWeight: 'bold', color: '#007BFF' },

    RecordSection: { marginVertical: 5, marginHorizontal: 5 },
    RecordSectionCaption: { fontSize: 16, fontWeight: 'bold', color: 'gray' },

    RecordSectionItems: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 5
    },
    RecordItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      width: '50%'
    },
    RecordItemHead: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'gray',
      textAlign: 'left'
    },
    RecordItemBody: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#007BFF',
      textAlign: 'right'
    },
    RecordItemBodyNotes: { fontSize: 14, fontWeight: 'bold', color: '#007BFF' },
    //------------------------------------------------------------------------------------------------
    DeleteIcon: { color: '#FF4D4D', fontSize: 35 },
    CalendarIcon: { color: '#04C4AD', fontSize: 35 },
    SortIcon: { color: '#04C42F', fontSize: 35 }
  },

  Menu: {
    Container: {
      flex: 1,
      backgroundColor: '#212121',
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
    Container: { flex: 9, marginHorizontal: 7 },
    PeriodUpdate: { color: 'green', fontSize: 24 },
    //----------------------------------------------------------------------------------------
    slideContainer: { alignItems: 'center' },
    slideTitle: {
      fontSize: 20,
      color: '#007BFF',
      fontWeight: 'bold',
      marginVertical: 10
    },
    //----------------------------------------------------------------------------------------
    imageContainer: { alignItems: 'center' },
    imageContent: {
      width: 300,
      height: 480,
      resizeMode: 'contain'
    },
    //----------------------------------------------------------------------------------------
    explanationTitle: { fontSize: 16, color: '#007BFF', marginTop: 10 },
    regularText: { color: '#007BFF', marginTop: 10, textAlign: 'justify' },
    lastRegularText: {
      color: '#007BFF',
      marginTop: 10,
      marginBottom: 20,
      textAlign: 'justify'
    },
    button: { marginBottom: 7 }
  },

  About: {
    Container: { flex: 1, padding: 30 },
    ContainerCaption: { alignItems: 'center', marginVertical: 30 },
    CaptionText: { color: '#007BFF', fontSize: 28, fontWeight: 'bold' },
    ContainerDetails: { flex: 1 },
    Disclaimer: { color: '#007BFF', marginBottom: 15 },
    Telephone: { color: '#007BFF' },
    Telephone_2: {
      color: '#007BFF',
      marginBottom: 15,
      textDecorationLine: 'underline'
    },
    Link: { color: '#007BFF' },
    Link_2: {
      color: '#007BFF',
      marginBottom: 15,
      textDecorationLine: 'underline'
    },
    Version: { color: '#007BFF', alignSelf: 'flex-end', fontSize: 14 }
  },
  NoNetwork: {
    ContainerCenter: {
      padding: 7,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#212529'
    },
    Image: { marginBottom: 50 },
    ContainerCaption: { alignItems: 'center', marginVertical: 30 },
    CaptionText: {
      color: '#ffffff',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold'
    },
    retryText: {
      marginTop: 10,
      fontSize: 20,
      color: '#725CAE',
      fontWeight: 'bold'
    }
  },
  Checkbox: {
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: sWidth,
      paddingRight: 20
    },
    checkboxStyle: {
      height: 20,
      width: 20,
      borderRadius: 5,
      borderWidth: 0.3,
      borderColor: '#a0a0a0',
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkboxTextStyle: {
      marginLeft: 14,
      color: '#050505',
      lineHeight: 24,
      fontSize: 12
    },
    checkboxImage: {
      height: 10,
      width: 14,
      resizeMode: 'contain'
    }
  },
  // ----------- Modal WArninig-----------
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
      color: '#fff'
    }
  }
  // -----------END Header Modal WArninig-----------
}
