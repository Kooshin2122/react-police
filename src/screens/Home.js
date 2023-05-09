import * as React from "react";
import {RefreshControl, View, StyleSheet } from "react-native";
import {Button,ScrollView, withTheme, Surface, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as userApi from "../actions/UserActions";

function Home(props) {
  const { theme, navigation } = props;
  const dispatch = useDispatch();
  const [logout,setLogout] = React.useState(false);
  const { colors } = theme;
  const st = useSelector((state) => state)
  const data = useSelector((state) => state.user.userData)

  const isSignIn = useSelector((state) => state.user.isSignIn);
  const userData = useSelector((state) => state.user.userData);
  const profileData = useSelector((state) => state.user.profileData);
  // const wait = (timeout) => {
  //   return new Promise(resolve => setTimeout(resolve, timeout));
  // }
  
  
  //   const [refreshing, setRefreshing] = React.useState(false);
  
  //   const onRefresh = React.useCallback(() => {
  //     setRefreshing(true);
  //     wait(2000).then(() => setRefreshing(false));
  //   }, []);
 
  
  React.useEffect(() => {
    if(logout) {
      if (!isSignIn && !userData.loginId) {
        navigation.replace("Login");
      } 
    }
   
  }, [logout]);

 

  return (
    <Surface style={styles.container}>
       {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      > */}
      <Text style={{ color: colors.primary }}>{data && profileData.stdname}</Text>
      <Text>Home screen</Text>
      {/* <Button
        raised
        theme={{ roundness: 3 }}
        onPress={() => navigation.navigate("HomeSettings")}
      >
        Press me
      </Button> */}
      <Button
        raised
        theme={{ roundness: 3 }}
        onPress={() => dispatch(userApi.logout()).then(() => {
          setLogout(true);
        })}
      >
        Logout
      </Button>
      {/* </ScrollView> */}
    </Surface>
  );
}
export default withTheme(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // scrollView: {
  //   flex: 1,
  //   backgroundColor: 'pink',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
