import * as React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
var qs = require("qs");

import * as ReasonReducer from "../reducer/ReasonReducer";

export const GetDetails = createAsyncThunk(
  "reason/GetDetails",
  async (param, { dispatch, getState }) => {
    const { pfleet} = param;
    try {
      const formData = new FormData();
      formData.append("fleet", pfleet);
      formData.append("action", "Payment");

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
        ReasonReducer.setReasonData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);


