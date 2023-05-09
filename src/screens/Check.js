import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, withTheme, Surface, Text } from "react-native-paper";
import * as userApi from "../actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

function Check(props) {
  const { theme, navigation } = props;
  const dispatch = useDispatch();

  const { colors } = theme;
  const isSignIn = useSelector((state) => state.user.isSignIn);
  const userData = useSelector((state) => state.user.userData);

  React.useEffect(() => {
    if (isSignIn && userData && userData.loginId) {
      let dataToSend = {
        userName: userData.loginId,
        password: userData.password,
      };
      dispatch(userApi.checkLogin({ dataToSend })).then(({ payload }) => {
        if (payload) {
          navigation.replace("App");
        } else {
          navigation.replace("Login");
        }
      });
    } else {
      navigation.replace("Login");
    }
  }, [isSignIn,userData]);

  return <Surface style={styles.container}></Surface>;
}
export default withTheme(Check);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
