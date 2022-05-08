import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Irmage, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';

function AddOnderwerpscreen() {
   return (
    <View style={styles.view}>
         <TextInput 
          placeholder="Email" />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
        />
        <Picker
          selectedValue={currency}
          onValueChange={currentCurrency => setCurrency(currentCurrency)}>
          <Picker.Item label="USD" value="US Dollars" />
          <Picker.Item label="EUR" value="Euro" />
          <Picker.Item label="NGN" value="Naira" />
        </Picker>
        <Text>
          Selected: {currency}
        </Text>
    </View>
   );
 }
 
 const styles = StyleSheet.create({
     view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
     },
     text: {
        fontSize:16,
        fontWeight:'700'
     }
 })

 export default AddOnderwerpscreen;