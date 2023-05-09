import * as React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
var qs = require("qs");

import * as TrackReducer from "../reducer/TrackReducer";

export const GetDetails = createAsyncThunk(
  "track/GetDetails",
  async (param, { dispatch, getState }) => {
    const { pid } = param;
    try {
      const formData = new FormData();
      formData.append("police", pid);
      formData.append("action", "track");

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
        TrackReducer.setTrackData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);







