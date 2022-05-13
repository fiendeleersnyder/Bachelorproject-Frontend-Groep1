import {View,Text,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,Image,Button,Alert,} from 'react-native';
  import React, {useState} from 'react';
  import * as Keychain from 'react-native-keychain';
  import qs from 'qs';
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
      if (!email.trim() || !password.trim()) {
        alert("Name or Email is invalid");
        return;
      }
      try {
        const response = await axios.post('http://192.168.0.172:8080/login', 
        qs.stringify({ username:email, password:password })
          ,{
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
        });
        console.log(response.data);
        const accessToken = response.data.acces_token;
        console.log(accessToken);
        await AsyncStorage.setItem(
          'accesToken',
          accessToken
        );
        console.log(await AsyncStorage.getItem('accesToken'));
        //setAuth(accessToken);
        //setUser('');
        //setPwd('');
        // authContext.setAuthState({
        //   accessToken,
        //   //refreshToken,
        //   authenticated: true,
        // });
  
        // await Keychain.setGenericPassword(
        //   'token',
        //   JSON.stringify({
        //     accessToken,
        //     //refreshToken,
        //   }),
        // );
      } catch (err) {
        if (err.response) {
            // There is an error response from the server
            // You can anticipate error.response.data here
            const error = err.response.data;
            console.log(error);
            //dispatch(addError(error.message));
        } else if (err.request) {
            // The request was made but no response was received
            // Error details are stored in error.reqeust
            console.log(err.request);
        } else {
            // Some other errors
            console.log('Error', err.message);
        }
    }
    };
  
    return (
      <View style={styles.container}>
        <Image source = {require("../../assets/logo_kuleuven.png")} style={styles.image}/>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="E-mail"
            placeholderTextColor="#003f5c"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => onLogin()}>
             <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        {/* <Button title="Login"  style={styles.loginBtn.loginText} onPress={() => onLogin()} /> */}
        {/* <View>
          <Text>
          {"\n"}
          {"\n"}
          {"\n"}
          </Text>
      </View> */}
      </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image :{
        marginTop: -70,
        marginBottom: -50, 
        alignItems: "center"
    },
    inputView: {
        backgroundColor: "#52BDEC",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
    form: {
      width: '80%',
      margin: '10%',
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
    input: {
      fontSize: 20,
      color: '#fff',
      paddingBottom: 10,
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
      marginVertical: 20,
    },
    loginBtn:{
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        backgroundColor:"#00407A",
        },
        
    loginText: {
        color: "#fff"
    }
  });
  
  export default Login;
  