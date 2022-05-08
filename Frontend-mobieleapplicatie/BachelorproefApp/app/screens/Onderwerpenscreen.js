import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Irmage, SafeAreaView} from 'react-native';

function Onderwerpenscreen() {
   return (
    <View style={styles.view}>
        <Text style={styles.text}>Subjects Screen</Text>
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
     }
 })


 export default Onderwerpenscreen;