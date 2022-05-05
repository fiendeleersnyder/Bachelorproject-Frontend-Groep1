import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';
import Inlogscreen from './app/screens/Inlogscreen';
import Login from './app/components/Login/Login'

export default function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    return (
      <Login />
  );
}

