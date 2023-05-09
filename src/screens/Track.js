import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView,RefreshControl,Picker,TextInput,Alert,Image } from "react-native";
import {
  Button,
  withTheme,
  Surface,
  Text,
  Card,
  Title,
  Divider,
  DataTable,
} from "react-native-paper";
import * as Trackapi from "../actions/TrackAction";

import { baseEndpoint, endpointforadmin } from "../api/endpoints";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const Tracklist = useSelector((state) => state.Track.TrackData.data);
  const profileList = useSelector((state) => state.user.profileData);
  const isSignIn = useSelector((state) => state.user.isSignIn);

  console.log(Tracklist);

  var pid = profileList.user_id; 

  var total='';

  if(Tracklist){

      var date = Tracklist.track[0].Date;

      var Cred = Tracklist.track[0].Red;

      var Cgreen = Tracklist.track[0].Green;

      var Corange = Tracklist.track[0].Orange;

       total = parseInt(Cred)+parseInt(Cgreen)+parseInt(Corange);
  }

  useEffect(() => {
    dispatch(Trackapi.GetDetails({pid}));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      dispatch(Trackapi.GetDetails());
      setRefreshing(false);
    });
  }, []);
  

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };


  return (
    <Surface style={styles.container}>
      <ScrollView>
      <Card style={{paddingVertical:5,marginVertical:10,marginHorizontal:8}}>
          <Card.Cover
            source={{
              uri: `${endpointforadmin}/auto1.png`,
            }}
            style={styles.logo}
          />
        </Card>

        {/* {(() => {
         // if (Tracklist) { */}
            {/* console.log('Tracklist',Tracklist); */}
            {
              Tracklist && Tracklist.track.length > 0 ?
              Tracklist.track.map((item, index) => {
                return (
                  <Card style = {{marginBottom:5,marginHorizontal:8}} key={index}>
                  {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
                  <Card.Content>
                  <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
                <View>
                  <Text style={[styles.label, { fontWeight: "bold" }]}>
                    Date
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                  <Text style={styles.label}>{item.Date}</Text>
                </View>
              </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Total Scan
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{total= parseInt(item.Red)+parseInt(item.Green)+parseInt(item.Orange)}</Text>
              </View>
            </View>
            <View style={[styles.row, { backgroundColor: "#ff0000" }]}>
            <View>
              <Text style={[styles.label, { fontWeight: "bold" }]}>
                Red
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <Text style={styles.label}>{item.Red}</Text>
            </View>
          </View>      
          <View style={[styles.row, { backgroundColor: "#00ff00" }]}>
            <View>
              <Text style={[styles.label, { fontWeight: "bold" }]}>
                Green
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <Text style={styles.label}>{item.Green}</Text>
            </View>
          </View> 
          <View style={[styles.row, { backgroundColor: "#ffa500" }]}>
          <View>
            <Text style={[styles.label, { fontWeight: "bold" }]}>
              Orange
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
            <Text style={styles.label}>{item.Orange}</Text>
          </View>
        </View>
       

      <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                 Payments
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{item.Payment}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                 Charged
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{item.Charged}</Text>
              </View>
            </View>


            <View style={styles.row}>
        <View>
          <Text style={[styles.label, { fontWeight: "bold" }]}>
            Credits
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <Text style={styles.label}>{item.Payment}</Text>
        </View>
      </View>

     </Card.Content>    
       </Card>
  );
})
:
false
}
        {/* //   }
        // })()} */}
      </ScrollView>
    </Surface>
  );
};


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
    height: 130,
    width: 100,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignSelf:'center'
  },
});

