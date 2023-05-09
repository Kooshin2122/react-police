/* eslint-disable import/no-unresolved */
import * as React from "react";
import { View, Platform } from "react-native";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, withTheme, Surface, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import DrawerContent from "../components/DrawerContent";
import TabContent from "../components/TabContent";
import Home from "../screens/Home";
import Logout from "../screens/Logout";
import Settings from "../screens/Settings";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Check from "../screens/Check";
import DashBoard from "../screens/DashBoard";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import FleetDetails from "../screens/FleetDetails";
import Track from "../screens/Track";
import Penality from "../screens/Penality";

import Payment from "../screens/Payment";

import ChargePayment from "../screens/ChargePayment";

import BarCodeScanner from "../screens/BarCodeScanner";

import Reason from "../screens/Reason";

const Drawer = createDrawerNavigator();

const MainStack = createStackNavigator();

function Navigation(props) {
  const { theme } = props;
  const { colors } = theme;
  const navigationRef = React.useRef(null);

  const MyTheme = {
    dark: false,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.backdrop,
      notification: colors.notification,
    },
  };
  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Check"
      >
        <MainStack.Screen name="Check" component={Check} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="App" component={DrawerNavigation} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
export default withTheme(Navigation);

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={"DashBoard"}
      drawerType={"front"}
      drawerContent={(props) => {
        return <DrawerContent {...props} />;
      }}
    >
      <Drawer.Screen
        name="DashBoard"
        component={DashBoardNavigator}
        options={{
          title: "DashBoard",

          icon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="school-outline"
              size={30}
              color="#afeeee"
            />
           
          ),
        }}
      />

     

      {/* <Drawer.Screen
        name="Settings"
        component={SettingNavigator}
        options={{
          title: "Settings",
          icon: ({ focused, size }) => (
            <MaterialCommunityIcons name="tools" size={24} color="#dc143c" />
          ),
        }}
      /> */}

            
      {/* <Drawer.Screen
        name="DashBoard"
        component={DashBoardNavigator}
        options={{
          title: "DashBoard",
          icon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-multiple"
              size={24}
              color="#1e90ff"
            />
          ),
        }}
      /> */}

      
      <Drawer.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: "Profile",
          icon: ({ focused, size }) => (
          //  <MaterialIcons
          //     name="face-retouching-natural"
          //     size={30}
          //     color="#b4ee71"
          //   />
            <MaterialIcons name="account-circle" size={24} color="#b4ee71" />
          ),
        }}
      />

       

<Drawer.Screen
                name="Track"
                component={TrackNavigator}
                options={{
                  title: "Track",
                  icon: ({ focused, size }) => (
                    
                    <MaterialIcons name="person-search" size={24} color="#f34747" />
                    
                    
                  ),
                }}
              />
      
     
      
       <Drawer.Screen
        name="Logout"
        component={LogoutNavigator}
        options={{
          title: "Logout",

          icon: ({ focused, size }) => (
            <MaterialCommunityIcons name="logout" size={24} color="#0584D5" />
            
          ),
        }}
      />
     </Drawer.Navigator>
  );
};

//const Tabs = createBottomTabNavigator();

const RootHome = (isFocused) => {
  return (
    <Tabs.Navigator
      // tabBarOptions={{
      //   activeTintColor: 'green',
      //   inactiveTintColor: 'black',

      // }}
      tabContent={(props) => {
        return <TabContent {...props} />;
      }}
    >
      
      <Tabs.Screen
        name="Fee "
        component={FeeNavigator}
        options={{
          title: "Fee",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons name="payment" size={24} color="#8bc34a" />
            
          ),
        }}
      />
      
    
      <Tabs.Screen
              name="Profile"
              component={ProfileNavigator}
              options={{
                title: "Profile",
            tabBarIcon: ({ tintColor }) => (
            // <Icon name="code-working" color={`#ff69b4`} size={25} />
            <MaterialIcons
                    name="face-retouching-natural"
                    size={30}
                    color="#b4ee71"
                  />
          ),
        }}
      />
      
    </Tabs.Navigator>
  );
};

// const HomeStack = createStackNavigator();

