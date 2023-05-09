import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import color from "color";
import DrawerBrand from "./DrawerBrand";
import {
  IconButton,
  Colors,
  Title,
  withTheme,
  Surface,
  Text,
} from "react-native-paper";

import { getReadableColor } from "../utils/colorUtils";
function DrawerContent(props) {
  const { colors } = props.theme;

  const { state, descriptors, navigation } = props;
  const renderDrawerItem = (icon, label, isFocused) => {
    return (
      <View
        style={[
          styles.drawerItem,
          {
            backgroundColor: isFocused ? colors.primary : "transparent",
          },
        ]}
      >
        {icon && (
          <IconButton
          icon={icon}
          size={24}
          color={
            isFocused ? getReadableColor(colors.primary): colors.onSurface
          }
          />
        )}
        <Text
          style={[
            styles.drawerItemText,
            {
              color: isFocused
                ? getReadableColor(colors.primary)
                : colors.onSurface,
              letterSpacing: 1,
            },
          ]}
        >
          {label}
        </Text>
      </View>
    );
  };

  const onPress = (route, params) => {
    let options = {};
    if (params) {
      options = { ...params };
    }
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      if (params) {
        navigation.navigate(route.name, { options: { ...params } });
      } else {
        navigation.navigate(route.name);
      }
    }
  };
  return (
    <Surface style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerBrand />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const icon = options.icon;

          return (
            <View style={styles.drawerItemContainer} key={"DrawerItem" + index}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => onPress(route)}
                style={styles.tabBar}
              >
                {renderDrawerItem(icon, label, isFocused)}
              </TouchableOpacity>
            </View>
          );
        })}
      </DrawerContentScrollView>
    </Surface>
  );
}
export default withTheme(DrawerContent);

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? 44 : 56 + Constants.statusBarHeight,
    // paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  drawerItemContainer: {
    marginHorizontal: 10,
    marginVertical: 4,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerItemText: {
    fontWeight: "500",
    alignSelf: "center",
    margin: 3,
    paddingTop: 5,
  },
  drawerItemIcon: {
    width: 24,
    height: 24,
    margin: 3,
  },
});
