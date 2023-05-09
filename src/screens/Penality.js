import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View,RefreshControl, ScrollView,Picker } from "react-native";
import {
  Button,
  withTheme,
  Surface,
  Text,
  Card,
  Title,
  Divider,
} from "react-native-paper";
import * as Penalityapi from "../actions/PenalityAction";
import { FontAwesome } from "@expo/vector-icons";
import * as endPoints from "../api/endpoints";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function App({ route }) {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  var pdata = route.params.paramKey;

  const [reason, setReason] = React.useState("");

  const Penalitylist = useSelector((state) => state.Penality.PenalityData.data);

  //console.log(Penalitylist);

  const test = useSelector((state) => state.Penality.PenalityData.data);

 if(test){
   var a = Penalitylist.fleetdetails[0].fleetNumber;
   //console.log(a);
 }


  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  React.useEffect(() => {
    dispatch(Penalityapi.GetDetails({ pdata }));
  }, []);

  
  const violation = () => {
    if (Penalitylist) {
      return Penalitylist.Violationdrop.map((x, i) => {
        return <Picker.Item label={x.violationsReason} key={i} value={x.id} />;
      });
    }
  };

  return (
    
      <Surface style={styles.container}>
        <ScrollView>
        {(() => {
              if (Penalitylist) {
                return (
          <>
      <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Fleet Number
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Penalitylist.fleetdetails[0].fleetNumber}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Fleet Model
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Penalitylist.fleetdetails[0].Fleetmodel}</Text>
              </View>
            </View>

            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Owner
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Penalitylist.fleetdetails[0].Owner}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Color
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Penalitylist.fleetdetails[0].Color}</Text>
              </View>
            </View>

             <View style={[styles.SectionStyle,{backgroundColor: "#dcdcdc"}]}>
             <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Reason
                </Text>
              </View>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={reason}
              onValueChange={(itemValue, itemIndex) => {
                
                setReason(itemValue);
              }}
            >
              <Picker.Item
                color="#8b9cb5"
                label="--select Reason--"
                value=""
              />
              {violation()}
            </Picker>
          </View>
        </View> 

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Count
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{Penalitylist.violation[0].count}</Text>
              </View>
            </View>


            <View style={styles.SectionStyle}>
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
              navigation.navigate('Payment', {
                paramKey: a,
                paramValue:reason,
              })
            }
          >
            Penality
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
