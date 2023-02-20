import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgUri } from 'react-native-svg';
import { useState } from 'react';

import LogoImg from './assets/images/kanji-buddy-logo.svg';

// Setup Kanji States
const kanjiList = ["一","国","時","二","人","年"];

// Kanji List Component
function KanjiListComponent(){
  for(var i = 0; i < kanjiList.length; i++){
    // 
  }
}

// Dashboard page
function DashboardPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the dashboard</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Study Kanji")}>
        <Text>Study</Text>
      </TouchableOpacity>
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
        <StudyStack.Screen name='Kanji' component={KanjiPage}/>
      </StudyStack.Navigator>
    );
  };

// Study home page
function StudyHomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the Study page</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Kanji")}>
          <Text>Kanji</Text>
        </TouchableOpacity>
      </View>
    );
  };

// Kanji page
function KanjiPage({ navigation }) {
  const [kanjiInfo, setKanjiInfo] = useState();

  // Get the kanji details
  const makeCall = function() {
    // make api call
    fetch('https://kanjiapi.dev/v1/kanji/時')
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
          <Text>Get Kanji</Text>
        </TouchableOpacity>
      </View>
      );
  } else {
    return (
      <View style={styles.container}>
        <Text>{kanjiInfo.kanji}</Text>
      </View>
    );
  }
  
  };



// Review page
function ReviewPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the Review page</Text>
    </View>
    );
  };

// MyKanji page
function MyKanjiPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is MyKanji page</Text>
    </View>
    );
  };

// Navigation Header
function HeaderLogo() {
  
  return (
    <LogoImg
      width={250}
      height={100}
    />
  );
}

// Create the tab navigator
const TabNav = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TabNav.Navigator screenOptions={{ headerShown: true }}>
        <TabNav.Screen name="Dashboard" component={DashboardPage} options={{ headerTitle: (props) => <HeaderLogo {...props} /> }} />
        <TabNav.Screen name="Study Kanji" component={StudyPage} />
        <TabNav.Screen name="Review Kanji" component={ReviewPage} />
        <TabNav.Screen name="My Kanji" component={MyKanjiPage} />
      </TabNav.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
