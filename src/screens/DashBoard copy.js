import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView,RefreshControl,Picker,TextInput,Alert,Image,TouchableWithoutFeedback } from "react-native";
import {
  Button,
  withTheme,
  Surface,
  Text,
  Card,
  Title,
  Divider,
} from "react-native-paper";

import * as Dashboardapi from "../actions/DashBoardAction";
import { FontAwesome } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import moment from 'moment';
import { baseEndpoint, endpointforadmin } from "../api/endpoints";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fleet, setFleet] = useState("");

  const profileList = useSelector((state) => state.user.profileData);
  var tpol = profileList.user_id;
  var date = new Date();
  var day = date.getDay();
  var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
  var today= daylist[day];



    useEffect(() => {
      dispatch(Dashboardapi.GetGroup({today}));
    }, []);

    
  const Dashboard = useSelector((state) => state.Dashboard.DashboardData.data);
  const isSignIn = useSelector((state) => state.user.isSignIn);
  
 
    var todaygroup ='';

    if(Dashboard && Dashboard.grouplist!=''){
      todaygroup = Dashboard.grouplist[0].Group
    }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  

  

  return (
    <TouchableWithoutFeedback  accessible={false}>
    <View style={[styles.container, {flexDirection: "column"}]}>
     
      <View style={[styles.imageContainer,{ flex: 1, backgroundColor: "#fff" }]} >
      <Image
        style={styles.tinyLogo}
        source={{
          uri: `${endpointforadmin}/auto1.png`,
        }}
      />
      </View>
      <View style={[styles.textContainer, { flex: 4 ,backgroundColor: "#fff"}]} >
      <Text style = {[styles.policeId,{textAlign:'center' }]}>Police ID: <Text>{tpol}</Text></Text>
      <Text style = {[styles.Group,{textAlign:'center' }]}>Today's Group</Text>
      <Text style={{fontSize:25,textAlign:'center'}}>Group {todaygroup}</Text>
      <Text style = {[styles.Group,{ fontWeight: "bold",textAlign:'center'}]}>Search Fleet</Text>
      <View style={styles.SectionStyle}>
        <TextInput
                  style={styles.inputStyle}
                  onChangeText={(nextValue) => setFleet(nextValue)}
                  placeholder="Enter Fleet Number"
                  placeholderTextColor="#8b9cb5"
                  value={fleet}
                />
                </View>
                <View style={styles.SectionStyle}>
              <Button
            mode="outlined"
            color="#fff"
            style={{
              backgroundColor: "#1a1830",
              width:50,
              flex: 1,
              marginHorizontal:5,
            }}
            onPress={() =>
              navigation.navigate('FleetDetails', {
                paramKey: fleet,
                ParamValue:todaygroup,
              })
            }
          >
            Search
          </Button>
          
          <Button 
          color= '#fff'
          style={{
            backgroundColor: "#1a1830",
            width:130
          }}
          onPress={() => navigation.navigate('BarCodeScanner', {
                paramKey: fleet,
                ParamValue:today,
                
                
              }) } >Scan</Button>
          
          
          </View>
      </View>
      </View>
    
      </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:"center",
    alignContent:'center',
  },
  imageContainer:{
    paddingVertical:50,
    justifyContent:"center",
    alignContent:'center',
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  textContainer:{
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  tinyLogo:{
    width: 100,
    height: 120,
     marginHorizontal:110,
    justifyContent:"center",
    alignContent:'center',
  },

  SectionStyle: {
    flexDirection: "row",
    height: 50,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    // margin: 10,
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
  },
  inputStyle: {
    flex: 1,
    height:40,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  policeId:{
    fontWeight: "bold",
    paddingTop:25,
    fontSize:25,
  },
  Group:{
    fontWeight: "bold",
    fontSize:25,
  },
   
  
});