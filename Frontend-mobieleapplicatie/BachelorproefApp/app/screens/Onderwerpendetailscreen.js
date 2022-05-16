import { StyleSheet, Button, Text, SafeAreaView, ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, } from 'react-native-material-cards';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';


const OnderwerpDetail = ({route, navigation}) => {
    const { itemId, otherParam } = route.params;
    const [onderwerp, setOnderwerp] = useState();
    const [favorieten_id, setFavorieten_id] = useState([]);
    const [veranderd, setVeranderd] = useState();
    

    useEffect(() => {
        const controller = new AbortController();
    
        const getInfo = async () => {
            try {
                setOnderwerp(otherParam)
            } catch (err) {
                console.error(err);
            }
        }

        getInfo();
    
        return () => {
            controller.abort();
        }
    }, [])

    const favoriet = async (id) => {
        const accessToken = await AsyncStorage.getItem('accesToken');
        let array = [];
        try{
            const response = await axios.get("https://Bachelorproef-backend.herokuapp.com/auth/favorieten", {
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
                axios.delete("https://Bachelorproef-backend.herokuapp.com/auth/deletefavoriet/" + id,
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
                 axios.post("https://Bachelorproef-backend.herokuapp.com/auth/addfavoriet/" + id,
                 null,
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
            <Card style={styles.kaart}>
                <CardTitle title={otherParam.name} subtitle={"          "}  />
                <Text>{"\n"}</Text>
                <CardContent text={otherParam.doelgroep}></CardContent>
                <CardContent text={otherParam.promotor}></CardContent>
                <CardContent text={otherParam.email}></CardContent>
                {otherParam.phone !== "" ? (
                    <CardContent> Telefoonnummer: {otherParam.phone}</CardContent>) : <CardContent></CardContent>
                }
                <CardContent><Text><Ionicons name="people" size={24} color="#00407A" />  {otherParam.capacity}</Text></CardContent>
                <CardContent text={otherParam.description}></CardContent>
                {otherParam.disciplines?.length !== 0 ? (
                    <CardContent> Disciplines: <Text> {otherParam.disciplines} </Text> </CardContent>) : <CardContent></CardContent>
                }
                <Text>
                {"\n"}
                {"\n"}
                {"\n"}
                </Text>
                {otherParam.trefwoorden?.length !== 0 ? (
                    <CardContent> Trefwoorden: <Text>{otherParam.trefwoorden}</Text></CardContent>) : <CardContent></CardContent>
                }
                <Text>
                {"\n"}
                {"\n"}
                {"\n"}
                </Text>
                <CardAction 
                    separator={true} 
                    inColumn={false}>
                    <Button 
                                onPress={()=>favoriet(otherParam.id)}
                                color="#ff084a" 
                                title="Add to favorites!"/>
                    <Button
                        onPress={() => navigation.navigate('Subjects')}
                        title="Less info"
                        color="#00407A"
                    />
                </CardAction>
                </Card>
        </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    view: {
       flex: 1, 
       alignItems: 'center', 
       justifyContent: 'center',
       backgroundColor: '#fff',
    },
    scrollView:{
       flex: 1,
       width:'90%',
       backgroundColor: '#fff', 
    },
    text: {
       fontSize:16,
       fontWeight:'normal',
    },
    kaart: {
       paddingBottom:10,
    },
})
export default OnderwerpDetail;


