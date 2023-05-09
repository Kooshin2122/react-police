import React from "react";
import { View, StyleSheet, Platform, Dimensions, Image } from "react-native";

import {
  IconButton,
  Colors,
  Title,
  withTheme,
  Surface,
  Text,
} from "react-native-paper";
export default function DrawerBrand(props) {
  return (
    // <Surface style={[styles.logo, { flexDirection: "row" }]}>
    //   <Image source={require("../../assets/projecttitle.jpg")} />
    // </Surface>

    <Surface style={[styles.logo]}>
      <Text style={styles.thick}>POLICE</Text>
      {/* <Text style={styles.light}>Title</Text> */}
    </Surface>
  );
}
const styles = StyleSheet.create({
  // logo: {
  //   flexDirection: "column",
  //   flexWrap: "nowrap",
  //   elevation: 3,
  //   padding: 20,
  //   shadowOpacity: 0.3,
  //   shadowRadius: 3,
  //   shadowOffset: {
  //     height: 1,
  //     width: 0,
  //   },
  // },
  logo: {
    // flexDirection: "column",
    // flexWrap: "nowrap",
    elevation: 3,
    padding: 20,
    backgroundColor:'#1a1830',
    
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  thick: {
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing:10,
    flex: 1,
    textAlign: "right",
    alignSelf: "center",
    color:'#fff',
  },
});
