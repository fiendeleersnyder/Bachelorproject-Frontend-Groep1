import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Image, SafeAreaView, ScrollView} from 'react-native';

function Indienenscreen() {
   return (
    <ScrollView contentContainerStyle={styles.view}>
        <Text style={styles.text}>
        Dear student
        {"\n"}
        {"\n"}
        Select 3 subjects. Assign a score, based on your 
        personal preference, to each of the subjects in your 
        selection. Submit your selection the latest on <Text style={styles.vet}>30 April 2022 23:55</Text>. 
        </Text>
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
     vet:{
      fontSize:16,
      fontWeight: 'bold',
     }
 })

 export default Indienenscreen;