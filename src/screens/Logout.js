import * as React from "react";
import { RefreshControl, View, StyleSheet } from "react-native";
import {
  Button,
  ScrollView,
  withTheme,
  Surface,
  Text,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as userApi from "../actions/UserActions";

function Logout(props) {
  const { theme, navigation } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userApi.logout()).then(() => {
      navigation.replace("Login");
    });
  }, []);

  return <Surface style={styles.container}></Surface>;
}
export default withTheme(Logout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
