import { StyleSheet, Dimensions, Text, Alert, Button, Platform, View, Irmage, SafeAreaView} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

function OnderwerpUitbreiden(id){
   <Text>id</Text>
}

function Onderwerpenscreen() {

   OnderwerpLijst = () => {
      const [onderwerpen, setOnderwerpen] = useState();
      const [favorieten_id, setFavorieten_id] = useState([]);
      const [veranderd, setVeranderd] = useState();
      const axiosPrivate = useAxiosPrivate();
      const navigate = useNavigate();
      const location = useLocation();
  
      useEffect(() => {
          let isMounted = true;
          const controller = new AbortController();
  
          const getOnderwerpen = async () => {
              try {
                  const response = await axiosPrivate.get('/onderwerpen', {
                      signal: controller.signal
                  });
                  console.log(response.data);
                  isMounted && setOnderwerpen(response.data);
              } catch (err) {
                  console.error(err);
                  navigate('/login', { state: {from: location}, replace: true})
              }
              let array = [];
              try{
                  const response = await axiosPrivate.get("/auth/favorieten");
                  array = response?.data;
                  console.log(array);
                  setVeranderd(false)
              } catch (err) {
                  console.error(err);
                  navigate('/login', { state: {from: location}, replace: true})
              }
              let idarray = [];
              array.map((onderwerp, i) =>
                  idarray.push(onderwerp.id))
              setFavorieten_id(idarray);
          }
  
          getOnderwerpen();
  
          return () => {
              isMounted = false;
              controller.abort();
          }
          }, [veranderd])


          const favoriet = async (id) => {
            let array = [];
            try{
                const response = await axiosPrivate.get("/auth/favorieten");
                    array = response?.data;
                    console.log(array);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
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
                    axiosPrivate.delete("/auth/deletefavoriet/" + id,
                    {
                        headers: { 'Content-Type': 'application/json'}
                    });
                    setVeranderd(true)
                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: {from: location}, replace: true})
                }
            }
            else{
                try {
                    axiosPrivate.post("/auth/addfavoriet/" + id,
                        {
                            headers: { 'Content-Type': 'application/json'}
                        });
                    setVeranderd(true)
                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: {from: location}, replace: true})
                }
                }
        }

   return (
    <View style={styles.view}>
        <Text style={styles.text}>Subjects Screen</Text>

        {onderwerpen?.length
                ? (
                     onderwerpen.map((onderwerp, i) =>
                            {
                                if(!onderwerp.hideObject)
                                    return(
                                        <Card>
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
                                                   <IconButton onClick={()=>favoriet(onderwerp.id)}>{favorieten_id.includes(onderwerp.id) ? <Ionicons name="heart-sharp" size={24} color="black" /> : <Ionicons name="heart-outline" size={24} color="#00407A" />}</IconButton>
                                                   <CardButton
                                                      onPress={() => {OnderwerpUitbreiden(onderwerp.id)}}
                                                      title="More info"
                                                      color="#00407A"
                                                   />
                                                </CardAction>
                                        </Card>
                                    )
                            }
                        )

                ) : <Text style={styles.text}>No subjects to show</Text>
            }
    </View>
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
}

 export default Onderwerpenscreen;