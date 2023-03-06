import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { Font } from 'expo';
import { useFonts } from 'expo-font';
import { SvgXml, SvgCss } from 'react-native-svg';
import React, { useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Canvas, CanvasRef, CanvasControls } from '@benjeau/react-native-draw';
// import * as Kanji from "kanji-react-icons/dist/kanji";
import styles from './Styles.js'

import LogoImg from './assets/images/kanji-buddy-logo.svg';
import DashboardIcon from './assets/images/dashboard-icon.svg';
import StudyIcon from './assets/images/study-icon.svg';
import ReviewIcon from './assets/images/review-icon.svg';
import MyKanjiIcon from './assets/images/my-kanji-icon.svg';
// import kanjiListData from './kanjiList.js';

// Import GlyphWiki data
 import glyphwikiData from './glyph-wiki-kanji-list.js';

import kanjiDict from './kanjiDictTest.js';

// Prevent the splash screen from hiding until fonts have been loaded
SplashScreen.preventAutoHideAsync();


export default function App() {
  // Import My Kanji list 
  const myKanjiData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@my_kanji')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }
  // setup myKanji state
  const [myKanji, setMyKanji] = useState(myKanjiData == null ? undefined : myKanjiData);

  // Add custom fonts
  const [fontsLoaded] = useFonts({
    'NotoSansJP-Regular': require('./assets/fonts/NotoSansJP-Regular.otf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf')
  });

  // Load fonts asynchronously: https://docs.expo.dev/guides/using-custom-fonts/
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  


    // for (const [kanjiEntry, kanjiData] of Object.entries(kanjiDict)) {
    //   console.log(`${kanjiEntry}: ${kanjiData.id}, ${kanjiData.jlpt}`);
    // }


  // Kanji List Component
  const KanjiListComponent = function(props) {
    return(
      <ScrollView>
        <View style={styles.kanjiGrid}>
          {props.kanjiList.map((kanji)=>{
              return(
                <TouchableOpacity 
                  style={styles.kanjiCard}
                  key={kanji.kanji}
                  onPress={() => props.navigation.navigate("Kanji", {kanji})}
                >
                  <SvgXml xml={kanji.image} width="100%" height="100%" />
                </TouchableOpacity>
              )})
          }
        </View>
      </ScrollView>
    )
  }

  // Component to display a single kanji's data
  const Kanji = function(props) {
    

    return(
      <View style={styles.container}>

          {/* kanji meta */}
          <View style={styles.kanjiMeta}>
            {/* English name */}
            <Text style={styles.kanjiEnglishName}>Day, Sun</Text>

            <View style={styles.readings}>
              {/* On Yomi */}
              <View style={styles.onYomi}>
                <Text style={styles.readingHeading}>On Yomi</Text>
                <Text style={styles.japaneseReading}>ニチ, ジツ</Text>
              </View>
              
              {/* Kun Yomi */}
              <View style={styles.kunYomi}>
                <Text style={styles.readingHeading}>Kun Yomi</Text>
                <Text style={styles.japaneseReading}> ひ, -び, -か</Text>
              </View>
            </View>
          </View>

          {/* kanji canvas */}
          <View style={styles.kanjiCanvas}>
            <SvgXml xml={props.kanjiObj.image} />
          </View>
          

          <View style={styles.kanjiFooter}>
            {/* add to myKanji */}
            <TouchableOpacity
              style={styles.standardBtn}
              onPress={()=>{
                AddToMyKanji(props.kanjiObj.kanji);
                Alert.alert(`Added ${props.kanjiObj.kanji} to My Kanji`);
              }}
            >
              <Text style={styles.standardBtnText}>Add to My Kanji +</Text>
            </TouchableOpacity>
            
            {/* next kanji test */}
            <TouchableOpacity>
              <Text>Next kanji</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }

  const KanjiCanvas = function (props) {
    // setup the canvas
    const canvasRef = useRef(null);
    return(
      <View>
        {/* kanji canvas */}
        <View style={styles.kanjiCanvas}>
          <Canvas ref={canvasRef}  width={200} height={200}/>
        </View>

        {/* canvas control buttons */}
        <View>
          <TouchableOpacity>
            <Text>Write</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {canvasRef.current?.clear()}}>
            <Text>Erase</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


  const JLPTFilters = function (props) {
    return(
      <View style={styles.jlptBtnContainer}>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnActive]}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.jlptBtn}><Text style={{color: '#fff'}}>N5</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N4</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N3</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N2</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N1</Text></TouchableOpacity>
      </View>
    )
  }


  // Add to My Kanji
  function AddToMyKanji(kanji) {
    // Setup the new kanji object
    newKanji = {
      [kanji]: {
          added: true,
          progress: 0
        }
    }

    // Add the kanji to MyKanji list
    setMyKanji(myKanji => {
      return(
        myKanji == undefined ? newKanji : 
        {
          ...myKanji,
          newKanji
        }
      )
    })
    console.log(myKanji);
  }


  // Get Kanji fuction
  function GetKanjiMeta(kanji) {
    let kanjiMeta;

    // make api call
    fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      kanjiMeta = json;

      return kanjiMeta;
    });
    
  }




  // Dashboard page
  function DashboardPage({ navigation }) {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>

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

      </View>
      );
    };





  // Create the study navigation stack
  const StudyStack = createStackNavigator();

  // Study page
  function StudyTab({ navigation }) {
    return (
        <StudyStack.Navigator>
          <StudyStack.Screen name='Study' options={{ headerShown: false }} component={StudyDashboard}/>
          <StudyStack.Screen name='Kanji' component={StudyKanjiPage}/>
        </StudyStack.Navigator>
      );
    };

  // Study Dashboard
  function StudyDashboard({ navigation }) {
    return (
      <View style={styles.container}>
        {/* study CTA */}
        <View style={[styles.dashboardBox, styles.dashboardBoxPurple]}>
          <Text>
            Progress box
          </Text>
          <TouchableOpacity
            style={[styles.standardBtn,styles.halfWidthBtn]}
            onPress={() => navigation.navigate("Kanji")}
          >
            <Text style={styles.standardBtnText}>Study</Text>
          </TouchableOpacity>
        </View>

        {/* JLPT level select */}
        <JLPTFilters />

        {/* kanji grid */}
          <KanjiListComponent navigation={navigation} kanjiList={glyphwikiData}/>
      </View>
        
      );
    };

  // Kanji pactice page
  function StudyKanjiPage({ route, navigation }) {
    const [kanjiInfo, setKanjiInfo] = useState();

    const kanji = route.params.kanji;

    if (kanjiInfo === undefined){
      return (
          // <View>

          // </View>
          <Kanji kanjiObj={kanji} />
        );
    } else {
      return (
        <Kanji kanjiObj={kanji} />
      );
    }
    };





  // Create the review navigation stack
  const ReviewStack = createStackNavigator();

  // Review page navigation
  function ReviewTab({ navigation }) {
    return (
        <StudyStack.Navigator>
          <StudyStack.Screen name='Review' options={{ headerShown: false }} component={ReviewDashboard}/>
          <StudyStack.Screen name='Kanji' component={ReviewKanjiPage}/>
        </StudyStack.Navigator>
      );
    };

  // Review listing page
  function ReviewDashboard({ navigation }) {
    return (
      <View style={styles.container}>
        {/* <Text>You haven't learned any Kanji yet...</Text> */}
        <KanjiCanvas />
      </View>
      );
    };

  // Kanji review page
  function ReviewKanjiPage({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Time to review some kanji</Text>
      </View>
      );
    };








  // MyKanji stack
  const MyKanjiStack = createStackNavigator();

  function MyKanjiTab({ navigation }) {
    return (
        <MyKanjiStack.Navigator>
          <MyKanjiStack.Screen name='MyKanji Dashboard' options={{ headerShown: false }} component={MyKanjiDashboard}/>
          <MyKanjiStack.Screen name='Kanji' component={MyKanjiKanjiPage}/>
        </MyKanjiStack.Navigator>
      );
    };

  // MyKanji page
  function MyKanjiDashboard({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>You haven't added any Kanji yet...</Text>
        {/* <Text>{myKanji.map((kanji)=> {
          return kanji + ", ";
        })}</Text> */}
      </View>
      );
    };

  // MyKanji kanji page
  function MyKanjiKanjiPage({ navigation }) {
    return (
      <View style={styles.container}>
        
      </View>
      );
    };




  // Navigation Header
  function HeaderComponent() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* add the logo image */}
            <SvgCss xml={LogoImg} width="250" height="100"/>
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

  return (
    <NavigationContainer>
      <TabNav.Navigator screenOptions={({ route }) => ({
          headerShown: true,
          tabBarLabelStyle: styles.tabs,
          tabBarIcon: ({ color }) => {
            // add custom icons
            let icon;
            // set icon based on route name
            if(route.name === 'Dashboard') icon = <SvgXml xml={DashboardIcon} />;
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
        <TabNav.Screen name="Study Kanji" component={StudyTab} options={Header} />
        <TabNav.Screen name="Review Kanji" component={ReviewTab}options={Header} />
        <TabNav.Screen name="My Kanji" component={MyKanjiTab} options={Header} />
      </TabNav.Navigator>
    </NavigationContainer>
  );
}


