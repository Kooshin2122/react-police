import React, { useState, createRef } from "react";
import { Avatar } from "react-native-paper";
//import axios from "axios";
//import qs from 'qs';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

import { withTheme, Surface, Card, Title, Divider } from "react-native-paper";
import * as userApi from "../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { endpointforadmin } from "../api/endpoints";

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();

  const isSignIn = useSelector((state) => state.user.isSignIn);
  
  const handleSubmitPress = () => {
    // <Image
    //   source={require('"./assets/logo.jpeg"')}
    //   style={{ width: size, height: size, tintColor: color }}
    // />
    if (!userName) {
      Alert.alert("Please fill UserName");
      return;
    }
    if (!Password) {
      Alert.alert("Please fill Password");
      return;
    }

    if (userName != "" && Password != "") {
      let dataToSend = {
        userName: userName,
        password: Password,
      };
      dispatch(userApi.login({ ...dataToSend }));
    }
  };

  React.useEffect(() => {
    if (isSignIn) {
      navigation.replace("App");
    }
  }, [isSignIn]);

  return (
    <View style={styles.mainBody}>
      
     
      <View style={[styles.container, {flexDirection: "column"}]}>
    
      <View style={[styles.imagecontainer,{ flex: 2}]} >
      <Image
        style={styles.tinyLogo}
        source={{
          uri: `${endpointforadmin}/favicon.png`,
        }}
      />
      </View>
      <View style={{ flex: 4}} >
      <Card style={styles.card}>
          <Title style={{ textAlign: "center",fontWeight:'bold' }}>LOGIN AREA</Title>
          <Card.Content>
            <View>
            
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(nextValue) => setUserName(nextValue)}
                  placeholder="Enter Username"
                  placeholderTextColor="#8b9cb5"
                  value={userName}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  secureTextEntry={true}
                  onChangeText={(nextValue) => setPassword(nextValue)}
                  placeholder="Enter Password" //12345
                  placeholderTextColor="#8b9cb5"
                  value={Password}
                />
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
              >
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
            </View>
            
          </Card.Content>
        </Card>
      </View>
    </View>
        
      
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#ccc',
    alignContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent:"center",
    alignContent:'center'
  },
  containertwo:{
    flex: 1,
    padding: 20,
    justifyContent:"center",
    alignContent:'center'
  },
  imagecontainer:{
    justifyContent:"center",
    alignContent:'center',
    paddingVertical:80,
    paddingHorizontal:20,
  },
  tinyLogo: {
    width: 360,
    height: 350,
  },
  buttonStyle: {
    // backgroundColor: "#7DE24E",
    backgroundColor: "#1a1830",
    borderWidth: 0,
    //color: '#FFFFFF',
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 10,
    // marginBottom: 25,
  },
  inputStyle: {
    flex: 1,
    // color: 'white',
    paddingHorizontal:15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
  },
  
  card: {
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    margin:5,
    borderRadius: 10,
  },
  buttonTextStyle: {
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight:'bold',
  },
});
