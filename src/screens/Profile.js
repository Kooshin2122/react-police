import * as React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
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
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get("window").width;
  const profileList = useSelector((state) => state.user.profileData);

  console.log('dfsfdsf',profileList.Fname);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      dispatch(userApi.Profile({ userName: profileList.admission }));
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Surface style={styles.container}>
        <Card style={{ marginBottom: 5 }}>
          <Card.Content>
            
            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  First Name{" "}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.Fname}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Last Name
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.Lname}</Text>
              </View>
            </View>

            <View style={[styles.row, { backgroundColor: "#dcdcdc" }]}>
              <View>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                Mother Name
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Text style={styles.label}>{profileList.Mname}</Text>
              </View>
            </View>

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
                <Text style={styles.label}>{profileList.Phone}</Text>
              </View>
            </View>

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

            

            
            {/* <Button
              raised
              theme={{ roundness: 3 }}
              onPress={() =>
                navigation.navigate("EditProfile", {
                  data: profileList,
                })
              }
            >
              Edit Profile
            </Button> */}
            <Button
              mode="outlined"
              style={{ backgroundColor: "#63D5ca",marginVertical:10, }}
              onPress={() =>
                navigation.navigate("EditProfile", {
                  data: profileList,
                })
              }
            >
              Edit Profile
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
