import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import * as SplashScreen from 'expo-splash-screen';
import * as Haptics from 'expo-haptics';
import { Font } from 'expo';
import { useFonts } from 'expo-font';
import { Svg, SvgXml, SvgCss, Path } from 'react-native-svg';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Canvas, CanvasRef, CanvasControls } from '@benjeau/react-native-draw';
import styles from './Styles.js'

import LogoImg from './assets/images/kanji-buddy-logo.svg';
import DashboardIcon from './assets/images/dashboard-icon.svg';
import StudyIcon from './assets/images/study-icon.svg';
import SettingsIcon from './assets/images/settings-icon.svg';
import MyKanjiIcon from './assets/images/my-kanji-icon.svg';
import EraserIcon from './assets/images/eraser-icon.svg';
import WriteIcon from './assets/images/write-icon.svg';


import kanjiDict from './kanjiDictTest.js';

// Prevent the splash screen from hiding until fonts have been loaded
SplashScreen.preventAutoHideAsync();

const canvasWidth = Dimensions.get('window').width -100;

export default function App() {
  const [myKanji, setMyKanji] = useState(undefined);
  const [kanjiInfo, setKanjiInfo] = useState(undefined);
  const [myKanjiInfo, setMyKanjiInfo] = useState(undefined);

  // Import My Kanji list 
  const loadKanjiData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@my_kanji')
      return jsonValue != null ? setMyKanji(JSON.parse(jsonValue)) : null;
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  const saveKanjiData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@my_kanji', jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  // setup myKanji state
  useEffect(() => {
    loadKanjiData();
  }, [])

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

  // Kanji List Component
  const KanjiListComponent = function(props) {
    return(
      <ScrollView>
        <View style={styles.kanjiGrid}>
          {props.kanjiList.map((kanji)=>{
              return(
                <TouchableOpacity 
                  style={[styles.kanjiCard, inMyKanji(kanji) ? '' : styles.kanjiCardInactive]}
                  key={kanji}
                  onPress={() => {
                    getKanjiMeta(kanji, props.state);
                    props.navigation.navigate("Kanji", {kanji});
                    }
                  }
                >
                  <SvgXml xml={getKanjiImage(kanji)} width="100%" height="100%" />
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
            <Text style={styles.kanjiEnglishName}>{props.kanjiObj.heisig_en}</Text>

            <View style={styles.readings}>
              {/* On Yomi */}
              <View style={styles.onYomi}>
                <Text style={styles.readingHeading}>On Yomi</Text>
                <Text style={styles.japaneseReading}>{props.kanjiObj.on_readings.toString()}</Text>
              </View>
              
              {/* Kun Yomi */}
              <View style={styles.kunYomi}>
                <Text style={styles.readingHeading}>Kun Yomi</Text>
                <Text style={styles.japaneseReading}>{props.kanjiObj.kun_readings.toString()}</Text>
              </View>
            </View>
          </View>

          {/* kanji canvas */}
          <View style={[styles.kanjiCanvas, {width:canvasWidth}, {height:canvasWidth}]}>
            <SvgXml xml={getKanjiImage(props.kanjiObj.kanji)} />
          </View>

          <TouchableOpacity style={styles.canvasBtn} onPress={()=> props.navigation.navigate('Practice')}>
            <SvgXml xml={WriteIcon}/>
          </TouchableOpacity>
          

          <View style={styles.kanjiFooter}>
            {/* add to myKanji */}
            { props.route == 'study' ?
              inMyKanji(props.kanjiObj.kanji) ? <Text>In My Kanji</Text> :
                <TouchableOpacity
                  style={styles.standardBtn}
                  onPress={()=>{
                    addToMyKanji(props.kanjiObj.kanji);
                    Alert.alert(`Added ${props.kanjiObj.kanji} to My Kanji`);
                  }}>
                  <Text style={styles.standardBtnText}>Add to My Kanji +</Text>
                </TouchableOpacity> : ''
            }
          </View>
        </View>
    )
    
  }

  const JLPTFilters = function (props) {
    return(
      <View style={styles.jlptBtnContainer}>
        <TouchableOpacity style={styles.jlptBtn} onPress={()=> props.func(props.list)}><Text style={styles.jlptBtnText}>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.jlptBtn} onPress={() => props.func(filterByJLPT(props.list, 'N5'))}><Text style={styles.jlptBtnText}>N5</Text></TouchableOpacity>
        <TouchableOpacity style={styles.jlptBtn} onPress={() => props.func(filterByJLPT(props.list, 'N4'))}><Text style={styles.jlptBtnText}>N4</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N3</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N2</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnDisabled]}><Text>N1</Text></TouchableOpacity>
      </View>
    )
  }

  const ProgressBar = function(props){
    let fill = (props.value / props.total) *100;

    return(
      <View style={styles.progressBar}>
        <View style={[styles.progressBarFill, {width:`${fill}%`}]} />
        <Text style={styles.progressBarText}>Progress</Text>
      </View>
    )
  }


  // Add to My Kanji
  function addToMyKanji(kanji) {
    let kanjiToAdd;

    if(myKanji == undefined){
      kanjiToAdd = {
        [kanji]: {
          added: true,
          progress: 0
        }
      }
    } else {
      kanjiToAdd = {
        ...myKanji,
        [kanji]: {
          added: true,
          progress: 0
        }
      }
    }

    // Add the kanji to MyKanji list
    setMyKanji(myKanji => {
      return(kanjiToAdd)
    })

    // save the kanji list
    saveKanjiData(kanjiToAdd);

    // Success haptic feedback
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
  }

  // erase all user kanji data
  function eraseMyKanji(){
    Alert.alert('Erase My Kanji?', 'Are you sure you want to erase all MyKanji data? This cannot be undone.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Erase', onPress: () => {
        AsyncStorage.clear();
        setMyKanji(undefined);
      }},
    ]);
  }


  // Get Kanji fuction
  function getKanjiMeta(kanji, state) {
    console.log(kanji);
    let kanjiMeta;
    state(undefined);

    // make api call
    fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      kanjiMeta = json;
      state(kanjiMeta);
      return kanjiMeta;
    });
    
  }

  // returns the full kanji list sorted by ID
  function getFullKanjiList() {
    let kanjiArray;

    kanjiArray = Object.keys(kanjiDict).sort((a, b) => {
      return kanjiDict[a].id - kanjiDict[b].id;
    })
    return kanjiArray;
  }

  // returns the lowest ranked kanji not yet in the study list
  function getNextUnstudiedKanji(list){
    let nextKanji;

    for(var i = 0; i < list.length; i++){
      if(!inMyKanji(list[i])){
        nextKanji = list[i];
        break;
      }
    }
    return nextKanji;
  }

  // returns a filtered list based on given JLPT level
  function filterByJLPT(list, level){
    let newList = [];

    for(var i = 0; i < list.length; i++){
      if(kanjiDict[list[i]].jlpt == level){
        newList.push(list[i]);
      }
    }
    return newList;
  }

  // returns JLPT level progress
  function getJLPTProgress(level){
    let progress = 0;
    let list =  filterByJLPT(getFullKanjiList(), level);

    for(var i = 0; i < list.length; i++){
      if(inMyKanji(list[i])) progress ++; 
    }
    return progress;
  }

  function getMyKanji() {
    if (myKanji == undefined) return [];
    let kanjiArray;

    kanjiArray = Object.keys(myKanji);
    console.log(kanjiArray);
    return kanjiArray;
  }

  function inMyKanji(kanji) {
    if(myKanji == undefined) return false;
    return kanji in myKanji;
  }

  function getKanjiImage(kanji) {
    let image = kanjiDict[kanji].image;
    return image;
  }

  // Dashboard page
  function DashboardPage({ navigation }) {

    if(myKanji == undefined){
      return (
        <View style={styles.container} onLayout={onLayoutRootView}>
          <View style={styles.dashboardBox}>
            <Text style={styles.sectionHeading}>Study</Text>
            <Text style={styles.bodyText}>It looks like you're new here!</Text>
            <TouchableOpacity style={styles.standardBtn} onPress={() => navigation.navigate("Study Kanji")}>
              <Text style={styles.standardBtnText}>Start Learning</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
      } else {
        return(
          <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.dashboardBox}>
              <Text style={styles.sectionHeading}>Your Progress</Text>
              <View style={styles.progressSection}>
                <View style={styles.progressBlock}>
                  <Text style={styles.progressLabel}>N5</Text>
                  <ProgressBar value={getJLPTProgress('N5')} total={79}/>
                </View>
                
                <View style={styles.progressBlock}>
                  <Text style={styles.progressLabel}>N4</Text>
                  <ProgressBar value={getJLPTProgress('N4')} total={165}/>
                </View>
              </View>

              <TouchableOpacity style={styles.standardBtn} onPress={() => navigation.navigate("Study Kanji")}>
                <Text style={styles.standardBtnText}>Keep Learning</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        )
      };
    };





  // Create the study navigation stack
  const StudyStack = createStackNavigator();

  // Study page
  function StudyTab({ navigation }) {
    return (
        <StudyStack.Navigator initialRouteName={'Study'}>
          <StudyStack.Screen name='Study' options={{ headerShown: false }} component={StudyDashboard}/>
          <StudyStack.Screen name='Kanji' component={StudyKanjiPage}/>
          <StudyStack.Screen name='Practice' component={PracticePage}/>
        </StudyStack.Navigator>
      );
    };

  // Study Dashboard
  function StudyDashboard({ navigation }) {
    const [studyList, setStudyList] = useState(getFullKanjiList());
    const [filteredStudyList, setFilteredStudyList] = useState(getFullKanjiList());

    return (
      <View style={styles.container}>
        {/* study CTA */}
        <View style={[styles.dashboardBox, styles.dashboardBoxPurple]}>
          <Text>
            {myKanji == undefined  ? 'Start your learning journey!' : 'Study your next Kanji!' }
          </Text>
          <TouchableOpacity
            style={[styles.standardBtn,styles.halfWidthBtn]}
            onPress={() => {
              let nextKanji = getNextUnstudiedKanji(studyList);
              getKanjiMeta(nextKanji, setKanjiInfo);
              navigation.navigate("Kanji", {kanji:nextKanji})
              }
            }
          >
            <Text style={styles.standardBtnText}>Study</Text>
          </TouchableOpacity>
        </View>

        {/* JLPT level select */}
        <JLPTFilters list={studyList} func={setFilteredStudyList}/>

        {/* kanji grid */}
        <KanjiListComponent navigation={navigation} kanjiList={filteredStudyList} state={setKanjiInfo}/>
      </View>
        
      );
    };

  // Kanji Details page
  function StudyKanjiPage({ route, navigation }) {
    if (kanjiInfo == undefined){
      return (
          <View style={styles.container}>
            <Text>Getting Kanji data...</Text>
          </View>
        );
    } else {
      return (
        <Kanji navigation={navigation}  kanjiObj={kanjiInfo} route="study"/>
      );
    }
    };


  // Kanji Practice page
  function PracticePage({ navigation }){
    const canvasRef = useRef(null);

    return(
      <View style={styles.container}>
        <View style={styles.kanjiCanvas}>
          <Canvas ref={canvasRef}  width={canvasWidth} height={canvasWidth}/>
        </View>
        <TouchableOpacity style={styles.canvasBtn} onPress={()=> {canvasRef.current?.clear()}}>
          <SvgXml xml={EraserIcon} />
        </TouchableOpacity>
      </View>
      
    )
  }



  // Create the Settings navigation stack
  const SettingsStack = createStackNavigator();

  // Settings Navigation
  function SettingsTab({ navigation }) {
    return (
        <SettingsStack.Navigator>
          <SettingsStack.Screen name='Settings Dashboard' options={{ headerShown: false }} component={SettingsDashboard}/>
          <SettingsStack.Screen name='About' component={AboutPage}/>
        </SettingsStack.Navigator>
      );
    };

  // Main Settings page
  function SettingsDashboard({ navigation }) {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.settingsContainer}>

          <TableView>
            <Section footer="© Christian Bell 2023">
              <Cell
                title="About"
                titleTextColor="#007AFF"
                onPress={()=> navigation.navigate('About')}
              />
              <Cell
                title="Erase My Kanji Data"
                titleTextColor="#FF0000"
                onPress={() => eraseMyKanji()}
              />
            </Section>
          </TableView>
        </ScrollView>
      </View>
      );
    };

  // About page
  function AboutPage({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>About Kanji</Text>
        <Text>About JLPT</Text>
        <Text> JLPT definitions provided by tanos.co.uk</Text>
        <Text>Kanji image data from glyphwiki.org</Text>
        <Text>Kanji data from kanjiapi.dev</Text>
      </View>
      );
    };




  // MyKanji stack
  const MyKanjiStack = createStackNavigator();

  function MyKanjiTab({ navigation }) {
    return (
        <MyKanjiStack.Navigator initialRouteName={'MyKanji Dashboard'}>
          <MyKanjiStack.Screen name='MyKanji Dashboard' options={{ headerShown: false }} component={MyKanjiDashboard}/>
          <MyKanjiStack.Screen name='Kanji' component={MyKanjiKanjiPage}/>
          <MyKanjiStack.Screen name='Practice' component={PracticePage}/>
        </MyKanjiStack.Navigator>
      );
    };

  // MyKanji page
  function MyKanjiDashboard({ navigation }) {
    if(myKanji == undefined){
      return(
        <View style={styles.container}>
          <Text>You haven't added any Kanji yet...</Text>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <KanjiListComponent navigation={navigation} kanjiList={getMyKanji()} state={setMyKanjiInfo}/>
        </View>
      )
    }
    };

  // MyKanji kanji page
  function MyKanjiKanjiPage({ route, navigation }) {
    if (myKanjiInfo == undefined){
      return (
          <View style={styles.container}>
            <Text>Getting Kanji data...</Text>
          </View>
        );
    } else {
      return (
        <Kanji navigation={navigation}  kanjiObj={myKanjiInfo} route="myKanji"/>
      );
    }
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
            if(route.name === 'My Kanji') icon = <SvgXml xml={MyKanjiIcon} />;
            if(route.name === 'Settings') icon = <SvgXml xml={SettingsIcon}  />;

            return icon;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <TabNav.Screen name="Dashboard" component={DashboardPage} options={Header} />
        <TabNav.Screen name="Study Kanji" component={StudyTab} options={Header} />
        <TabNav.Screen name="My Kanji" component={MyKanjiTab} options={Header} />
        <TabNav.Screen name="Settings" component={SettingsTab} options={Header} />
      </TabNav.Navigator>
    </NavigationContainer>
  );
}