// function HomeNavigator(props) {
//   return (
//     <HomeStack.Navigator
//       screenOptions={{
//         headerShown: true,
//         header: (props) => <Header {...props} />,
//       }}
//       initialRouteName="HomeScreen"
//     >
//       <HomeStack.Screen
//         name="HomeScreen"
//         component={Home}
//         options={{ title: "Home", icon: "home" }}
//       />
//       <HomeStack.Screen
//         name="HomeSettings"
//         component={Settings}
//         options={{
//           title: "settings",
//           headerTitle: "settings",
//           icon: "home",
//         }}
//         screenOptions={{
//           title: "settings",
//           headerTitle: "settings",
//         }}
//       />
//     </HomeStack.Navigator>
//   );
// }

const LogoutStack = createStackNavigator();

function LogoutNavigator(props) {
  return (
    <LogoutStack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
      }}
      initialRouteName="Logout"
    >
      <LogoutStack.Screen
        name="LogoutScreen"
        component={Logout}
        options={{ title: "Logout", icon: "Logout" }}
      />
    </LogoutStack.Navigator>
  );
}

const SettingStack = createStackNavigator();

function SettingNavigator(props) {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
      }}
      initialRouteName="Settings"
    >
      <SettingStack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "settings" }}
      />
    </SettingStack.Navigator>
  );
}





const ProfileStack = createStackNavigator();

function ProfileNavigator(props) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: true,

        header: (props) => <Header {...props} />,
      }}
      initialRouteName="ProfileScreen"
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ title: "Profile" }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "EditProfile",
          headerTitle: "EditProfile",
          icon: "home",
        }}
        screenOptions={{
          title: "EditProfile",
          headerTitle: "EditProfile",
        }}
      />
    </ProfileStack.Navigator>
  );
}




const DashBoardStack = createStackNavigator();

function DashBoardNavigator(props) {
  return (
    <DashBoardStack.Navigator
      screenOptions={{
        headerShown: true,

        header: (props) => <Header {...props} />,
      }}
      initialRouteName="DashBoard"
    >
      <DashBoardStack.Screen
        name="FleetDetails"
        component={FleetDetails}
        options={{
          title: "FleetDetails",
          headerTitle: "FleetDetails",
          icon: "home",
          
        }}
        screenOptions={{
          title: "FleetDetails",
          headerTitle: "FleetDetails",
          
        }}

        
      />


 <DashBoardStack.Screen
        name="Penality"
        component={Penality}
        options={{
          title: "Penality",
          headerTitle: "Penality",
          icon: "home",
        }}
        screenOptions={{
          title: "Penality",
          headerTitle: "Penality",
        }}
      /> 


<DashBoardStack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: "Payment",
          headerTitle: "Payment",
          icon: "home",
        }}
        screenOptions={{
          title: "Payment",
          headerTitle: "Payment",
        }}
      /> 

    <DashBoardStack.Screen
        name="ChargePayment"
        component={ChargePayment}
        options={{
          title: "ChargePayment",
          headerTitle: "ChargePayment",
          icon: "home",
        }}
        screenOptions={{
          title: "ChargePayment",
          headerTitle: "ChargePayment",
        }}
      /> 


<DashBoardStack.Screen
        name="BarCodeScanner"
        component={BarCodeScanner}
        options={{
          title: "BarCodeScanner",
          headerTitle: "BarCodeScanner",
          icon: "home",
        }}
        screenOptions={{
          title: "BarCodeScanner",
          headerTitle: "BarCodeScanner",
        }}
      /> 


<DashBoardStack.Screen
        name="Reason"
        component={Reason}
        options={{
          title: "Receipt",
          headerTitle: "Receipt",
          icon: "home",
        }}
        screenOptions={{
          title: "Receipt",
          headerTitle: "Receipt",
          
        }}
      /> 



      <DashBoardStack.Screen
        name="DashBoard"
        component={DashBoard}
        options={{ title: "DashBoard" }}
      />
    </DashBoardStack.Navigator>
  );
}


const TrackStack = createStackNavigator();

function TrackNavigator(props) {
  return (
    <TrackStack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
      }}
      initialRouteName="Track"
    >

      <TrackStack.Screen
        name="Track"
        component={Track}
        options={{ title: "Track" }}
      />
    </TrackStack.Navigator>
  );
}


const CommonStack = createStackNavigator();

function CommonNavigator(props) {
  return (
    <CommonStack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
      }}
      initialRouteName="Common"
    >
      <CommonStack.Screen
        name="Common"
        component={Common}
        options={{ title: "Common" }}
      />
    </CommonStack.Navigator>
  );
}











