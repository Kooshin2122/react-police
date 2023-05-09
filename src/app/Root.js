// import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, StatusBar as RNStatusBar, Appearance } from "react-native";
import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import {
  DefaultTheme,
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import * as commonActions from "../reducer/CommonReducer";
import useColorScheme from "../hooks/useColorScheme";

import Navigation from "../navigation";

export default function Root() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme) {
      dispatch(commonActions.updateTheme(colorScheme));
    }
  }, []);
  const themeStyle = useSelector((state) => state.common.theme);

  const theme =
    themeStyle === "dark"
      ? { 
        ...PaperDarkTheme, 
        dark: themeStyle === "dark" ? true : false,
        colors:{
          ...PaperDarkTheme.colors,
          primary: "#dcdcdc",
        },
       }
      : { 
       
        ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4D5656'
  }
       };
  return (
    <>
      <PaperProvider theme={theme}>
        <ApplicationContainer themeStyle={themeStyle} theme={theme} />
      </PaperProvider>
    </>
  );
}

function ApplicationContainer(props) {
  const { themeStyle, theme } = props;
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider style={{ marginTop: RNStatusBar.currentHeight }}>
      <Navigation colorScheme={colorScheme} />
      <StatusBar
        backgroundColor={theme.colors.surface}
        style={themeStyle === "dark" ? "light" : "dark"}
      />
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
