import { StyleSheet, Button, Text, SafeAreaView, ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, } from 'react-native-material-cards';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';

import * as React from 'react';


const OnderwerpDetail = ({route, navigation}) => {
    const { itemId, otherParam } = route.params;
    const [onderwerp, setOnderwerp] = useState();
    
    

    useEffect(() => {
        const controller = new AbortController();
    
        const getInfo = async () => {
            try {
                // const response = await axios.get("/onderwerpen/" + itemId);
                // console.log(response.data);
                //setOnderwerp(response?.data)
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
    
    return (
    <SafeAreaView style={styles.view}>
    <ScrollView style={styles.scrollView}>
        <Card style={styles.kaart}>
                <CardTitle title={otherParam.name} subtitle={"          "}  />
                <Text>{"\n"}</Text>
                <CardContent text={otherParam.doelgroep}></CardContent>
                <CardContent text={otherParam.promotor}></CardContent>
                <CardContent text={otherParam.email}></CardContent>
                {otherParam.phone.isEmpty ? (
                    <CardContent> Telefoonnummer: {otherParam.phone}</CardContent>) : <CardContent></CardContent>
                }
                <CardContent><Text><Ionicons name="people" size={24} color="#00407A" />  {" 2"}</Text></CardContent>
                <CardContent text={otherParam.description}></CardContent>
                {otherParam.disciplines.isEmpty ? (
                    <CardContent> Disciplines: {otherParam.disciplines}</CardContent>) : <CardContent></CardContent>
                }
                {otherParam.trefwoorden.isEmpty ? (
                    <CardContent> Trefwoorden: {otherParam.trefwoorden}</CardContent>) : <CardContent></CardContent>
                }
                <CardAction 
                    separator={true} 
                    inColumn={false}>
                    <Button 
                                onPress={() => console.log("favorietenknop")}
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
       //width:'100%',
       paddingBottom:10,
    },
})
export default OnderwerpDetail;


