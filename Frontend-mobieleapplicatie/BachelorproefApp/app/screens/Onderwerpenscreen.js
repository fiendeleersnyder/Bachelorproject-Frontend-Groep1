import { StyleSheet, Dimensions, Text, Alert, Button, Platform, TouchableOpacity, View, Irmage, SafeAreaView} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';


function Onderwerpenscreen() {
   return (
    <View style={styles.view}>
        <Text style={styles.text}>Subjects Screen</Text>
        <Card>
            <CardTitle 
               title="This is a title" 
               subtitle="This is subtitle"
               />
            <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
            <CardAction 
               separator={true} 
               inColumn={false}>
               <CardButton
                  onPress={() => {}}
                  title="Push"
                  color="blue"
               />
               <CardButton
                  onPress={() => {}}
                  title="Later"
                  color="blue"
               />
            </CardAction>
         </Card>
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
     card: {
      height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  }
 })


 export default Onderwerpenscreen;