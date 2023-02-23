import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { SvgUri } from 'react-native-svg';
import { useState, useRef } from 'react';
// import { Canvas, CanvasRef } from '@benjeau/react-native-draw';

import LogoImg from './assets/images/kanji-buddy-logo.svg';
import DashboardIcon from './assets/images/dashboard-icon.svg';
import StudyIcon from './assets/images/study-icon.svg';
import ReviewIcon from './assets/images/review-icon.svg';
import MyKanjiIcon from './assets/images/my-kanji-icon.svg';


// Setup Kanji States
const kanjiList = ["一","国","時","二","人","年"];

// Kanji List Component
function KanjiListComponent(){
  return(
    <View style={styles.kanjiGid}>
      {kanjiList.map((kanji)=>{
          return(
            <View style={styles.kanjiCard}>
              <Text>
                {kanji}
              </Text>
            </View>
          )})
      }
    </View>
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
      <View>

      </View>

      {/* JLPT level select */}
      <View style={styles.jlptBtnContainer}>
        <TouchableOpacity style={[styles.jlptBtn, styles.jlptBtnActive]}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.jlptBtn}><Text>N5</Text></TouchableOpacity>
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

        <KanjiListComponent />
      </View>
      
    );
  };

// Kanji page
function KanjiPracticePage({ navigation }) {
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

// Create the review navigation stack
const ReviewStack = createStackNavigator();

function ReviewPage({ navigation }) {
  return (
      <StudyStack.Navigator>
        <StudyStack.Screen name='Review' options={{ headerShown: false }} component={ReviewHomePage}/>
        <StudyStack.Screen name='Kanji' component={KanjiReviewPage}/>
      </StudyStack.Navigator>
    );
  };

// Review page
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

const Header  = {
  headerTitle: (props) => <HeaderLogo {...props} />,
  headerRight: () => (
  <Button
    onPress={() => alert('This is a button!')}
    title="button"
    color="#000"
  />)
};

// tabIcons = {
//   tabBarIcon: ({ color, size }) => {
//     let icon;

//     if(route.name === 'Dashboard') icon = {DashboardIcon};
    
//     return <icon name={iconName} size={size} color={color} />;
//   },
//   tabBarActiveTintColor: 'tomato',
//   tabBarInactiveTintColor: 'gray',
// }

export default function App() {
  // Add custom fonts
  const [fontsLoaded] = useFonts({
    'NotoSans': require('./assets/fonts/NotoSansJP-Regular.otf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Quicksand': require('./assets/fonts/Quicksand-Medium.ttf'),
    'Inter': require('./assets/fonts/Inter-Bold.ttf')
  });

  return (
    <NavigationContainer>
    <TabNav.Navigator screenOptions={({ route }) => ({
          headerShown: true,
          tabBarLabelStyle: styles.tabs,
          tabBarIcon: ({ color }) => {
            // add custom icons
            let icon;
            // set icon based on route name
            if(route.name === 'Dashboard') icon = <DashboardIcon color={color} />;
            if(route.name === 'Study Kanji') icon = <StudyIcon color={color} />;
            if(route.name === 'Review Kanji') icon = <ReviewIcon color={color} />;
            if(route.name === 'My Kanji') icon = <MyKanjiIcon color={color} />;

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
    fontFamily: 'Quicksand',
    textAlign: 'center',
    fontSize: 24
  },
  bodyText: {
    fontFamily: 'Roboto'
  },
  standardBtn: {
    backgroundColor: '#4059AD',
    width: 200,
    borderRadius: 12
  },
  standardBtnText: {
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF'
  },
  jlptBtnContainer: {
    flexDirection: 'row'
  },
  jlptBtn: {
    flex: 1,
    backgroundColor: '#4059AD',
    borderRadius: 8
  },
  jlptBtnActive: {
    backgroundColor: '#D2D6EF',
  },
  jlptBtnDisabled:  {
    opacity: 0.3
  },
  kanjiGid:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  kanjiCard:{
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2
    },
    width: '24%',
    height: 200
  }

});
