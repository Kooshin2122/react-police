import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
var qs = require("qs");

import * as userReducer from "../reducer/UserReducer";
import { Alert } from "react-native";

export const login = createAsyncThunk(
  "api",
  async (userdata, { dispatch, getState }) => {
    const { userName, password } = userdata;
    const state = getState();
    try {
      var data = qs.stringify({
        userName: userName,
        password: password,
        action: "login",
      });
      var config = {
        method: "post",
        url: "getapi.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      const response = await apiInstance(config);

      if (response.data == "invalid") {
        Alert.alert("Invalid Username Or Password");
        dispatch(userReducer.setIsSignIn(false));
      } else {
        //console.log('trail',response);
        dispatch(userReducer.setIsSignIn(true));

        dispatch(
          userReducer.setUserData({
            //...response.data.UserData[0],
            profileData: response.data.ProfieData,
            loginId: userName,
            password,
            
          })
        );
        

        dispatch(
          userReducer.setProfileData({
            ...response.data.ProfieData[0],
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkLogin = createAsyncThunk(
  "api",
  async (userdata, { dispatch, getstate }) => {
    const { userName, password } = userdata.dataToSend;
    //console.log("check-login");
    try {
      var data = qs.stringify({
        userName: userName,
        password: password,
        action: "login",
      });
      var config = {
        method: "post",
        url: "getapi.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      const response = await apiInstance(config);

      if (response.data == "invalid") {
        dispatch(userReducer.setIsSignIn(false));
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
      dispatch(userReducer.setIsSignIn(false));
    }
    return false;
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (userdata, { dispatch, getstate }) => {
    try {
      dispatch(userReducer.setIsSignIn(false));
      dispatch(userReducer.setUserData({}));
      dispatch(userReducer.setProfileData({}));
      // dispatch(HomeworkReducer.sethomeworkData({}));

      dispatch(descReducer.setDTestData({}));

      dispatch(descReducer.setDTestData({}));
    } catch (error) {
      console.log(error);
    }
  }
);

export const ProfileUpdate = createAsyncThunk(
  "ProfileUpdate",

  async (param, { dispatch, getState }) => {
    const { fname, lname, mname, phone, address,userid} =
      param;

    try {
      const formData = new FormData();
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("mname", mname);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("userid", userid);
      
      formData.append("action", "ProfileUpdate");

      const response = await apiInstance({
        method: "post",
        url: "getapi.php",
        data: formData,
        header: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(response.data);
      if (response.data) {
        if (response.data == true) {
          //Alert.alert("Update Successfully");
          //dispatch(checkLogin({}));
          dispatch(Profile({ userName: fname }));
          //navigation.navigate("Profile");
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const Profile = createAsyncThunk(
  "Profile",
  async (userdata, { dispatch, getState }) => {
    const { userName } = userdata;

    try {
      var data = qs.stringify({
        userName: userName,
        action: "profile",
      });
      var config = {
        method: "post",
        url: "getapi.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      const response = await apiInstance(config);

      if (response.data) {
        dispatch(
          userReducer.setProfileData({
            ...response.data[0],
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);
