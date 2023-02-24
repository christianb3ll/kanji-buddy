import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { Font } from 'expo';
import { useFonts } from 'expo-font';
import { SvgXml, SvgCss } from 'react-native-svg';
import { useState, useRef, useCallback } from 'react';
// import { Canvas, CanvasRef } from '@benjeau/react-native-draw';
// import * as Kanji from "kanji-react-icons/dist/kanji";

import LogoImg from './assets/images/kanji-buddy-logo.svg';
import DashboardIcon from './assets/images/dashboard-icon.svg';
import StudyIcon from './assets/images/study-icon.svg';
import ReviewIcon from './assets/images/review-icon.svg';
import MyKanjiIcon from './assets/images/my-kanji-icon.svg';
// import kanjiListData from './kanjiList.js';

// Import GlyphWiki data
import glyphwikiData from './glyph-wiki-kanji-list.js';

// Prevent the splash screen from hiding until fonts have been loaded
// SplashScreen.preventAutoHideAsync();


// const kanjiList = kanjiListData;


// glyphwikiData.map((kanji)=>{
//   console.log(kanji.kanji);
// })

// Kanji List Component
function KanjiListComponent({navigation}){
  return(
    <ScrollView>
      <View style={styles.kanjiGrid}>
        {glyphwikiData.map((kanji)=>{
            return(
              <TouchableOpacity 
                style={styles.kanjiCard}
                key={kanji.kanji}
                onPress={() => navigation.navigate("Kanji", {kanji})}
              >
                <SvgXml xml={kanji.image} width="100%" height="100%" />
              </TouchableOpacity>
            )})
        }
      </View>
    </ScrollView>
  )
}



// export function KanjiCanvas (){
//   const canvasRef = useRef<CanvasRef>(null);

//   const handleUndo = () => {
//     canvasRef.current?.undo();
//   };

//   const handleClear = () => {
//     canvasRef.current?.clear();
//   };

//   return (
//     <>
//       <Canvas
//         ref={canvasRef}
//         height={500}
//         color="red"
//         thickness={20}
//         opacity={0.6}
//         style={{ backgroundColor: 'black' }}
//       />
//       <Button title="Undo" onPress={handleUndo} />
//       <Button title="Clear" onPress={handleClear} />
//     </>
//   );
// };





// Dashboard page
function DashboardPage({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.dashboardBox}>
        <Text style={styles.sectionHeading}>Study</Text>
        <Text style={styles.bodyText}>It looks like you're new here!</Text>
        <TouchableOpacity style={styles.standardBtn} onPress={() => navigation.navigate("Study Kanji")}>
          <Text style={styles.standardBtnText}>Start Learning</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.dashboardBox, styles.dashboardBoxPurple]}>
        <Text style={styles.sectionHeading}>Review</Text>
        <Text style={styles.bodyText}>You have 22 reviews waiting</Text>
        <TouchableOpacity style={styles.standardBtn} onPress={() => navigation.navigate("Review Kanji")}>
          <Text style={styles.standardBtnText}>Start Reviewing</Text>
        </TouchableOpacity>
      </View>

      <View>

        {/* {console.log(kanjitest)} */}
        {/* <SvgCss xml={Kanji.Kanji七.toString()}  /> */}
        
      </View>
      
    </View>
    );
  };

// Create the study navigation stack
const StudyStack = createStackNavigator();

// Study page
function StudyPage({ navigation }) {
  return (
      <StudyStack.Navigator>
        <StudyStack.Screen name='Study' options={{ headerShown: false }} component={StudyHomePage}/>
        <StudyStack.Screen name='Kanji' component={KanjiPracticePage}/>
      </StudyStack.Navigator>
    );
  };

// Study home page
function StudyHomePage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* study CTA */}
      <View style={[styles.dashboardBox, styles.dashboardBoxPurple]}>
        <Text>
          Progress box
        </Text>
        <TouchableOpacity style={[styles.standardBtn, styles.halfWidthBtn]} onPress={() => navigation.navigate("Kanji")}>
          <Text style={styles.standardBtnText}>Study</Text>
        </TouchableOpacity>
      </View>

      {/* JLPT level select */}
      <View style={styles.jlptBtnContainer}>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnActive]}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.jlptBtn}><Text style={{color: '#fff'}}>N5</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N4</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N3</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N2</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N1</Text></TouchableOpacity>
      </View>

      {/* kanji grid */}
      
      <Text>This is the Study page</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Kanji")}>
          <Text>Kanji</Text>
        </TouchableOpacity>

        <KanjiListComponent navigation={navigation}/>
      </View>
      
    );
  };

