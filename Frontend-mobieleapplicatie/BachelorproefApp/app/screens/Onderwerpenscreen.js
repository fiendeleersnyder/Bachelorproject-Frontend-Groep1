import { StyleSheet, Text, View } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import { PropTypes } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OnderwerpUitbreiden(id){
    let nummer =id;
   <Text>nummer</Text>
}

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
                  const response = await axios.get('http://localhost:8080/onderwerpen', {
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
                  const response = await axios.get("http://localhost:8080/auth/favorieten", {
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
                const response = axios.get("http://localhost:8080/auth/favorieten", {
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
                    axios.delete("http://localhost:8080/auth/deletefavoriet/" + id,
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
                    axios.post("http://localhost:8080/auth/addfavoriet/" + id,
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
        }

   return (
    <ScrollView contentContainerStyle={styles.view}>
        <Text style={styles.text}>Subjects Screen</Text>

        {onderwerpen?.length
            ? 
                onderwerpen.map((onderwerp, i) =>
                {
                    if(!onderwerp.hideObject)
                        return(
                            <Card key={i}>
                                <CardTitle
                                    title={onderwerp.name}
                                    subtitle={onderwerp.doelgroep}>
                                </CardTitle>
                                <CardContent text={onderwerp.promotor}></CardContent>
                                <CardContent><Ionicons name="people" size={24} color="#00407A" />{onderwerp.capacity}</CardContent>
                                {onderwerp.disciplines.isEmpty ? (
                                    <CardContent> Disciplines: {onderwerp.disciplines}</CardContent>) : <CardContent></CardContent>
                                }

                                <CardAction 
                                    separator={true} 
                                    inColumn={false}>
                                    <IconButton onClick={()=>favoriet(onderwerp.id)}>{favorieten_id.includes(onderwerp.id) ? <Ionicons name="heart-sharp" size={24} color="#ff084a" /> : <Ionicons name="heart-outline" size={24} color="#00407A" />}</IconButton>
                                    <CardButton
                                        onPress={() => {OnderwerpUitbreiden(onderwerp.id)}}
                                        title="More info"
                                        color="#00407A"
                                    />
                                </CardAction>
                            </Card>
                        )
                }
            

        ) : <Text style={styles.text}>No subjects to show</Text>
        }


    <View>
        <Text>
        {"\n"}
        {"\n"}
        {"\n"}
        </Text>
      </View>

    </ScrollView>
   );
 }

 const styles = StyleSheet.create({
     view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
     },
     text: {
        fontSize:16,
        fontWeight:'normal',
        marginLeft:10,
        marginRight:10,
     },
 })

 export default OnderwerpLijst;