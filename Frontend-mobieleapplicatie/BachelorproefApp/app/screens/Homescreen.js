import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';

function Homescreen() {
   return (
    <View style={styles.view}>
        <Text style={styles.text}>
        Welcome
        {"\n"}
        {"\n"}
        Between <b>01 April 2022 00:00</b> and <b>30 April 2022 23:55</b> this offer of 
        thesis subject will be open for choosing a master thesis. During 
        this time you will be able to set favorites, add subjects to a 
        selection and submit a selection. For this target group you have 
        to submit a selection of 3 subjects. Finalize your submission the 
        latest on <b>30 April 2022 23:55</b>. After this date the application 
        will no longer be available.
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
        fontWeight: 'normal' 
     }
 })

 export default Homescreen;