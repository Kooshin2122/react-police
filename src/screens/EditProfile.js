import * as React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Picker,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  withTheme,
  Surface,
  Text,
  Card,
  Title,
  Divider,
} from "react-native-paper";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as userApi from "../actions/UserActions";

export default function Profile(props) {
  const navigation = useNavigation();
  const { route } = props;
  let prevData = {};
  const params = route.params;
  if (params) {
    prevData = params.data;
  }

  console.log(prevData);

  const dispatch = useDispatch();
  const windowWidth = Dimensions.get("window").width;
  const profileList = useSelector((state) => state.user.profileData);
  //   var data = [{ Sname:'srinu', SBirth:'05-05-95', Sex:'Male', Semailid:'srinu95@gmail.com', Scontact:'9988776789',
  //    Pname:'Krishna', Pemailid: 'krish85@gmail.com', Pcontact:'8877665678' }]
  // const [images, setImages] = React.useState([]);
  //   const [stdname, setstdname] = React.useState([]);
  const [fname, setfname] = React.useState(prevData.Fname || "");
  const [lname, setlname] = React.useState(prevData.Lname || "");
  const [mname, setmname] = React.useState(prevData.Mname || "");
  const [phone, setphone] = React.useState(prevData.Phone || "");
   const [userid, setuserid] = React.useState(prevData.user_id || "");
  // const [pname, setpname] = React.useState(prevData.pname || "");
  // const [pemail, setpemail] = React.useState(prevData.pemail || "");
  const [address, setaddress] = React.useState(prevData.Address || "");

  var std = prevData.admission;

  const ProfileUpdate = () => {
    if (!fname) {
      Alert.alert("Please Enter the First Name");
      return;
    }
    if (!lname) {
      Alert.alert("Please Enter the Last Name");
      return;
    }
    if (!mname) {
      Alert.alert("Please Enter Mother Name");
      return;
    }
    if (!phone) {
      Alert.alert("Please Enter Contact Number");
      return;
    }
    if (!address) {
      Alert.alert("Please Enter Address");
      return;
    }
   
    else {
      dispatch(
        userApi.ProfileUpdate({
          fname,
          lname,
          mname,
          phone,
          address,
          userid,
        })
      ).then(({ payload }) => {
        console.log("payload", payload);
        if (payload) {
          Alert.alert("Updated Successfully...!");
          navigation.navigate("ProfileScreen");
        }
      });
    }
  };
  return (
    <ScrollView>
      <Surface style={styles.container}>
        <Card style={{ marginBottom: 5 }}>
          <Card.Content>
            {/* <Image
                                 style = {{ width: 250, height: 250,marginLeft:(windowWidth-282)/2 }}
                                        source={{uri:'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'}}
                                    /> */}

          <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  First Name{" "}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                {/* <Text style={styles.label}>{profileList.Fname}</Text> */}

                <TextInput
            style={styles.label}
            onChangeText={(nextValue) => setfname(nextValue)}
            placeholder="Enter First Name"
            // placeholderTextColor="#8b9cb5"
            placeholderTextColor="#000"
            value={fname}
          />
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Last Name
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                {/* <Text style={styles.label}>{profileList.Lname}</Text> */}
                <TextInput
            style={styles.label}
            onChangeText={(nextValue) => setlname(nextValue)}
            placeholder="Enter Last Name"
            // placeholderTextColor="#8b9cb5"
            placeholderTextColor="#000"
            value={lname}
          />
              </View>
            </View>

            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Mother Name
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                {/* <Text style={styles.label}>{profileList.Mname}</Text> */}
                <TextInput
            style={styles.label}
            onChangeText={(nextValue) => setmname(nextValue)}
            placeholder="Enter Mother Name"
            // placeholderTextColor="#8b9cb5"
            placeholderTextColor="#000"
            value={mname}
          />
              </View>
            </View>
            {/* <View style={[styles.row]}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(nextValue) => setgen(nextValue)}
                placeholder="gen"
                placeholderTextColor="#8b9cb5"
                value={gen}
              />
            </View> */}

          <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Email Id
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.email}</Text>
              </View>
            </View>


            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Contact Number
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                {/* <Text style={styles.label}>{profileList.Phone}</Text> */}
                <TextInput
            style={styles.label}
            onChangeText={(nextValue) => setphone(nextValue)}
            placeholder="Enter Contact Name"
            // placeholderTextColor="#8b9cb5"
            placeholderTextColor="#000"
            value={phone}
          />
              </View>
            </View>

            {/* <View style={[styles.row]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Contact No
                </Text>
              </View>
            </View>
            <View style={[styles.row]}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(nextValue) => setcontact(nextValue)}
                placeholder="contact"
                placeholderTextColor="#8b9cb5"
                value={contact} maxLength={10}
                keyboardType='numeric'
              />
            </View> */}

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Gender 
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.Gender}</Text>
              </View>
            </View>

            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Address
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                {/* <Text style={styles.label}>{profileList.Address}</Text> */}

                <TextInput
            style={styles.label}
            onChangeText={(nextValue) => setaddress(nextValue)}
            placeholder="Enter Address"
            // placeholderTextColor="#8b9cb5"
            placeholderTextColor="#000"
            value={address}
          />
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Police Id 
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.police}</Text>
              </View>
            </View>


            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Address
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.user_id}</Text>
                
              </View>
            </View>

            <Button
              mode="outlined"
              style={{ backgroundColor: "#7DE24E", marginTop: 30 }}
              onPress={() => ProfileUpdate()}
            >
              Update
            </Button>
          </Card.Content>
        </Card>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
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
    padding: 21,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    //flex: 1,
  },
});
