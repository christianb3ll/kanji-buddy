import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Dashboard page
function DashboardPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the dashboard</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Study")}>
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
    <View style={styles.container}>
      <Text>This is the Study page</Text>
    </View>
    );
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

// Create the tab navigator
const TabNav = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TabNav.Navigator screenOptions={{ headerShown: false }}>
        <TabNav.Screen name="Dashboard" component={DashboardPage} />
        <TabNav.Screen name="Study" component={StudyPage} />
        <TabNav.Screen name="Review" component={ReviewPage} />
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
