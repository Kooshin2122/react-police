import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View,RefreshControl, ScrollView,Picker,TextInput,TouchableOpacity,Image,Alert,Pressable} from "react-native";
import {
  Button,
  withTheme,
  Surface,
  Text,
  Card,
  Title,
  Divider,
} from "react-native-paper";
import * as Paymentapi from "../actions/PaymentAction";
import { FontAwesome,Foundation } from "@expo/vector-icons";
import * as endPoints from "../api/endpoints";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions  from 'expo-permissions';
import { useDispatch, useSelector } from "react-redux";
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';

export default function App({ route }) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  //console.log(date);

  var presentDate = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)

  
  var pfleet = route.params.paramFleet;

  var powner = route.params.ParamOwner;

  var pdriver = route.params.ParamDriver;

  var pamount = route.params.ParamAmount;

  var preason = route.params.ParamReason;

  var evc = route.params.ParamEvc;

  var effective = route.params.Paramedate;


  const Paymentlist = useSelector((state) => state.Payment.PaymentData.data);

  const profileList = useSelector((state) => state.user.profileData);

 

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // React.useEffect(() => {
  //   dispatch(Paymentapi.GetDetails({pfleet,}));
  // }, []);


  // if(Paymentlist){

  //     var evcnymber = Paymentlist.fleetdetails[0].Drivernumber;

  //     var fleetnumber = Paymentlist.fleetdetails[0].Fleetnumber;

  //     var owner = Paymentlist.fleetdetails[0].Owner;

  //     var driver = Paymentlist.fleetdetails[0].Driver;

  //     var police = profileList.user_id; 
      
  // }

  
  return (
    
      <Surface style={styles.container}>
        <ScrollView>
        {(() => {
              if (pfleet) {
                return (
          <>
                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>Fleet Number</Text>
                </View>
                <View>
                <Text style={[styles.label]}>{pfleet}</Text>
                </View>
                </View>
                <View style={styles.Altcell}>
                <View>
                <Text style={[styles.Altlabel, {fontWeight: "bold"}]}>Owner</Text>
                </View>
                <View>
                <Text style={[styles.Altlabel]}>{powner}</Text>
                </View>
                </View>
                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>Driver</Text>
                </View>
                <View>
                <Text style={[styles.label]}>{pdriver}</Text>
                </View>
                </View>
                <View style={styles.Altcell}>
                <View>
                <Text style={[styles.Altlabel, {fontWeight: "bold"}]}>Police</Text>
                </View>
                <View>
                <Text style={[styles.Altlabel]}>{profileList.police}</Text>
                </View>
                </View>
                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>Reason</Text>
                </View>
                <View>
                <Text style={[styles.label]}>{preason}</Text>
                </View>
                </View>
                <View style={styles.Altcell}>
                <View>
                <Text style={[styles.Altlabel, {fontWeight: "bold"}]}>Amount</Text>
                </View>
                <View>
                <Text style={[styles.Altlabel]}>{pamount}</Text>
                </View>
                </View>
                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>EVC Number</Text>
                </View>
                <View>
                <Text style={styles.label}>{evc}</Text>
                </View>
                </View>
                <View style={styles.Altcell}>
                <View>
                <Text style={[styles.Altlabel, {fontWeight: "bold"}]}>Present Date</Text>
                </View>
                <View>
                <Text style={[styles.Altlabel]}>{presentDate}</Text>
                </View>
                </View>
                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>Effective Date</Text>
                </View>
                <View>
                <Text style={[styles.label]}>{effective}</Text>
                </View>
                </View>

                <View style={styles.SectionStyle}>
                 <Button
                  mode="outlined"
                  color="#fff"
                   style={{
                   backgroundColor: "#1a1830",
                   flex: 1,
                   borderRadius: 50,
                   marginVertical:20,
                  //  marginHorizontal:60,
                  alignSelf:'center',
                   width:200,
                        }}
                   onPress={() => navigation.navigate('DashBoard')}
                      >Ok</Button>
                      </View>


            </>
            );
      }
    })()}
            </ScrollView>   
      </Surface>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ecf0f1",
  },
  th: {
    fontWeight: "bold",
    fontSize: 14,
  },
  label_left: {
    fontSize: 14,
  },
  cell:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    // backgroundColor:'#1a1830' #352c54 
    backgroundColor:'#1a1830',

  },
  Altcell:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    marginVertical:5
    
  },
  label: {
    color:'#fff',
    fontSize: 15,
    padding: 10,
  },
  Altlabel:{
    color:'#000',
    fontSize: 15,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    //flex: 1,
  },
  scrollView: {
    // flex: 1,
    //backgroundColor: 'pink',
    // alignItems: 'center',
    //  justifyContent: 'center',
  },
});
