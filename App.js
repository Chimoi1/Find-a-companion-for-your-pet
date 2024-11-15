// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import FeatureScreen from './Screens/FeatureScreen';
import UserTypeScreen from './Screens/UserTypeScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignUpScreen2 from './Screens/SignUpScreen2';
import SignUpScreen3 from './Screens/SignUpScreen3';
import SignUpScreen4 from './Screens/SignUpScreen4';
import HomeScreen from './Screens/HomeScreen';
import CalendarScreen from './Screens/CalendarScreen';
import CalendarScreen2 from './Screens/CalendarScreen2';
import ProfileScreen from './Screens/ProfileScreen';
import ChatScreen from './Screens/ChatScreen';
import AccountScreen from './Screens/AccountScreen';
import NotificationScreen from './Screens/NotificationScreen';
import AddProfileScreen from './Screens/AddProfileScreen';
import AddProfileDogScreen from './Screens/AddProfileDogScreen';
import AddProfileCatScreen from './Screens/AddProfileCatScreen';
import AddProfileNameScreen from './Screens/AddProfileNameScreen';
import AddProfileStatusScreen from './Screens/AddProfileStatusScreen';
import AddProfileSizeScreen from './Screens/AddProfileSizeScreen';
import AddCharacteristicScreen from './Screens/AddCharacteristicScreen';
import AddPIDateScreen from './Screens/AddPIDateScreen';
import AddPCaretakersScreen from './Screens/AddPCaretakersScreen';
import AddPPetScreen from './Screens/AddPPetScreen';
import ProfileAbout from './Screens/ProfileAbout';
import ProfileAbout2 from './Screens/ProfileAbout2';
import ProfileAboutPet1 from './Screens/ProfileAboutPet1';
import ProfileAboutPet2 from './Screens/ProfileAboutPet2';
import ClinicScreen from './Screens/ClinicScreen';
import VeterinarianScreen from './Screens/VeterinarianScreen';
import CalendarBookScreen from './Screens/CalendarBookScreen';
import CallScreen from './Screens/CallScreen';
import CallScreen2 from './Screens/CallScreen2';
import ChatScreen2 from './Screens/ChatScreen2';
import ChatScreen3 from './Screens/ChatScreen3';
import ConfirmScreen from './Screens/ConfirmScreen';
import BookingSuccessScreen from './Screens/BookingSuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screens">
        
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="FeatureScreen" 
          component={FeatureScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="UserTypeScreen" 
          component={UserTypeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="SignUpScreen2" 
          component={SignUpScreen2} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="SignUpScreen3" 
          component={SignUpScreen3} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="SignUpScreen4" 
          component={SignUpScreen4} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="CalendarScreen" // Thêm màn hình CalendarScreen vào Stack Navigator
          component={CalendarScreen} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="CalendarScreen2" // Thêm màn hình CalendarScreen vào Stack Navigator
          component={CalendarScreen2} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="ProfileScreen" // Thêm màn hình ProfileScreen vào Stack Navigator
          component={ProfileScreen} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="ChatScreen" // Thêm màn hình ChatScreen vào Stack Navigator
          component={ChatScreen} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="AccountScreen" // Thêm màn hình AccountScreen vào Stack Navigator
          component={AccountScreen} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="NotificationScreen"
          component={NotificationScreen} 
          options={{ headerShown: false, animationEnabled: false }} 
        />
        <Stack.Screen 
          name="AddProfileScreen" 
          component={AddProfileScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddProfileDogScreen"
          component={AddProfileDogScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddProfileCatScreen" 
          component={AddProfileCatScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddProfileNameScreen" 
          component={AddProfileNameScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddProfileStatusScreen" 
          component={AddProfileStatusScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddProfileSizeScreen" 
          component={AddProfileSizeScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddCharacteristicScreen" 
          component={AddCharacteristicScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddPIDateScreen" 
          component={AddPIDateScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddPCaretakersScreen" 
          component={AddPCaretakersScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="AddPPetScreen" 
          component={AddPPetScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ProfileAbout" 
          component={ProfileAbout} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ProfileAbout2" 
          component={ProfileAbout2} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ProfileAboutPet1" 
          component={ProfileAboutPet1} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ProfileAboutPet2" 
          component={ProfileAboutPet2} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ClinicScreen" 
          component={ClinicScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="VeterinarianScreen" 
          component={VeterinarianScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="CalendarBookScreen" 
          component={CalendarBookScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="CallScreen" 
          component={CallScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="CallScreen2" 
          component={CallScreen2} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ChatScreen2" 
          component={ChatScreen2} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ChatScreen3" 
          component={ChatScreen3} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="ConfirmScreen" 
          component={ConfirmScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen 
          name="BookingSuccessScreen" 
          component={BookingSuccessScreen} 
          options={{ headerShown: false, animationEnabled: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
