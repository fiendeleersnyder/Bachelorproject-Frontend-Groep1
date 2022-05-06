import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';
import Inlogscreen from './app/screens/Inlogscreen';
import Homescreen from './app/screens/Homescreen';
import Indienenscreen from './app/screens/Indienenscreen';
import Onderwerpenscreen from './app/screens/Onderwerpenscreen';
import Login from './app/components/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const Tab = createBottomTabNavigator();

    return (
      //<Login />
      <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Subjects" component={Onderwerpenscreen} />
        <Tab.Screen name="Submit" component={Indienenscreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

