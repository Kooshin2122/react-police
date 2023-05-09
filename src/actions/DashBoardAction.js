import * as React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
var qs = require("qs");

import * as DashboardReducer from "../reducer/DashboardReducer";
//const profileData = useSelector((state) => state.user.profileData);

// export const Dashboard = createAsyncThunk(
//   "api",
//   async (userdata, { dispatch, getState }) => {
//     const state = getState();
//     //  console.log('state',state);
//     try {
//       var data = qs.stringify({
//         action: "Dashboard",
//         class: state.user.profileData.class,
//         std: state.user.profileData.admission,
//       });
//       var config = {
//         method: "post",
//         //url: 'getData.php',
//         url: "getapi.php",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         data: data,
//       };

//       const response = await apiInstance(config);

//       dispatch(DashboardReducer.setIsSignIn(true));

//       dispatch(
//         DashboardReducer.setDashboardData({
//           data: response.data,
//         })
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );



export const GetGroup = createAsyncThunk(
  "dashboard/Getgroup",
  async (param, { dispatch, getState }) => {
    const { today } = param;
    try {
      const formData = new FormData();
      formData.append("day", today);
      formData.append("action", "todaygroup");

      const response = await apiInstance({
        method: "post",
        url: "getapi.php",
        data: formData,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // console.log("response----subject", response);
      dispatch(
        DashboardReducer.setDashboardData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);







