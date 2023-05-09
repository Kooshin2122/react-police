import * as React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
var qs = require("qs");

import * as PenalityReducer from "../reducer/PenalityReducer";

//const profileData = useSelector((state) => state.user.profileData);

export const GetDetails = createAsyncThunk(
  "penality/GetDetails",
  async (param, { dispatch, getState }) => {
    const { pdata } = param;
    try {
      const formData = new FormData();
      formData.append("fleet", pdata);
      formData.append("action", "Penality");

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
        PenalityReducer.setPenalityData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);