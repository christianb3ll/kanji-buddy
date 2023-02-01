import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Dashboard page
function DashboardPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the dashboard</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Study")}>
          <Text>Study</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Review")}>
          <Text>Review</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("My Kanji")}>
          <Text>My Kanji</Text>
      </TouchableOpacity>
    </View>
    );
  };

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

// Create the navigation stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" options={{headerShown: false}} component={DashboardPage} />
        <Stack.Screen name="Study" options={{headerShown: false}} component={StudyPage} />
        <Stack.Screen name="Review" options={{headerShown: false}} component={ReviewPage} />
        <Stack.Screen name="My Kanji" options={{headerShown: false}} component={MyKanjiPage} />
      </Stack.Navigator>
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
