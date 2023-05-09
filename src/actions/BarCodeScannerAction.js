import * as React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
var qs = require("qs");

import * as BarCodeScannerReducer from "../reducer/BarCodeScannerReducer";
export const GetGroup = createAsyncThunk(
  "BarcodeScanner/Getgroup",
  async (param, { dispatch, getState }) => {
    const { tdate } = param;
    try {
      const formData = new FormData();
      formData.append("date", tdate);
      formData.append("action", "pgroup");

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
        BarCodeScannerReducer.setBarCodeScannerData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);







