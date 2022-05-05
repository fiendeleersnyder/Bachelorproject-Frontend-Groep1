import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from "react-native";
import {Login} from "../components/Login/Login"

function Inlogscreen(props) {
    return (
        // <View style={styles.container}>
        //     <Image source = {require("../assets/logo_kuleuven.png")}/>
      
        //     <View style={styles.inputView}>
        //         <TextInput
        //         style={styles.TextInput}
        //         placeholder="E-mail"
        //         placeholderTextColor="#003f5c"
        //         //onChangeText={(email) => setEmail(email)}
        //         />
        //     </View>
        
        //     <View style={styles.inputView}>
        //         <TextInput
        //             style={styles.TextInput}
        //             placeholder="Password"
        //             placeholderTextColor="#003f5c"
        //             secureTextEntry={true}
        //             // onChangeText={(password) => setPassword(password)}
        //         />
        //     </View>

        //     <TouchableOpacity style={styles.loginBtn}>
        //         <Text style={styles.loginText}>LOGIN</Text>
        //         {/* hier: onPress={{}} instoppen om logingegevens door te geven */}
        //     </TouchableOpacity>
        // </View>
            <Login />
    );
}

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
          
          TextInput: {
            height: 50,
            flex: 1,
            padding: 10,
            marginLeft: 20,
          },

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
})

export default Inlogscreen;