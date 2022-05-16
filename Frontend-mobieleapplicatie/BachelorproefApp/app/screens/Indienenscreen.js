import { StyleSheet, Text,  Button,  View, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Indienenscreen() {
   const voorkeur1InputRef = useRef();
   const voorkeur2InputRef = useRef();
   const voorkeur3InputRef = useRef();

   const [onderwerpen, setOnderwerpen] = useState();
   var array = [];
   var array2 = [];
   const [ingediend, setIngediend] = useState([]);
   const [veranderd, setVeranderd] = useState();

   useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const getOnderwerpen = async () => {
         const accessToken = await AsyncStorage.getItem('accesToken');
          try {
              const response = await axios.get("https://Bachelorproef-backend.herokuapp.com/auth/favorieten", {
               withCredentials: true,
               headers: {
                 'Authorization' : "Bearer " + accessToken
               }
              });
              console.log(response.data);
              isMounted && setOnderwerpen(response.data);
          } catch (err) {
              console.error(err);
          }

          try {
            const response = await axios.get("https://Bachelorproef-backend.herokuapp.com/auth/selection", {
               withCredentials: true,
               headers: {
                 'Authorization' : "Bearer " + accessToken
               }
              });
              console.log(response.data);
              array = response.data;
              setIngediend(array);
              setVeranderd(false);
          }catch (err) {
              console.error(err);
          }
      }

      getOnderwerpen();

      return () => {
          isMounted = false;
          controller.abort();
      }
  }, [veranderd])

  const submitHandler = () => {

   const enteredVoorkeur1 = voorkeur1InputRef.current.value;
   const enteredVoorkeur2 = voorkeur2InputRef.current.value;
   const enteredVoorkeur3 = voorkeur3InputRef.current.value;
   const accessToken =  AsyncStorage.getItem('accesToken');

   if (enteredVoorkeur1 === "---" || enteredVoorkeur2 === "---" || enteredVoorkeur3 === "---"){
       alert("At least one of the subject isn't correctly submit, try again.")
       return;}

   var id1;
   var id2;
   var id3;

   onderwerpen.map((onderwerp, i) =>{
       if (onderwerp.name === enteredVoorkeur1) {
           return id1 = onderwerp.id
       }
   })
   onderwerpen.map((onderwerp, i) =>{
       if (onderwerp.name === enteredVoorkeur2) {
           return id2 = onderwerp.id
       }
   })
   onderwerpen.map((onderwerp, i) =>{
       if (onderwerp.name === enteredVoorkeur3) {
           return id3 = onderwerp.id
       }
   })

   try {
       axios.post("https://Bachelorproef-backend.herokuapp.com/auth/addselection/" + id1 + "/" + id2 + "/" + id3,
       null,
           {
            withCredentials: true,
            headers: {
                'Authorization' : "Bearer " + accessToken
              }
           });
       setVeranderd(true);
   } catch (err) {
       console.error(err);
   }
}

   return (
    <ScrollView contentContainerStyle={styles.view}>
    <View style={styles.tekstvak}>
        <Text style={styles.text}>
        Dear student
        {"\n"}
        {"\n"}
        Select 3 subjects. Assign a score, based on your 
        personal preference, to each of the subjects in your 
        selection. Submit your selection the latest on <Text style={styles.vet}>30 April 2022 23:55</Text>. 
        </Text>
    </View>
    <View style={styles.pickerView}>
    <Text style={styles.formLabel}>Preference 1</Text>
    <Picker 
      style={styles.pickerStyle}
      ref={voorkeur1InputRef} >
      <Picker.Item>---</Picker.Item>
       {onderwerpen?.map((onderwerp, i) =>
         <Picker.Item key={i} label={onderwerp.name} value={onderwerp.name}></Picker.Item>
      )}
    </Picker>
    </View>
    <View style={styles.pickerView}>
    <Text style={styles.formLabel}>Preference 2</Text>
    <Picker 
      style={styles.pickerStyle}
      ref={voorkeur2InputRef}>
       <Picker.Item>---</Picker.Item>
      {onderwerpen?.map((onderwerp, i) =>
            <Picker.Item key={i} label={onderwerp.name} value={onderwerp.name}></Picker.Item>
      )}
    </Picker>
    </View>
    <View style={styles.pickerView}>
    <Text style={styles.formLabel}>Preference 3</Text>
    <Picker 
      style={styles.extraSpace}
      ref={voorkeur3InputRef}>
      <Picker.Item>---</Picker.Item>
      {onderwerpen?.map((onderwerp, i) =>
            <Picker.Item key={i} label={onderwerp.name} value={onderwerp.name}></Picker.Item>
      )}
    </Picker>
    </View>
    <Button style={styles.knop} color='#00407A' title='Submit' onPress={()=>{submitHandler()}}/>
    <View style={styles.pickerView}>
       <Text>Your selection</Text>
       {ingediend.forEach((onderwerp, i) => {
         if(onderwerp !== null)
            return( array2.push(onderwerp.name) )
      })}
      {array2.isEmpty ?
         <Text>No selection made yet</Text>
            :<Text>1 : {array2[0]}
             <Text> {"\n"}</Text>
            2 : {array2[1]}
            <Text> {"\n"}</Text>
            3 : {array2[2]}
            </Text>
      }
    </View>
    </ScrollView>
   );
 }
 
 const styles = StyleSheet.create({
    extraSpace:{
      marginBottom:10,
      marginTop: 5,
      height: 40,  
      width: '100%',
      borderRadius: 50, 
      borderColor:'#b4e5fa', 
      backgroundColor: '#b4e5fa',
      justifyContent: 'center', 
    },
     view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
     },
     pickerStyle:{  
      marginTop: 5,
      height: 40,  
      width: '100%',
      borderRadius: 50, 
      borderColor:'#b4e5fa', 
      backgroundColor: '#b4e5fa',
      justifyContent: 'center',  
    }, 
     tekstvak:{
         width:"80%",
         borderRadius:25,
         height:"30%",
         alignItems:"center",
         justifyContent:"center",
         backgroundColor:"#00407A",
         marginBottom:20,
         marginLeft:10,
        marginRight:10,
     },
     formLabel: {
      fontWeight:'bold',
      fontSize: 20,
      color: '#303436',
      fontWeight:'400',
      marginLeft:10,
    },
     text: {
        color:'#fff',
        fontSize:16,
        fontWeight:'normal',
        marginLeft:10,
        marginRight:10,
     },
     vet:{
      fontSize:16,
      fontWeight: 'bold',
     },knop:{
      marginTop: 15,
      height: 150,  
      borderRadius: 50, 
      borderColor:'#b4e5fa', 
      backgroundColor: '#b4e5fa',
      justifyContent: 'center',  
    }, 
    pickerView: {
       width:'90%'
    }
 })

 export default Indienenscreen;