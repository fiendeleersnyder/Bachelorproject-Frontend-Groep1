import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';
import Inlogscreen from './app/screens/Inlogscreen';
import Homescreen from './app/screens/Homescreen';
import Indienenscreen from './app/screens/Indienenscreen';
import Onderwerpenscreen from './app/screens/Onderwerpenscreen';
import AddOnderwerpscreen from './app/screens/AddOnderwerpscreen';
import Login from './app/components/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

export default function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function Uitloggen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>uitlogknop werkt joepie!
        nu nog effectief uitloggen</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

    return (
      //<Login />
      <NavigationContainer>
      <Tab.Navigator 
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home-sharp'
                  : 'home-outline';
              } else if (route.name === 'Subjects') {
                iconName = focused ? 'albums' : 'albums-outline';
              } else if (route.name === 'Submit') {
                iconName = focused ? 'arrow-redo-circle' : 'arrow-redo-circle-outline';
              } else if (route.name === 'Logout') {
                iconName = focused ? 'exit' : 'exit-outline';
              } else if (route.name === 'Add Subject') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              }
              
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#52BDEC',
            tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Subjects" component={Onderwerpenscreen} />
        <Tab.Screen name="Add Subject" component={AddOnderwerpscreen} />
        <Tab.Screen name="Submit" component={Indienenscreen} />
        <Tab.Screen name="Logout" component={Uitloggen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

