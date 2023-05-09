import React, { useState, createRef } from "react";

import { View, StyleSheet, RefreshControl, ScrollView,Alert } from "react-native";
import {
  Button,
  withTheme,
  Surface,
  Text,
  Card,
  Title,
  Divider,
  
} from "react-native-paper";
import * as FleetDetailsApi from "../actions/FleetDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { endpointforadmin } from "../api/endpoints";
import { Redirect } from 'react-router';
import * as userApi from "../actions/UserActions";
import { baseEndpoint } from "../api/endpoints";
import * as Dashboardapi from "../actions/DashBoardAction";

const optionsPerPage = [2, 3, 4];
const number = 0;

const DTestComponent = ({ route }) => {
  //const { theme, navigation } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profileList = useSelector((state) => state.user.profileData);

  const Dashboard = useSelector((state) => state.Dashboard.DashboardData.data);

  const Fleetlist = useSelector((state) => state.FleetDetails.FleetDetailsData.data);

 // console.log('dashboard',Dashboard);

 var Todaysgroup = '';

  if(Dashboard && Dashboard.grouplist!=null){

    Todaysgroup=Dashboard.grouplist[0].Group;

  }
  
  //console.log(Fleetlist);
    // if(Fleetlist){
    // console.log(Fleetlist.Fleetdata[0].Reason);
    // }


    React.useEffect(()=>{
      if(Fleetlist && Fleetlist.Fleetdata==null){

        Alert.alert("Fleet Number Doesn't Exits!");
        navigation.navigate('DashBoard');

      }

    },[Fleetlist])

   var fleetnumber = route.params.paramKey;

   var todayvalue = route.params.ParamValue;

   //console.log(todayvalue);

   var policeid = profileList.user_id;

  //console.log(tvalue);

  React.useEffect(() => {
    dispatch(FleetDetailsApi.GetDetails({ fleetnumber,todayvalue }));
  }, []);

   const test = useSelector((state) => state.FleetDetails.FleetDetailsData.data);

  

  if (test) {
//console.log('hiii',Dashboard)
   // var TodaysGroup = Dashboard.TodaysData[0].Group;

    var FleetGroup = test.Fleetdata ? test.Fleetdata[0].FleetGroup : '';

    var fleet = test.Fleetdata ? test.Fleetdata[0].Fleetnumber : '';

    var pol = profileList.user_id;

    var chrg = test.Fleetdata ? test.Fleetdata[0].Reason : '';

  }


  var violationreason = ''; 

  var violationamount = ''; 


  const buttondisplay = () =>{

   if((Fleetlist.Fleetdata[0].Display=='Yes')){
     return(
       <>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', marginTop: 30 }}>

            <Button
              mode="outlined"
              style={{
                backgroundColor: "#7DE24E",
                // borderRadius: 50,
                marginHorizontal: 60,
                width: 100,
              }}
              onPress={() => Charge()}
            >
              Charge
            </Button>

              <Button
                mode="outlined"
                style={{
                  backgroundColor: "#7DE24E",
                  flex: 1,
                  // borderRadius: 50,
                  marginHorizontal: 60,
                  width: 200,
                }}
                onPress={() =>
                  navigation.navigate('Payment', {
                    paramKey: fleet,
                    ParamReason: violationreason,
                    Paramamount: violationamount
                  })
                }
              >
                Pay
              </Button>
          </View>
       </>
     );
   }
    

  }

  
  
  const chargebutton = () =>{
    
    if((Fleetlist.Fleetdata[0].Reason== 4) || (Fleetlist.Fleetdata[0].Reason== 5) || (Fleetlist.Fleetdata[0].Reason== 3)){
      return(
        <>
         <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', marginTop: 30 }}>
 
             <Button
               mode="outlined"
               style={{
                 backgroundColor: "#ff0000",
                 marginHorizontal: 60,
                 width: 250,
               }}

               onPress={() =>
                navigation.navigate('ChargePayment', {
                  paramKey: fleet,
                  ParamCharge: chrg,
                  ParamReason: violationreason,
                  Paramamount: violationamount
                })
              }
             >
               Charge Pay
             </Button>
           </View>
        </>
      );
    }
  
  }

  // if(Fleetlist && Fleetlist.Fleetdata!='null'){
  //   console.log(Fleetlist.Fleetdata[0].Reason);
  // }

  

  const validation = () => {
    if (Fleetlist) {
      if ((Fleetlist.Fleetdata[0].Groupmatch=='NotMatched') && (Fleetlist.Fleetdata[0].Payment == "Expired")) {
        violationreason = "Payment and Group Violation";
        violationamount = "$22";
                    return (

                      <>
                        <View style={[styles.row, { backgroundColor: "red", marginTop: 15 }]}>
                          <View>
                            <Text style={[styles.label, { fontWeight: "bold", color: "#fff" }]}>
                              Reason
                            </Text>
                          </View>
                          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                            <Text style={styles.label, { color: "#fff", paddingTop: 10 }}> Group Violation And payment Violation </Text>
                          </View>
                        </View>

                        <View style={[styles.row, { backgroundColor: "red", marginTop: 15 }]}>
                          <View>
                            <Text style={[styles.label, { fontWeight: "bold", color: "#fff" }]}>
                              Penality
                            </Text>
                          </View>
                          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                            <Text style={styles.label, { color: "#fff", paddingTop: 10 }}> yes-$7 and $15  </Text>

                          </View>
                        </View>

                        <View style={[styles.row, { backgroundColor: "#dcdcdc", marginTop: 20, TextAlign: "center" }]}>
                          <View>
                            <Text style={styles.label, { color: "red", fontWeight: "bold", paddingVertical: 15, paddingLeft: 5, fontWeight: "bold", fontSize: 15 }}> Your Fleet Payment Has Been Expired.You Need To Pay A Minimunm Amount Of $15.You Fleet Belongs To Another Group, Hence Need to Pay Penality.Group Violatoin Penality $7 </Text>
                          </View>
                        </View>
                        {chargebutton()}
                      </>
                    );
      } else {
        if (Fleetlist.Fleetdata[0].Payment == "Expired") {
          violationreason = 'Payment Violation';
          violationamount = '$15';
                      return (
                        <>
                          <View style={[styles.row, { backgroundColor: "red", marginTop: 15 }]}>
                            <View>
                              <Text style={[styles.label, { fontWeight: "bold", color: "#fff" }]}>
                                Reason
                              </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                              <Text style={styles.label, { color: "#fff", paddingTop: 10, fontWeight: "bold", fontSize: 15 }}> Payment Violation</Text>
                              {/* <Text>Penality: yes-$7 </Text> */}
                            </View>
                          </View>

                          <View style={[styles.row, { backgroundColor: "red", marginTop: 15 }]}>
                          <View>
                            <Text style={[styles.label, { fontWeight: "bold", color: "#fff" }]}>
                              Penality
                            </Text>
                          </View>
                          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                            <Text style={styles.label, { color: "#fff", paddingTop: 10 }}>  $15  </Text>

                          </View>
                        </View>

                        <View style={[styles.row, { backgroundColor: "#dcdcdc", marginTop: 20, TextAlign: "center" }]}>
                          <View>
                            <Text style={styles.label, { color: "red", fontWeight: "bold", paddingVertical: 15, paddingLeft: 5, fontWeight: "bold", fontSize: 15 }}> Your Fleet Payment Has Been Expired.You Need To Pay A Minimunm Amount Of $15  </Text>
                          </View>
                        </View>
                        {chargebutton()}
                        </>
                      );
        }
        else if (Todaysgroup!=Fleetlist.Fleetdata[0].FleetGroup) {
          var tet =Fleetlist.Fleetdata[0].Color;
          console.log(tet);

          if(tet=='#ffa500'){
            var tresaon = "No Violation For Today";
            var tamount = "Penality Paid";
            var desc = "Your Fleet Blongs To Another Group,Penality Paid for Today";
          }else{
            var tresaon = "Group Violation";
            var tamount = "Yes-$7";
            var desc = "Your Fleet Belongs To Another Group,Hence Need To Pay Penality.Group Violation Penality $7";
          }
          violationreason = 'Group Violation';
          violationamount = '$7';
                      return (
                        <>
                          <View style={[styles.row, { backgroundColor: tet, marginTop: 15 }]}>
                            <View>
                              <Text style={[styles.label, { fontWeight: "bold", color: "#fff" }]}>
                                Reason
                              </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                              <Text style={styles.label, { color: "#fff", paddingTop: 10, fontWeight: "bold", fontSize: 15 }}> {tresaon} </Text>
                              {/* <Text>Penality: yes-$7 </Text> */}
                            </View>
                          </View>

                          <View style={[styles.row, { backgroundColor: tet, marginTop: 15 }]}>
                            <View>
                              <Text style={[styles.label, { fontWeight: "bold", color: "#fff" }]}>
                                Penality
                              </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                              <Text style={styles.label, { color: "#fff", paddingTop: 10, fontWeight: "bold", fontSize: 20 }}> {tamount}  </Text>

                            </View>
                          </View>

                          <View style={[styles.row, { backgroundColor: tet, marginTop: 20, TextAlign: "center" }]}>
                            <View>
                              <Text style={styles.label, { color: "#fff", fontWeight: "bold", paddingVertical: 15, paddingLeft: 5 }}> {desc} </Text>
                            </View>
                          </View>
                        </>
                      );
        }
        else {
          //console.log('else');
          // var tet =Fleetlist.Fleetdata[0].Color;
          return (
            <>

                      <View style={[styles.row, { backgroundColor: "#00ff00", marginTop: 15 }]}>
                      <View>
                        <Text style={[styles.label, { fontWeight: "bold", color: "black" }]}>
                          Reason
                        </Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                        <Text style={styles.label, { color: "black", paddingTop: 10, fontWeight: "bold", fontSize: 15 }}> No Violation </Text>
                      </View>
                    </View>

                    <View style={[styles.row, { backgroundColor: "#00ff00", marginTop: 15 }]}>
                            <View>
                              <Text style={[styles.label, { fontWeight: "bold", color: "black" }]}>
                                Penality
                              </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                              <Text style={styles.label, { color: "black", paddingTop: 10, fontWeight: "bold", fontSize: 20 }}> None  </Text>
                            </View>
                          </View>

                      </>
          );
        }
      }
    }
  }

  const Charge = () => {
    //Alert.alert("Hello");
      dispatch(
        FleetDetailsApi.ChargeInsert({
          fleet,
          policeid,
          violationreason,
        })
      ).then(({ payload }) => {
        console.log("payload", payload);
        if (payload) {
          Alert.alert("Fleet Charged Sucessfully");
          navigation.navigate('DashBoard')
        }
      });
    
  };

  return (
    <Surface style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Cover
            source={{
              uri: `${endpointforadmin}/auto12.png`,
            }}
            style={styles.logo}
          />
        </Card>

        {(() => {
          if (Fleetlist && Fleetlist.Fleetdata && Fleetlist.Fleetdata.length > 0) {
            return (
              <>
                <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Fleet Number
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Fleetlist.Fleetdata[0].Fleetnumber}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Fleet Driver
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Fleetlist.Fleetdata[0].FleetDriver}</Text>
                  </View>
                </View>
                <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Fleet Owner
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Fleetlist.Fleetdata[0].FleetOwner}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Fleet Nominee
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Fleetlist.Fleetdata[0].FleetNominee}</Text>
                  </View>
                </View>

                <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Fleet Expiry Date
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Fleetlist.Fleetdata[0].FleetExpiryDate}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Police Id
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{policeid}</Text>
                  </View>
                </View>

                <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Fleet Group
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Fleetlist.Fleetdata[0].FleetGroup}</Text>
                  </View>
                </View>

                {validation()}

                {buttondisplay()}

                {/* {(() => {
                  if (Fleetlist) {
                    return (

              );
              }
              })()} */}

              

                {/* <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', marginTop: 30 }}>

                  <Button
                    mode="outlined"
                    style={{
                      backgroundColor: "#7DE24E",
                      // borderRadius: 50,
                      marginHorizontal: 60,
                      width: 100,
                    }}
                    onPress={() => Charge()}
                  >
                    Charge
                  </Button>

                  <Button
                    mode="outlined"
                    style={{
                      backgroundColor: "#7DE24E",
                      flex: 1,
                      // borderRadius: 50,
                      marginHorizontal: 60,
                      width: 200,
                    }}
                    onPress={() =>
                      navigation.navigate('Payment', {
                        paramKey: fleet,
                        // ParamReason: vreason,
                        // Paramamount: vamount
                      })
                    }
                  >
                    Pay
                  </Button>
                </View> */}



                {/* <View style={styles.SectionStyle}>
          <Button
            mode="outlined"
            style={{
              backgroundColor: "#7DE24E",
              flex: 1,
              borderRadius: 50,
              marginHorizontal:60,
              width:200,
            }}
            onPress={() =>
              navigation.navigate('Penality', {
                paramKey: tdata,
              })
            }
          >
            Penality
          </Button>
        </View> */}
              </>
            );
          }
        })()}
      </ScrollView>
    </Surface>
  );
};

export default withTheme(DTestComponent);

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
  SectionStyle: {
    marginVertical: 10,
  },
  logo: {

    marginHorizontal: 100,
    height: 130,
    width: 100,
  },
});