// Kanji pactice page
function KanjiPracticePage({ route, navigation }) {
  const [kanjiInfo, setKanjiInfo] = useState();

  const kanji = route.params.kanji;

  // Get the kanji details
  const makeCall = function() {
    // make api call
    fetch(`https://kanjiapi.dev/v1/kanji/${kanji.kanji}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setKanjiInfo(json);
    });
  }

  if (kanjiInfo === undefined){
    return (
      <View style={styles.container}>
        <Text>This is a Kanji page... no current kanji</Text>
        <TouchableOpacity onPress={makeCall}>
          <Text>Get Kanji {kanji.kanji} </Text>
        </TouchableOpacity>
      </View>
      );
  } else {
    return (
      <View style={styles.container}>
        <Text>{kanjiInfo.kanji}</Text>
        <Text>Kun Yomi Reading</Text>
        <Text>{kanjiInfo.kun_readings}</Text>
        <Text>On Yomi Reading</Text>
        <Text>{kanjiInfo.on_readings}</Text>
        <Text>{kanjiInfo.meanings}</Text>
      </View>
    );
  }
  };

// Create the review navigation stack
const ReviewStack = createStackNavigator();

// Review page navigation
function ReviewPage({ navigation }) {
  return (
      <StudyStack.Navigator>
        <StudyStack.Screen name='Review' options={{ headerShown: false }} component={ReviewHomePage}/>
        <StudyStack.Screen name='Kanji' component={KanjiReviewPage}/>
      </StudyStack.Navigator>
    );
  };

// Review listing page
function ReviewHomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You haven't learned any Kanji yet...</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Kanji")}>
        <Text>Review</Text>
      </TouchableOpacity>
    </View>
    );
  };

// Kanji review page
function KanjiReviewPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Time to review some kanji</Text>
    </View>
    );
  };

// MyKanji page
function MyKanjiPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You haven't learned any Kanji yet...</Text>
      {/* <Text>{myKanji.map((kanji)=> {
        kanji + ", ";
      })}</Text> */}
    </View>
    );
  };

// Navigation Header
function HeaderComponent() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerContent}>

          <SvgCss xml={LogoImg} width="250" height="100"/>

          <TouchableOpacity>
            <Text>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Create the tab navigator
const TabNav = createBottomTabNavigator();

// Setup the header
const Header  = {
  header: (props) => <HeaderComponent {...props} />
};

export default function App() {
  // Add custom fonts
  const [fontsLoaded] = useFonts({
    'NotoSansJP-Regular': require('./assets/fonts/NotoSansJP-Regular.otf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf')
  });

  // Load fonts asynchronously: https://docs.expo.dev/guides/using-custom-fonts/
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }


  // Add to NavigationContainer -- > onLayout={onLayoutRootView}

  return (
    <NavigationContainer >
    <TabNav.Navigator screenOptions={({ route }) => ({
          headerShown: true,
          tabBarLabelStyle: styles.tabs,
          tabBarIcon: ({ color }) => {
            // add custom icons
            let icon;
            // set icon based on route name
            if(route.name === 'Dashboard') icon = <SvgXml xml={DashboardIcon}  />;
            if(route.name === 'Study Kanji') icon = <SvgXml xml={StudyIcon}  />;
            if(route.name === 'Review Kanji') icon = <SvgXml xml={ReviewIcon}  />;
            if(route.name === 'My Kanji') icon = <SvgXml xml={MyKanjiIcon} />;

            return icon;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <TabNav.Screen name="Dashboard" component={DashboardPage} options={Header} />
        <TabNav.Screen name="Study Kanji" component={StudyPage} options={Header} />
        <TabNav.Screen name="Review Kanji" component={ReviewPage}options={Header} />
        <TabNav.Screen name="My Kanji" component={MyKanjiPage} options={Header} />
      </TabNav.Navigator>
    </NavigationContainer>
  );
}

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
    flexDirection: 'row'
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
    width: '20%',
    height: 150,
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center'
  }

});
