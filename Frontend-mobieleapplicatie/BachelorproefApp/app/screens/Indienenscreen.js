import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Irmage, SafeAreaView} from 'react-native';

function Indienenscreen() {
   return (
    <View style={styles.view}>
        <Text style={styles.text}>Submit Screen</Text>
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
        fontWeight:'700'
     }
 })

 export default Indienenscreen;