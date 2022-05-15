import React from "react";
import {Text, View,} from 'react-native';
import Homescreen from './app/screens/Homescreen';
import Indienenscreen from './app/screens/Indienenscreen';
import Onderwerpenscreen from './app/screens/Onderwerpenscreen';
import Onderwerpendetailscreen from './app/screens/Onderwerpendetailscreen';
import AddOnderwerpscreen from './app/screens/AddOnderwerpscreen';
import Login from './app/components/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App({route ,navigation}) {
  const Stack = createNativeStackNavigator();

  function Root() {
    return(
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
  <Tab.Screen name="Subject Details" component={Onderwerpendetailscreen} options={{tabBarButton: (props) => null}}></Tab.Screen>
</Tab.Navigator>);
  }

  function Uitloggen({route ,navigation}){
    AsyncStorage.removeItem('accesToken');
    navigation.navigate('Login')
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>uitlogknop werkt joepie!
        nu nog effectief uitloggen</Text>
      </View>
    );
  }

  async function getAccestoken() {
    accessToken = await AsyncStorage.getItem('accesToken');
  }

  const Tab = createBottomTabNavigator();
  var accessToken = null;
  getAccestoken();
  console.log(accessToken)

    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}


