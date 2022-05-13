import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import { PropTypes } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from "react-router-dom";
const history = useHistory();

   const OnderwerpLijst = () => {
      const [onderwerpen, setOnderwerpen] = useState();
      const [favorieten_id, setFavorieten_id] = useState([]);
      const [veranderd, setVeranderd] = useState();
      const navigate = useNavigation();
      const location = useRoute();
  
      useEffect(() => {
          const controller = new AbortController();
  
          const getOnderwerpen = async () => {
            const accessToken = await AsyncStorage.getItem('accesToken');
              try {
                  const response = await axios.get('http://192.168.0.172:8080/onderwerpen', {
                      withCredentials: true,
                      headers: {
                        'Authorization' : "Bearer " + accessToken
                      }
                  });
                  console.log(response.data);
                    setOnderwerpen(response.data);
              } catch (err) {
                  console.error(err);
                  //navigate('/login', { state: {from: location}, replace: true})
              }
              let array = [];
              try{
                  const response = await axios.get("http://192.168.0.172:8080/auth/favorieten", {
                    withCredentials: true,
                    headers: {
                        'Authorization' : "Bearer " + accessToken
                      }
                });
                  array = response?.data;
                  console.log(array);
                  setVeranderd(false)
              } catch (err) {
                  console.error(err);
                  //navigate('/login', { state: {from: location}, replace: true})
              }
              let idarray = [];
              array?.map((onderwerp, i) =>
                  idarray.push(onderwerp.id))
              setFavorieten_id(idarray);
          }
  
          getOnderwerpen();
  
          return () => {
              controller.abort();
          }
          }, [veranderd])


          const favoriet = async (id) => {
            const accessToken = await AsyncStorage.getItem('accesToken');
            let array = [];
            try{
                const response = axios.get("http://192.168.0.172:8080/auth/favorieten", {
                    withCredentials: true,
                    headers: {
                        'Authorization' : "Bearer " + accessToken
                      }
                });
                    array = response?.data;
                    console.log(array);
            } catch (err) {
                console.error(err);
                //navigate('/login', { state: {from: location}, replace: true})
            }
            setFavorieten_id([])
            let idarray = [];
            array.map((onderwerp, i) =>
                        idarray.push(onderwerp.id))
            setFavorieten_id(idarray);
            console.log("id array" + idarray);
            let found = false;
            if (favorieten_id !== []) {
                found = favorieten_id.includes(id);
            }
            console.log(favorieten_id);
            console.log(found);
            if (found) {
                try {
                    axios.delete("http://192.168.0.172:8080/auth/deletefavoriet/" + id,
                    {
                        headers: { 'Content-Type': 'application/json',
                        'Authorization' : "Bearer " + accessToken},
                        withCredentials: true
                    });
                    setVeranderd(true)
                } catch (err) {
                    console.error(err);
                    //navigate('/login', { state: {from: location}, replace: true})
                }
            }
            else{
                try {
                    axios.post("http://192.168.0.172:8080/auth/addfavoriet/" + id,
                        {
                            headers: { 'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + accessToken},
                            withCredentials: true
                        });
                    setVeranderd(true)
                } catch (err) {
                    console.error(err);
                }
                }
        }

   return (
    <SafeAreaView style={styles.view}>
    <ScrollView style={styles.scrollView}>
        {onderwerpen?.length
            ? 
                onderwerpen.map((onderwerp, i) =>
                {
                    if(!onderwerp.hideObject)
                        return(
                            <Card key={i} style={styles.kaart}>
                            <CardTitle title={onderwerp.name} subtitle={"          "} numberofLines={2} 
                            />
                            <Text>{"\n"}</Text>
                                <CardContent text={onderwerp.promotor}></CardContent>
                                <CardContent><Text><Ionicons name="people" size={24} color="#00407A" />  {onderwerp.capacity}</Text></CardContent>
                                {onderwerp.disciplines.isEmpty ? (
                                    <CardContent> Disciplines: {onderwerp.disciplines}</CardContent>) : <CardContent></CardContent>
                                }
                                <CardAction 
                                    separator={true} 
                                    inColumn={false}>
                                   <CardButton onClick={()=>favoriet(onderwerp.id)} color="#ff084a" title="Add to favorites!"/>
                                    <CardButton
                                        onPress={() => {history.push("/onderwerp.id")}}
                                        title="More info"
                                        color="#00407A"
                                    />
                                </CardAction>
                            </Card>
                        )
                }
            

        ) : <Text style={styles.text}>No subjects to show</Text>
        }

        <Card  style={styles.kaart}>
            <CardTitle title={"titel van het onderwrep komt hier te staan"} subtitle={"          "} numberofLines={2} />
            <Text>{"\n"}</Text>
                <CardContent text={"promotor"}></CardContent>
                <CardContent><Text><Ionicons name="people" size={24} color="#00407A" />  {" 2"}</Text></CardContent>
                {onderwerp.disciplines.isEmpty ? (
                    <CardContent> Disciplines: {"hier komen de verschillende discplines te staan"}</CardContent>) : <CardContent></CardContent>
                }
                <CardAction 
                    separator={true} 
                    inColumn={false}>
                    <CardButton onClick={()=>favoriet(onderwerp.id)} color="#ff084a" title="Add to favorites!"/>
                    <CardButton
                        //onPress={() => {history.push("/onderwerp.id")}
                        title="More info"
                        color="#00407A"
                    />
                </CardAction>
            </Card>


    <View>
        <Text>
        {"\n"}
        {"\n"}
        {"\n"}
        </Text>
      </View>

    </ScrollView>
    </SafeAreaView>
   );
 }

 const styles = StyleSheet.create({
     view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
     },
     scrollView:{
        flex: 1,
        backgroundColor: '#fff', 
     },
     text: {
        fontSize:16,
        fontWeight:'normal',
     },
     kaart: {
        width:'90%',
        paddingBottom:10,
     },
 })

 export default OnderwerpLijst;