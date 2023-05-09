/* eslint-disable no-nested-ternary */
import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Text,
  Pressable,
} from "react-native";
import {
  IconButton,
  Colors,
  Title,
  withTheme,
  Surface,
} from "react-native-paper";

function Header(props) {
  const { layout, scene, navigation, previous } = props;
  const { colors } = props.theme;

  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  return (
    <Surface style={styles.headerContainer}>
      <View style={styles.leftMenu}>
        {previous ? (
          <IconButton
            icon="arrow-left"
            color={colors.primary}
            size={35}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <IconButton
            icon="menu"
            color={colors.primary}
            size={35}
            onPress={scene.descriptor.navigation.toggleDrawer}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          right: 35,
          marginLeft: 10,
        }}
      >
        <Title
          style={{
            letterSpacing: 1,
            textAlign: "center",
            color: colors.primary,
          }}
        >
          {title}
        </Title>
      </View>
    </Surface>
  );
}
export default withTheme(Header);

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === "ios" ? 94 : 56,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  leftMenu: {
    marginHorizontal: 0,
  },
  titleContainer: {
    marginHorizontal: 11,
    flexDirection: "row",
  },
});
