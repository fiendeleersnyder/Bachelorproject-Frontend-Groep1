import { StyleSheet, ScrollView, Text, TextInput, Button, View, SafeAreaView} from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import axios from 'axios';



class AddOnderwerp extends React.Component {
    
  constructor(){
    super();
    this.state={
      title: '',
      doelgroep:'',
      begeleiding:'', 
      contactpersoon:'', 
      email:'',
      telefoonnummer:'',
      aantalpersonen:'',
      omschrijving:'',
      kernwoord1:'',
      kernwoord2:'',
      kerwoord3:'',
      trefwoorden:'',
    };
  };

  submit(id){
    console.warn(this.state);
    var idPromotor;

    if (this.state.title === "" || this.state.begeleiding === "" || this.state.contactpersoon === "" || this.state.email === "" || this.state.omschrijving === ""){
        alert("Something went wrong, please try again. Make sure to fill in every field marked with a star.")
        return;}

    promotoren.map((promotor, i) => {
      if(enteredPromotor === promotor.name)
          return(
              idPromotor = promotor.id
          )
    })
    const onderwerpData = {
        title: this.state.title,
        doelgroep: this.state.doelgroep,
        begeleiding: this.state.begeleiding,
        promotor:idPromotor,
        email:this.state.email,
        telefoonnummer: this.state.telefoonnummer,
        aantalpersonen:this.state.aantalpersonen,
        kermerkwoord1:this.state.kernwoord1,
        kermerkwoord2:this.state.kernwoord2,
        kermerkwoord3:this.state.kerwoord3,
        trefwoorden:this.state.trefwoorden,
        description: this.state.omschrijving
    };

    console.log(onderwerpData);

    try {
        const response = axios.post("http://192.168.0.172:8080/addonderwerp/" + id,
            JSON.stringify(onderwerpData),
            {
                headers: { 'Content-Type': 'application/json' }
            });
    }catch (AxiosError) {
        console.error(AxiosError);
    }
  };
  
  
  render(){
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        //paddingTop: Platform.OS === "android" ? 20 :0,
        //paddingBottom: Platform.OS === "android" ? 20 :0,
      },
      view:{
        marginLeft:10,
        marginRight:10,
      },
      formLabel: {
        fontSize: 20,
        color: '#303436',
        fontWeight:'400',
      },
      formLabel2:{
        fontSize:15,
        color: '#303436'
      },
      slider:{
        marginTop: 10,
        marginBottom:10,
        width: '90%',
      },
      inputStyle: {
        marginTop: 5,
        width: '90%',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#b4e5fa',
      },
      formText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#303436',
        fontSize: 20,
      },
      text: {
        color: '#fff',
        fontSize: 20,
      },
      pickerStyle:{  
        marginTop: 5,
        height: 40,  
        width: '90%',
        borderRadius: 50, 
        borderColor:'#b4e5fa', 
        backgroundColor: '#b4e5fa',
        justifyContent: 'center',  
      }, 
      knop:{
        marginTop: 15,
        height: 150,  
        borderRadius: 50, 
        borderColor:'#b4e5fa', 
        backgroundColor: '#b4e5fa',
        justifyContent: 'center',  
      }
     })

    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view}>
        <Text style={styles.formLabel}> Title </Text>
          <View> 
            <TextInput 
              placeholder="Enter title"
              onChangeText={(text)=>{this.setState({title:text})}}
              style={styles.inputStyle}             
              />
            </View>
        <Text style={styles.formLabel}> Targetgroup </Text>
              <Picker 
              style={styles.pickerStyle}
              onValueChange={currentValue => {this.setState({doelgroep:currentValue})}}>
              <Picker.Item label="IW E-ICT GroepT" value="IW E-ICT GroepT" />
              <Picker.Item label="IW EM GroepT" value="IW EM GroepT" />
              <Picker.Item label="IW CH GroepT" value="IW CH GroepT" />
              <Picker.Item label="IW BC GroepT" value="IW BC GroepT" />
              <Picker.Item label="IW CH DeNayer" value="IW CH DeNayer" />
              <Picker.Item label="BW LT Geel" value="BW LT Geel" />
              <Picker.Item label="BW VI Geel" value="BW VI Geel" />
              <Picker.Item label="IW BC Gent" value="IW BC Gent" />
              <Picker.Item label="IW BK Brugge" value="IW BK Brugge" />
              <Picker.Item label="IW BK Gent" value="IW BK Gent" />
              <Picker.Item label="IW BK DeNayer" value="IW BK DeNayer" />
              <Picker.Item label="IW CH Gent" value="IW CH Gent" />
              <Picker.Item label="IW EM Brugge" value="IW EM Brugge" />
              <Picker.Item label="IW EM Geel" value="IW EM Geel" />
              <Picker.Item label="IW EM Gent" value="IW EM Gent" />
              <Picker.Item label="IW EM DeNayer" value="IW EM DeNayer" />
              <Picker.Item label="IW E-ICT Brugge" value="IW E-ICT Brugge" />
              <Picker.Item label="IW E-ICT Geel" value="IW E-ICT Geel" />
              <Picker.Item label="IW E-ICT Gent" value="IW E-ICT Gent" />
              <Picker.Item label="IW E-ICT DeNayer" value="IW E-ICT DeNayer" />
              <Picker.Item label="IW EN Brugge" value="IW EN Brugge" />
              <Picker.Item label="IW EN Geel" value="IW EN Geel" />
              <Picker.Item label="IW EN Gent" value="IW EN Gent" />
              <Picker.Item label="IW WE DeNayer" value="IW WE DeNayer" />
              <Picker.Item label="IW KV Brugge" value="IW KV Brugge" />
              <Picker.Item label="IW CH Diepenbeek" value="IW CH Diepenbeek" />
              </Picker>
        <Text style={styles.formLabel}> Extern partner-Research group</Text>
          <View> 
            <TextInput 
              placeholder="Enter extern partner-research group"
              onChangeText={(text)=>{this.setState({begeleiding:text})}}
              style={styles.inputStyle}
              />
          </View>
        <Text style={styles.formLabel}> Promotor-Co-promotor-Contact person</Text>
          <View> 
            <TextInput 
              placeholder="Enter supervisor-co-supervisor-contact person"
              onChangeText={(text)=>{this.setState({contactpersoon:text})}}
              style={styles.inputStyle}
              />
          </View>
        <Text style={styles.formLabel}> Contact details</Text>
          <Text style={styles.formLabel2}> E-mail </Text>
            <View> 
              <TextInput 
                placeholder="Enter e-mail"
                onChangeText={(text)=>{this.setState({email:text})}}
                style={styles.inputStyle}
                />
            </View>
          <Text style={styles.formLabel2}> Phone number </Text>
            <View> 
              <TextInput 
                placeholder="Enter phone number"
                onChangeText={(text)=>{this.setState({telefoonnummer:text})}}
                style={styles.inputStyle}
                />
            </View>
        <Text style={styles.formLabel}> Permitted number of students per group</Text>
          <Slider
              style={styles.slider}
              step={1}
              minimumValue={1}
              maximumValue={2}
              onValueChange={slideValue => {this.setState({aantalpersonen:slideValue})}}
              thumbTintColor="#b4e5fa"
            />
            <Text>Permitted number: {this.state.aantalpersonen}</Text>
        <Text style={styles.formLabel}> Description</Text>
          <TextInput 
                placeholder="Enter description"
                onChangeText={(text)=>{this.setState({omschrijving:text})}}
                style={styles.inputStyle}
            />
        <Text style={styles.formLabel}> Disciplines</Text>
          <Text style={styles.formLabel2}> Discipline 1 </Text>
          <Picker
            style={styles.pickerStyle}
            onValueChange={currentCurrency => {this.setState({kernwoord1:currentCurrency})}}>
            <Picker.Item label="Analog Electronics and Design" value="Analog Electronics and Design" />
            <Picker.Item label="Digital Electronics and Design" value="Digital Electronics and Design" />
            <Picker.Item label="Software Development" value="Software Development" />
            <Picker.Item label="Data Science and Engineering" value="Data Science and Engineering" />
            <Picker.Item label="Tele and Data communication" value="Tele and Data communication" />
            <Picker.Item label="Computer Technique, Microcontrollers and Operating Systems" value="Computer Technique, Microcontrollers and Operating Systems" />
            <Picker.Item label="Systems Theory and Signal Processing" value="Systems Theory and Signal Processing" />
            <Picker.Item label="Electronic Design and Interfacing" value="Electronic Design and Interfacing" />
            <Picker.Item label="Structural analysis and design of structures" value="Structural analysis and design of structures" />
            <Picker.Item label="Materials and building technology" value="Materials and building technology" />
            <Picker.Item label="Civil engineering" value="Civil engineering" />
            <Picker.Item label="Construction management and BIM" value="Construction management and BIM" />
            <Picker.Item label="Geomatics" value="Geomatics" />
            <Picker.Item label="Advanced conversion and valorisation processes for waste streams" value="Advanced conversion and valorisation processes for waste streams" />
            <Picker.Item label="Sustainable processing engineering" value="Sustainable processing engineering" />
            <Picker.Item label="Acoustic processing" value="Acoustic processing" />
            <Picker.Item label="Electrochemical technology" value="Electrochemical technology" />
            <Picker.Item label="Membrane technology" value="Membrane technology" />
            <Picker.Item label="Polymer technology" value="Polymer technology" />
            <Picker.Item label="Advanced materials technology" value="Advanced materials technology" />
            <Picker.Item label="Malting and brewing technology" value="Malting and brewing technology" />
            <Picker.Item label="Meat technology" value="Meat technology" />
            <Picker.Item label="Enzyme technology" value="Enzyme technology" />
            <Picker.Item label="Fermentation technology" value="Fermentation technology" />
            <Picker.Item label="Medical bioengineering" value="Medical bioengineering" />
            <Picker.Item label="Molecular biology and ecology" value="Molecular biology and ecology" />
            <Picker.Item label="Molecular diagnostics" value="Molecular diagnostics" />
            <Picker.Item label="Drive systems" value="Drive systems" />
            <Picker.Item label="Automation" value="Automation" />
            <Picker.Item label="Energy conversion" value="Energy conversion" />
            <Picker.Item label="Production techniques and management" value="Production techniques and management" />
            <Picker.Item label="Mechanical design including the material selection" value="Mechanical design including the material selection" />
            <Picker.Item label="Automotive applications" value="Automotive applications" />
            <Picker.Item label="Aeronautical engineering technology" value="Aeronautical engineering technology" />
            <Picker.Item label="Raw material" value="Raw material" />
            <Picker.Item label="Product design" value="Product design" />
            <Picker.Item label="Processing" value="Processing" />
            <Picker.Item label="Post treatment" value="Post treatment" />
            <Picker.Item label="Application testing" value="Application testing" />
            <Picker.Item label="Recycling" value="Recycling" />
            <Picker.Item label="Power engineering" value="Power engineering" />
            <Picker.Item label="Energy engineering" value="Energy engineering" />
            <Picker.Item label="Automation" value="Automation" />
          </Picker>
          <Text style={styles.formLabel2}> Discipline 2 </Text>
          <Picker
            style={styles.pickerStyle}
            onValueChange={currentCurrency => {this.setState({kernwoord2:currentCurrency})}}>
            <Picker.Item label="Analog Electronics and Design" value="Analog Electronics and Design" />
            <Picker.Item label="Digital Electronics and Design" value="Digital Electronics and Design" />
            <Picker.Item label="Software Development" value="Software Development" />
            <Picker.Item label="Data Science and Engineering" value="Data Science and Engineering" />
            <Picker.Item label="Tele and Data communication" value="Tele and Data communication" />
            <Picker.Item label="Computer Technique, Microcontrollers and Operating Systems" value="Computer Technique, Microcontrollers and Operating Systems" />
            <Picker.Item label="Systems Theory and Signal Processing" value="Systems Theory and Signal Processing" />
            <Picker.Item label="Electronic Design and Interfacing" value="Electronic Design and Interfacing" />
            <Picker.Item label="Structural analysis and design of structures" value="Structural analysis and design of structures" />
            <Picker.Item label="Materials and building technology" value="Materials and building technology" />
            <Picker.Item label="Civil engineering" value="Civil engineering" />
            <Picker.Item label="Construction management and BIM" value="Construction management and BIM" />
            <Picker.Item label="Geomatics" value="Geomatics" />
            <Picker.Item label="Advanced conversion and valorisation processes for waste streams" value="Advanced conversion and valorisation processes for waste streams" />
            <Picker.Item label="Sustainable processing engineering" value="Sustainable processing engineering" />
            <Picker.Item label="Acoustic processing" value="Acoustic processing" />
            <Picker.Item label="Electrochemical technology" value="Electrochemical technology" />
            <Picker.Item label="Membrane technology" value="Membrane technology" />
            <Picker.Item label="Polymer technology" value="Polymer technology" />
            <Picker.Item label="Advanced materials technology" value="Advanced materials technology" />
            <Picker.Item label="Malting and brewing technology" value="Malting and brewing technology" />
            <Picker.Item label="Meat technology" value="Meat technology" />
            <Picker.Item label="Enzyme technology" value="Enzyme technology" />
            <Picker.Item label="Fermentation technology" value="Fermentation technology" />
            <Picker.Item label="Medical bioengineering" value="Medical bioengineering" />
            <Picker.Item label="Molecular biology and ecology" value="Molecular biology and ecology" />
            <Picker.Item label="Molecular diagnostics" value="Molecular diagnostics" />
            <Picker.Item label="Drive systems" value="Drive systems" />
            <Picker.Item label="Automation" value="Automation" />
            <Picker.Item label="Energy conversion" value="Energy conversion" />
            <Picker.Item label="Production techniques and management" value="Production techniques and management" />
            <Picker.Item label="Mechanical design including the material selection" value="Mechanical design including the material selection" />
            <Picker.Item label="Automotive applications" value="Automotive applications" />
            <Picker.Item label="Aeronautical engineering technology" value="Aeronautical engineering technology" />
            <Picker.Item label="Raw material" value="Raw material" />
            <Picker.Item label="Product design" value="Product design" />
            <Picker.Item label="Processing" value="Processing" />
            <Picker.Item label="Post treatment" value="Post treatment" />
            <Picker.Item label="Application testing" value="Application testing" />
            <Picker.Item label="Recycling" value="Recycling" />
            <Picker.Item label="Power engineering" value="Power engineering" />
            <Picker.Item label="Energy engineering" value="Energy engineering" />
            <Picker.Item label="Automation" value="Automation" />
          </Picker>
          <Text style={styles.formLabel2}> Discipline 3 </Text>
          <Picker
            style={styles.pickerStyle}
            onValueChange={currentCurrency => {this.setState({kernwoord3:currentCurrency})}}>
            <Picker.Item label="Analog Electronics and Design" value="Analog Electronics and Design" />
            <Picker.Item label="Digital Electronics and Design" value="Digital Electronics and Design" />
            <Picker.Item label="Software Development" value="Software Development" />
            <Picker.Item label="Data Science and Engineering" value="Data Science and Engineering" />
            <Picker.Item label="Tele and Data communication" value="Tele and Data communication" />
            <Picker.Item label="Computer Technique, Microcontrollers and Operating Systems" value="Computer Technique, Microcontrollers and Operating Systems" />
            <Picker.Item label="Systems Theory and Signal Processing" value="Systems Theory and Signal Processing" />
            <Picker.Item label="Electronic Design and Interfacing" value="Electronic Design and Interfacing" />
            <Picker.Item label="Structural analysis and design of structures" value="Structural analysis and design of structures" />
            <Picker.Item label="Materials and building technology" value="Materials and building technology" />
            <Picker.Item label="Civil engineering" value="Civil engineering" />
            <Picker.Item label="Construction management and BIM" value="Construction management and BIM" />
            <Picker.Item label="Geomatics" value="Geomatics" />
            <Picker.Item label="Advanced conversion and valorisation processes for waste streams" value="Advanced conversion and valorisation processes for waste streams" />
            <Picker.Item label="Sustainable processing engineering" value="Sustainable processing engineering" />
            <Picker.Item label="Acoustic processing" value="Acoustic processing" />
            <Picker.Item label="Electrochemical technology" value="Electrochemical technology" />
            <Picker.Item label="Membrane technology" value="Membrane technology" />
            <Picker.Item label="Polymer technology" value="Polymer technology" />
            <Picker.Item label="Advanced materials technology" value="Advanced materials technology" />
            <Picker.Item label="Malting and brewing technology" value="Malting and brewing technology" />
            <Picker.Item label="Meat technology" value="Meat technology" />
            <Picker.Item label="Enzyme technology" value="Enzyme technology" />
            <Picker.Item label="Fermentation technology" value="Fermentation technology" />
            <Picker.Item label="Medical bioengineering" value="Medical bioengineering" />
            <Picker.Item label="Molecular biology and ecology" value="Molecular biology and ecology" />
            <Picker.Item label="Molecular diagnostics" value="Molecular diagnostics" />
            <Picker.Item label="Drive systems" value="Drive systems" />
            <Picker.Item label="Automation" value="Automation" />
            <Picker.Item label="Energy conversion" value="Energy conversion" />
            <Picker.Item label="Production techniques and management" value="Production techniques and management" />
            <Picker.Item label="Mechanical design including the material selection" value="Mechanical design including the material selection" />
            <Picker.Item label="Automotive applications" value="Automotive applications" />
            <Picker.Item label="Aeronautical engineering technology" value="Aeronautical engineering technology" />
            <Picker.Item label="Raw material" value="Raw material" />
            <Picker.Item label="Product design" value="Product design" />
            <Picker.Item label="Processing" value="Processing" />
            <Picker.Item label="Post treatment" value="Post treatment" />
            <Picker.Item label="Application testing" value="Application testing" />
            <Picker.Item label="Recycling" value="Recycling" />
            <Picker.Item label="Power engineering" value="Power engineering" />
            <Picker.Item label="Energy engineering" value="Energy engineering" />
            <Picker.Item label="Automation" value="Automation" />
          </Picker>
        <Text style={styles.formLabel}> Keywords</Text>
          <TextInput 
                placeholder="Enter keywords"
                multiline={true}
                onChangeText={(text)=>{this.setState({trefwoorden:text})}}
                style={styles.inputStyle}
            />
      <View>
        <Text>
        {"\n"}
        </Text> 
        <Button style={styles.knop} title='Add Subject!' onPress={()=>{this.submit(id)}}/>
      </View>
      <View>
        <Text>
        {"\n"}
        {"\n"}
        {"\n"}
        </Text>
      </View>
      </ScrollView>
      </SafeAreaView>
     
     );
   
  }
  };

 export default AddOnderwerp;