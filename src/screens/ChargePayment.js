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
import * as ChargePaymentapi from "../actions/ChargePaymentAction";
import { FontAwesome,Foundation } from "@expo/vector-icons";
import * as endPoints from "../api/endpoints";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from "react-redux";
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
const _ = require("lodash");
export default function App({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [evc, setEvc] = React.useState("");

  const [disable, setDisable] = React.useState(false);
  
  const [date, setDate] = React.useState('');

  const [fleet, setFleet] = React.useState('');
  

  //console.log(date);

  var presentDate = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)

  //console.log(presentDate);

  // var currentDate = moment().format('DD-MM-YYYY');

  // var futureMonth = moment().add(4, 'M').format('DD-MM-YYYY');

  // var new_date = moment(futureMonth, "DD-MM-YYYY").add(1, 'days').format('DD-MM-YYYY');

// //var nndt = futureMonth;

// var tttg = futureMonth.setDate(futureMonth.getDate() + 5);

 //console.log(fftt);

  

  //console.log('Test',charge);
  
  var pdata = route.params.paramKey;

  var violationreason = route.params.ParamReason;
  var violationamount = route.params.Paramamount;

  const Paymentlist = useSelector((state) => state.ChargePayment.ChargePaymentData.data);

  //console.log('dfsdfasd',Paymentlist);

  const profileList = useSelector((state) => state.user.profileData);
 // const [image, setImage] = React.useState({});


  const [images, setImages] = React.useState([]);

  const pickFromCamera   = async ()=>{
    const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
       let data = await ImagePicker.launchCameraAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[1,1],
          quality:0.5
        })
        //console.log(data);
       var imagedata =  await MediaLibrary.createAssetAsync(data.uri);
      setImages(imagedata);
      console.log(imagedata);
    }else{
        Alert.alert("You need to give permission");
    }
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  React.useEffect(() => {
    dispatch(ChargePaymentapi.GetDetails({pdata}));
  }, []);

    React.useEffect(() => {
    if(Paymentlist){

      let evcnymberNew = Paymentlist.ChargePaymentdata[0].EVCnumber;
      setEvc(evcnymberNew)
    }
      //setEvc(evcnymber);
  }, [Paymentlist]);



   var fleetnumber="";

  if(Paymentlist){

      var evcnymber = Paymentlist.ChargePaymentdata[0].EVCnumber;
      //setEvc(evcnymber);
        
       fleetnumber = Paymentlist.ChargePaymentdata[0].Fleetnumber;

      var owner = Paymentlist.ChargePaymentdata[0].FleetOwner;

      var driver = Paymentlist.ChargePaymentdata[0].FleetDriver;

      var police = profileList.police; 

      var chargeid = Paymentlist.ChargePaymentdata[0].ChargeId;
      
  }

  
  // React.useEffect(() => {
    if(fleetnumber){
      dispatch(ChargePaymentapi.GetDatedetails({fleetnumber}));
    }
    
  // }, []);

  const Edatelist = useSelector((state) => state.Payment.Datedata.data);

  var EffectiveDate="";


  // if(violationreason == 'Group Violation'){
  //   EffectiveDate = presentDate;
  // }else if(Edatelist && Edatelist.Datedata){
  //   var Edate = Edatelist.Datedata[0].Date;
  //   if(Edate!='0000-00-00'){
  //         EffectiveDate = moment(Edate, "YYYY-MM-DD").add(1, 'days').format('YYYY-MM-DD');
  //       }
  // }


  if(violationreason == 'Group Violation'){
    EffectiveDate = presentDate;
  }else if(Edatelist && Edatelist.Datedata!=null){
    var Edate = Edatelist.Datedata[0].Date;
    if(Edate!='0000-00-00'){
          EffectiveDate = moment(Edate, "YYYY-MM-DD").add(1, 'days').format('YYYY-MM-DD');
        }else{
          EffectiveDate = presentDate;
        }
  }else{
    EffectiveDate = presentDate;
  }

 

  const ChargePayment = () => {
    //Alert.alert("Hello");
    if (!evc) {
      Alert.alert("Please Enter the EVC NUmber");
      return;
    }
    if (_.isEmpty(images)) {
      Alert.alert("Please Take Photo Copy From the Camera");
      return;
    } 
    else {
      setDisable(true);
      dispatch(
        ChargePaymentapi.ChargePaymentInsert({
          evc,
          images,
          fleetnumber,
          owner,
          driver,
          police,
          violationamount,
          violationreason,
          evcnymber,
          chargeid,
          EffectiveDate,
          
        })
      ).then(({ payload }) => {
        console.log("payload", payload);
        if (payload) {
          Alert.alert("Payment Successfully...!");
          navigation.navigate('Reason', {
            paramFleet: fleetnumber,
            ParamOwner: owner,
            ParamDriver:driver,
            ParamAmount:violationamount,
            ParamReason:violationreason,
            ParamEvc:evcnymber,
            Paramedate:EffectiveDate,
          })
        }
      });
    }
  };
  
  return (
    
      <Surface style={styles.container}>
        <ScrollView>
        {(() => {
              if (Paymentlist) {
                return (
          <>

                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>Fleet Number</Text>
                </View>
                <View>
                <Text style={[styles.label]}>{Paymentlist.ChargePaymentdata[0].Fleetnumber}</Text>
                </View>
                </View>

                <View style={styles.Altcell}>
                <View>
                <Text style={[styles.Altlabel, {fontWeight: "bold"}]}>Owner</Text>
                </View>
                <View>
                <Text style={[styles.Altlabel]}>{Paymentlist.ChargePaymentdata[0].FleetOwner}</Text>
                </View>
                </View>

                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>Driver</Text>
                </View>
                <View>
                <Text style={[styles.label]}>{Paymentlist.ChargePaymentdata[0].FleetDriver}</Text>
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
                <Text style={[styles.label]}>{violationreason}</Text>
                </View>
                </View>

                <View style={styles.Altcell}>
                <View>
                <Text style={[styles.Altlabel, {fontWeight: "bold"}]}>Amount</Text>
                </View>
                <View>
                <Text style={[styles.Altlabel]}>{violationamount}</Text>
                </View>
                </View>

                <View style={styles.cell}>
                <View>
                <Text style={[styles.label,{ fontWeight: "bold"}]}>EVC Number</Text>
                </View>
                <View>
                <TextInput
            style={styles.label}
            onChangeText={(nextValue) => setEvc(nextValue)}
            placeholder="Enter EVC"
            // placeholderTextColor="#8b9cb5"
            placeholderTextColor="#000"
            keyboardType='numeric'
            maxLength={10}
            value={evc}
          />
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
                <Text style={[styles.label]}>{EffectiveDate}</Text>
                </View>
                </View>

            {/* <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Fleet Number
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Paymentlist.ChargePaymentdata[0].Fleetnumber}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Owner
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Paymentlist.ChargePaymentdata[0].FleetOwner}</Text>
              </View>
            </View>

            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Driver
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Paymentlist.ChargePaymentdata[0].FleetDriver}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Police
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.user_id}</Text>
              </View>
            </View>

            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Reason 
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{violationreason}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Amount
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{violationamount}</Text>
              </View>
            </View>

        <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                EVC Number 
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <TextInput
            style={styles.inputStyle}
            onChangeText={(nextValue) => setEvc(nextValue)}
            placeholder="Enter EVC"
            placeholderTextColor="#8b9cb5"
            keyboardType='numeric'
            maxLength={10}
            value={evc}
          />
              </View>
            </View>


            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Present Date
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{presentDate}</Text>
              </View>
            </View> */}

            {/* <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        /> */}

            {/* <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Effective Date
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <Text>{EffectiveDate}</Text>
              
              </View>
            </View> */}

          <View 
              style={{
                flex: 1, alignItems: 'center',
                backgroundColor:"#87CEEB", 
                marginVertical:10,
                marginHorizontal:60, 
                borderRadius: 50,
                width:200, 
                justifyContent: 'center' }}
            >
                <Button icon="camera"
                onPress={()=>pickFromCamera()}
                
                >Camera</Button>
              </View>

            <View style={styles.SectionStyle}>
          <Button
            mode="outlined"
            disabled = {disable}
            style={{
              backgroundColor: "#7DE24E",
              flex: 1,
              borderRadius: 50,
              marginHorizontal:60,
              width:200,
            }}
            onPress={() => ChargePayment()}
          >
            Confirm
          </Button>
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
