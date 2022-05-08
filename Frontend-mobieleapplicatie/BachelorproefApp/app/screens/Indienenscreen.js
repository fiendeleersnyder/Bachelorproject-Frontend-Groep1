import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';

function Indienenscreen() {
   return (
    <View style={styles.view}>
        <Text style={styles.text}>
        Dear student
        {"\n"}
        {"\n"}
        Select <b>3 subjects</b>. Assign a score, based on your 
        personal preference, to each of the subjects in your 
        selection. Submit your selection the latest on <b>30 April 2022 23:55</b>. 
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
        fontWeight:'normal',
     }
 })

 export default Indienenscreen;