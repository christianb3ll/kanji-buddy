import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: deviceWidth,
      padding: 10,
      backgroundColor: '#F7F7F9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      backgroundColor: '#FFF',
      height: 100,
    },
    headerContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    tabs: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: '#000'
    },
    dashboardBox: {
      width: '100%',
      backgroundColor: '#FFF',
      borderColor: '#4059AD',
      borderWidth: 2,
      borderRadius: 8,
      alignItems: 'center',
      paddingTop: '5%',
      paddingBottom: '5%',
    },
    dashboardBoxPurple: {
      backgroundColor: '#D2D6EF',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    sectionHeading: {
      fontFamily: 'Quicksand-Medium',
      textAlign: 'center',
      fontSize: 24
    },
    bodyText: {
      fontFamily: 'Roboto-Regular',
      marginBottom: 10
    },
    standardBtn: {
      backgroundColor: '#4059AD',
      width: 200,
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    halfWidthBtn: {
      width: 100
    },
    standardBtnText: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      textAlign: 'center',
      color: '#FFF'
    },
    jlptBtnContainer: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10
    },
    jlptBtn: {
      width: 48,
      height: 30,
      backgroundColor: '#4059AD',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5
    },
    jlptBtnText: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      color: '#FFF'
    },
    jlptBtnActive: {
      backgroundColor: '#D2D6EF',
    },
    jlptBtnDisabled: {
      opacity: 0.3
    },
    kanjiGrid: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%'
    },
    kanjiCard: {
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: {
        width: 2,
        height: 2
      },
      width: deviceWidth/5,
      height: (deviceWidth/5)*1.5,
      margin: 5,
    },
    kanjiCardInactive: {
      opacity: 0.2
    },
    kanjiMeta: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center"
    },
    kanjiCanvas: {
      backgroundColor: '#FFF',
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center"
    },
    canvasBtn: {
      padding: 10,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      borderRadius: 8
    },
    kanjiFooter: {
      flex: 1,
      justifyContent: 'center'
    },
    kanjiEnglishName: {
      fontFamily: 'Roboto-Regular',
      fontSize: 28,
    },
    readings: {
      width: '100%',
      flexDirection: 'row'
    },
    onYomi: {
      flex: 1,
      alignItems: 'center'
    },
    kunYomi: {
      flex: 1,
      alignItems: 'center'
    },
    readingHeading: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16
    },
    japaneseReading: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 14
    },
    settingsContainer: {
      width: '100%'
    },
    progressBar: {
      flex: 4,
      position: 'relative',
      width: '100%',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#0E0004',
      backgroundColor: 'transparent'
    },
    progressBarFill: {
      position: 'absolute',
      backgroundColor: '#91EB8F',
      height: '100%'
    },
    progressBarText: {
      fontSize: 12
    },
    progressSection: {
      width: '50%',
      marginTop: 10,
      marginBottom: 10
    },
    progressBlock: {
      flexDirection: 'row',
      marginBottom: 10
    },
    progressLabel: {
      flex: 1,
    }
  }
  );

  export default styles;