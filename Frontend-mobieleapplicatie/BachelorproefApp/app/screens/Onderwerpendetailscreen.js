import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useHistory,  useParams } from "react-router-dom";
import * as React from 'react';
import Onderwerpenscreen from './app/screens/Onderwerpenscreen';

const OnderwerpDetail = () => {
    //const history = useHistory();
    const {id} = useParams();
    const [onderwerp, setOnderwerp] = useState();

    useEffect(() => {
        const controller = new AbortController();

        const getInfo = async () => {
            try {
                const response = await axios.get("/onderwerpen/" + id);
                console.log(response.data);
                setOnderwerp(response?.data)
            } catch (AxiosError) {
                console.error(AxiosError);
            }
        }

        getInfo();

        return () => {
            controller.abort();
        }
    }, [])

return (
    <SafeAreaView style={styles.view}>
    <ScrollView style={styles.scrollView}>
    <Card  style={styles.kaart}>
            <CardTitle title={"titel van het onderwrep komt hier te staan"} subtitle={"          "} numberofLines={2} />
            <Text>{"\n"}</Text>
            <CardContent text={"doelgoep"}></CardContent>
            <CardContent text={"promotor"}></CardContent>
            <CardContent text={"email"}></CardContent>
            {onderwerp.telefoonnummer.isEmpty ? (
                <CardContent> Telefoonnummer: {"telnr"}</CardContent>) : <CardContent></CardContent>
            }
            <CardContent><Text><Ionicons name="people" size={24} color="#00407A" />  {" 2"}</Text></CardContent>
            <CardContent text={"omschrijving"}></CardContent>
            {onderwerp.disciplines.isEmpty ? (
                <CardContent> Disciplines: {"hier komen de verschillende discplines te staan"}</CardContent>) : <CardContent></CardContent>
            }
            {onderwerp.trefwoorden.isEmpty ? (
                <CardContent> Trefwoorden: {"hier komen de verschillende trefwoorden te staan"}</CardContent>) : <CardContent></CardContent>
            }
            <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                    //onPress={() => navigation.navigate('Subjects')}
                    //onPress={history.goBack()}
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
export default OnderwerpDetail;


