import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Irmage, SafeAreaView} from 'react-native';

function Homescreen() {
   return (
    <View style={styles.view}>
        <Text style={styles.text}>
        Welcome
        {"\n"}
        {"\n"}
        On this page you will find the offer of thesis subjects for target group IW E-ICT Gent.
        {"\n"}
        {"\n"}
        Between 01 April 2022 00:00 and 30 April 2022 23:55 this offer will be open for choosing 
        a master thesis. During this time you will be able to set favorites, 
        add subjects to a selection and submit a selection. For this target 
        group you have to submit a selection of 3 subjects. Finalize your 
        submission the latest on 30 April 2022 23:55. After this date the 
        application will no longer be available.
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
        fontWeight:'700'
     }
 })

 export default Homescreen;