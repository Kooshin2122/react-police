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

  var pid = profileList.user_id; 

  //console.log(Tracklist);



  if(Tracklist){

      var date = Tracklist.track[0].Date;

      var Cred = Tracklist.track[0].Red;

      var Cgreen = Tracklist.track[0].Green;

      var Corange = Tracklist.track[0].Orange;

      var total = parseInt(Cred)+parseInt(Cgreen)+parseInt(Corange);
  }

  useEffect(() => {
    dispatch(Trackapi.GetDetails({pid}));
  }, []);
  

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
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
          if (Tracklist) {
            return (
              <>
                <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Date
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Tracklist.track[0].Date}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Total Scan
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{total}</Text>
                  </View>
                </View>
                <View style={[styles.row, { backgroundColor: "#ff0000" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Red
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Tracklist.track[0].Red}</Text>
                  </View>
                </View>

                <View style={[styles.row, { backgroundColor: "#00ff00" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Green
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Tracklist.track[0].Green}</Text>
                  </View>
                </View>

                <View style={[styles.row, { backgroundColor: "#ffa500" }]}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Orange
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Tracklist.track[0].Orange}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View>
                    <Text style={[styles.label, { fontWeight: "bold" }]}>
                      Credits
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={styles.label}>{Tracklist.track[0].Red}</Text>
                  </View>
                </View>               
              </>
            );
          }
        })()}
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

    marginHorizontal: 100,
    height: 130,
    width: 100,
  },
});

