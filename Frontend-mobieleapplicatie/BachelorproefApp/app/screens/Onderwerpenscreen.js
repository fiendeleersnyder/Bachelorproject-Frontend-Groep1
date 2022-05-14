import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction } from 'react-native-material-cards';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


    const OnderwerpLijst = ({navigation}) => {
      const [onderwerpen, setOnderwerpen] = useState();
      const [favorieten_id, setFavorieten_id] = useState([]);
      const [veranderd, setVeranderd] = useState();
  
      useEffect(() => {
          const controller = new AbortController();
  
          const getOnderwerpen = async () => {
            const accessToken = await AsyncStorage.getItem('accesToken');
              try {
                  const response = await axios.get('http://192.168.0.164:8080/onderwerpen', {
                      withCredentials: true,
                      headers: {
                        'Authorization' : "Bearer " + accessToken
                      }
                  });
                  console.log(response.data);
                    setOnderwerpen(response.data);
              } catch (err) {
                  console.error(err);
              }
              let array = [];
              try{
                const response = await axios.get('http://192.168.0.164:8080/auth/favorieten', {
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
                const response = await axios.get("http://192.168.0.164:8080/auth/favorieten", {
                    withCredentials: true,
                    headers: {
                        'Authorization' : "Bearer " + accessToken
                      }
                });
                    console.log(response?.data)
                    array = response?.data;
                    console.log(array);
            } catch (err) {
                console.error(err);
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
                    axios.delete("http://192.168.0.164:8080/auth/deletefavoriet/" + id,
                    {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json',
                        'Authorization' : "Bearer " + accessToken}
                    });
                    setVeranderd(true)
                } catch (err) {
                    console.error(err);
                }
            }
            else{
                try {
                    axios.post("http://192.168.0.164:8080/auth/addfavoriet/" + id,
                        {
                            withCredentials: true,
                            headers: { 'Content-Type': 'application/json',
                            'Authorization' : "Bearer " + accessToken}
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
                            <CardTitle title={onderwerp.name} subtitle={"          "} 
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
                                   <Button onPress={()=>favoriet(onderwerp.id)} color="#ff084a" title="Add to favorites!"/>
                                    <Button
                                        onPress={() => { navigation.navigate('Subject Details', {itemId:onderwerp.id, otherParam: onderwerp,});}}
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
            <CardTitle title={"titel van het onderwrep komt hier te staan"} subtitle={"          "}  />
            <Text>{"\n"}</Text>
                <CardContent text={"promotor"}></CardContent>
                <CardContent><Text><Ionicons name="people" size={24} color="#00407A" />  {" 2"}</Text></CardContent>
                
                    <CardContent text={"Disciplines: hier komen de verschillende discplines te staan"}> </CardContent>
                
                <CardAction 
                    separator={true} 
                    inColumn={false}>
                    <Button 
                        onPress={() => console.log("favorietenknop")}
                        color="#ff084a" 
                        title="Add to favorites!"/>
                    <Button
                        onPress={() => console.log("moreinfo knop")}
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
        paddingLeft:10,
     },
 })

 export default OnderwerpLijst;