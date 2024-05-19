import 'react-native-gesture-handler'; // Import this line at the top of your entry file
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from './components/home';
import Authentication from './components/Auth';
import LandingPage from './components/landing';
import SearchPage from './components/search';

const Stack = createStackNavigator();


 
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} // Hide the header for this screen
        />
        <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown:false}} />
        <Stack.Screen name='Authentication' component={Authentication} options={{ headerShown: false }} />
        <Stack.Screen name='Search' component={SearchPage} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
