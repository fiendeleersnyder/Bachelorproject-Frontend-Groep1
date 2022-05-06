import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    Alert,
  } from 'react-native';
  import React, {useContext, useState} from 'react';
  import {AuthContext} from '../AuthContext/AuthContext';
  import * as Keychain from 'react-native-keychain';
  import {AxiosContext} from '../AuthContext/AxiosContext';
  import qs from 'qs';
  import axios from 'axios';
  
  export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const publicAxios = useContext(AxiosContext);
  
    const onLogin = async () => {
      if (!email.trim() || !password.trim()) {
        alert("Name or Email is invalid");
        return;
      }
      try {
        const response = await axios.post('http://localhost:8080/login', 
        qs.stringify({ username:email, password:password })
          ,{
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
        });
        
        const {accessToken} = response?.data;
        authContext.setAuthState({
          accessToken,
          //refreshToken,
          authenticated: true,
        });
  
        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken,
            //refreshToken,
          }),
        );
      } catch (error) {
        if (error.response) {
            // There is an error response from the server
            // You can anticipate error.response.data here
            const error = err.response.data;
            dispatch(addError(error.message));
        } else if (error.request) {
            // The request was made but no response was received
            // Error details are stored in error.reqeust
            console.log(error.request);
        } else {
            // Some other errors
            console.log('Error', error.message);
        }
    }
    };
  
    return (
      <View style={styles.container}>
        <Image source = {require("../../assets/logo_kuleuven.png")}/>
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
        marginBottom: 40, 
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

    logo: {
      fontSize: 60,
      color: '#fff',
      margin: '20%',
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
    button: {},
    loginBtn:{
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#00407A",
        },
        
    loginText: {
        color: "#fff"
    }
  });
  
  export default Login;
  