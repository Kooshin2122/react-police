import * as React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
var qs = require("qs");

import * as FleetDetailsReducer from "../reducer/FleetDetailsReducer";

//const profileData = useSelector((state) => state.user.profileData);

export const FleetDetails = createAsyncThunk(
  "api",
  async (userdata, { dispatch, getState }) => {
    // const { theme, navigation } = userdata;
    const state = getState();
    // console.log('state',state);
    try {
      var data = qs.stringify({
        action: "Notes",
        class: state.user.profileData.class,
        std: state.user.userData.userVal,
      });
      var config = {
        method: "post",
        //url: 'getData.php',
        url: "getapi.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      // console.log('ress');
      const response = await apiInstance(config);

      dispatch(FleetDetailsReducer.setIsSignIn(true));

      dispatch(
        FleetDetailsReducer.setFleetDetailsData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);



export const GetDetails = createAsyncThunk(
  "fleetdetails/GetDetails",
  async (param, { dispatch, getState }) => {
    const { fleetnumber,todayvalue,policeid } = param;
    try {
      const formData = new FormData();
      formData.append("fleet", fleetnumber);
       formData.append("group", todayvalue);
       formData.append("police", policeid);
      formData.append("action", "Fleetsearch");

      const response = await apiInstance({
        method: "post",
        url: "getapi.php",
        data: formData,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

       //console.log("response----fleetdetails", response);
      dispatch(
        FleetDetailsReducer.setFleetDetailsData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const ChargeInsert = createAsyncThunk(
  "fleetdetails/chargeinsert",
  async (param, { dispatch, getState }) => {
    const { fleet, policeid,violationreason } = param;
    //console.log(fleet, pol,vreason)
    try {
      const formData = new FormData();
      formData.append("sfleet", fleet);
      formData.append("fpolice", policeid);
      formData.append("freason", violationreason);
      formData.append("action", "charge");

      const response = await apiInstance({
        method: "post",
        url: "getapi.php",
        data: formData,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

       //console.log("response", response);
      if (response) {
        return true;
      }
      else { return false; }
      // dispatch(
      //   FleetDetailsReducer.setFleetDetailsData({
      //     data: response.data,
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
  }
);


export const Chargepay = createAsyncThunk(
  "fleetdetails/Chargepay",
  async (param, { dispatch, getState }) => {
    const { fleet, pol } = param;
    try {
      const formData = new FormData();
      formData.append("sfleet", fleet);
      formData.append("fpolice", pol);
      formData.append("action", "charge");

      const response = await apiInstance({
        method: "post",
        url: "getapi.php",
        data: formData,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // console.log("response----subject", response);
      if (response) {
        return true;
      }
      else { return false; }
      // dispatch(
      //   FleetDetailsReducer.setFleetDetailsData({
      //     data: response.data,
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
  }
);
