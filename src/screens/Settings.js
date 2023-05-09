import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  List,
  Switch,
  Surface,
  withTheme,
  IconButton,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@react-native-community/slider";

import * as commonActions from "../reducer/CommonReducer";
import { Text } from "../components/Text";

const windowWidth = Dimensions.get("window").width;

function Settings(props) {
  const dispatch = useDispatch();
  const { theme, navigation } = props;
  const { colors } = theme;
  const currentTheme = useSelector((state) => state.common.theme);
  const fontSizeSliderValue = useSelector(
    (state) => state.common.fontSizeSliderValue
  );
  const fontSize = useSelector((state) => state.common.fontSize);

  const setFondData = (fontData) => {
    dispatch(commonActions.updateFontValues(fontData));
  };

  React.useEffect(() => {
    let fontData = {
      fontSizeSlider: fontSizeSliderValue,
      fontSizeValue: fontSize,
    };
    let status = false;
    if (fontSizeSliderValue === null) {
      fontData = {
        ...fontData,
        fontSizeSlider: 0.5,
      };
      status = true;
    }
    if (fontSize === null) {
      fontData = {
        ...fontData,
        fontSizeValue: 0,
      };
      status = true;
    }

    if (status) {
      setFondData(fontData);
    }
  }, []);

  const onToggleSwitch = () => {
    dispatch(
      commonActions.updateTheme(currentTheme === "light" ? "dark" : "light")
    );
  };
  return (
    <Surface style={styles.container}>
      {/* <List.Item
        title={<Text style={{ letterSpacing: 1 }}>Dark Theme</Text>}
        right={(props) => (
          <Switch
            value={currentTheme === "dark" ? true : false}
            onValueChange={onToggleSwitch}
            color={colors.primary}
          />
        )}
      /> */}
      <List.Item
        title={
          <Text style={{ letterSpacing: 1, alignSelf: "flex-start" }}>
            Font Size
          </Text>
        }
      />
      <CustomSlider theme={theme} />
    </Surface>
  );
}

function CustomSlider(props) {
  const dispatch = useDispatch();
  const { theme } = props;
  const { colors } = theme;
  const currentTheme = useSelector((state) => state.common.theme);
  const fontSizeSliderValue = useSelector(
    (state) => state.common.fontSizeSliderValue
  );
  const fontSize = useSelector((state) => state.common.fontSize);

  const setFondData = (fontData) => {
    dispatch(commonActions.updateFontValues(fontData));
  };

  React.useEffect(() => {
    let fontData = {
      fontSizeSlider: fontSizeSliderValue,
      fontSizeValue: fontSize,
    };
    let status = false;
    if (fontSizeSliderValue === null) {
      fontData = {
        ...fontData,
        fontSizeSlider: 0.5,
      };
      status = true;
    }
    if (fontSize === null) {
      fontData = {
        ...fontData,
        fontSizeValue: 0,
      };
      status = true;
    }

    if (status) {
      setFondData(fontData);
    }
  }, []);
  return (
    <View style={{ flexDirection: "row" }}>
      <IconButton
        icon="minus"
        color={fontSizeSliderValue !== 0 ? colors.primary : colors.onSurface}
        size={20}
        onPress={() => {
          if (fontSizeSliderValue !== 0) {
            dispatch(
              commonActions.updateFontValues({
                fontSizeSlider: fontSizeSliderValue - 0.5,
                fontSizeValue: fontSize - 5,
              })
            );
          }
        }}
      />
      <Slider
        value={fontSizeSliderValue ? fontSizeSliderValue : 0}
        step={0.5}
        style={{
          width: (windowWidth / 100) * 80,
          opacity: 1,
          height: 20,
          color: colors.primary,
          alignSelf: "center",
        }}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.onSurface}
        onValueChange={(value) => {
          dispatch(
            commonActions.updateFontValues({
              fontSizeSlider: value,
              fontSizeValue: value === 0 ? -5 : value === 0.5 ? 0 : 5,
            })
          );
        }}
      />

      <IconButton
        icon="plus"
        color={fontSizeSliderValue !== 1 ? colors.primary : colors.onSurface}
        size={20}
        onPress={() => {
          if (fontSizeSliderValue !== 1) {
            dispatch(
              commonActions.updateFontValues({
                fontSizeSlider: fontSizeSliderValue + 0.5,
                fontSizeValue: fontSize + 5,
              })
            );
          }
        }}
      />
    </View>
  );
}
export default withTheme(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
