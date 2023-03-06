import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      alignItems: 'center'
    },
    dashboardBoxPurple: {
      backgroundColor: '#D2D6EF'
    },
    sectionHeading: {
      fontFamily: 'Quicksand-Medium',
      textAlign: 'center',
      fontSize: 24
    },
    bodyText: {
      fontFamily: 'Roboto-Regular'
    },
    standardBtn: {
      backgroundColor: '#4059AD',
      width: 200,
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center'
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
      flexDirection: 'row'
    },
    jlptBtn: {
      width: 40,
      height: 25,
      backgroundColor: '#4059AD',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    jlptBtnText: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16
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
      width: '24%',
      height: 150,
      marginBottom: 10,
      justifyContent: 'center',
      alignContent: 'center'
    },
    kanjiMeta: {
      flex: 1,
      alignItems: 'center'
    },
    kanjiCanvas: {
      flex: 2,
      backgroundColor: '#FFF',
      borderRadius: 4
    },
    kanjiFooter: {
      flex: 1
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
      fontSize: 24
    }
  }
  );

  export default styles;