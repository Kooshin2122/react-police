import * as React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Searchbar } from "react-native-paper";
import { apiInstance } from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigation } from "@react-navigation/native";
var qs = require("qs");

import * as PaymentReducer from "../reducer/PaymentReducer";

//const profileData = useSelector((state) => state.user.profileData);

export const GetDetails = createAsyncThunk(
  "penality/GetDetails",
  async (param, { dispatch, getState }) => {
    const { pdata } = param;
    try {
      const formData = new FormData();
      formData.append("fleet", pdata);
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
        PaymentReducer.setPaymentData({
          data: response.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);





export const GetDatedetails = createAsyncThunk(
  "payment/GetDatedetails",
  async (param, { dispatch, getState }) => {

    //const navigation = useNavigation();

    const { fleetnumber } = param;
     // console.log('cxvgxcvxcvcxv',fleetnumber);
    try {
      const formData = new FormData();
      formData.append("Fltnumber", fleetnumber);
      
      formData.append("action", "PoliceDate");

      const response = await apiInstance({
        method: "post",
        url: "getapi.php",
        data: formData,
        header: {
          "content-type": "multipart/form-data",
        },
      });

      //console.log(response.data);


      dispatch(
        PaymentReducer.setDatedata({
          data: response.data,
        })
      );
      
    } catch (error) {
      console.log(error);
    }
  }
);







export const PaymentInsert = createAsyncThunk(
  "payment/Paymentinsert",
  async (param, { dispatch, getState }) => {

    //const navigation = useNavigation();

    const { evc,images,fleetnumber,owner,driver,police,violationamount,violationreason,charge } =
      param;
      //console.log(evc,images,fleetnumber,owner,driver,police,amount,reason);
      //let newimage = image.uri.split("/").pop();
    try {
      const formData = new FormData();
      formData.append("EVCN", evc);
      formData.append("fltreason", violationreason);
      formData.append("Fltnumber", fleetnumber);
      formData.append("Fltowner", owner);
      formData.append("Fltdriver", driver);
      formData.append("Fltpolice", police);
      formData.append("Fltamount", violationamount);
      //formData.append("Fltcharge", charge);
      formData.append("action", "Policepay");
     
      if (images) {
        //documents.map((doc) => {
        const localUri = images.uri;
        const filename = images.filename;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        const file = { uri: localUri, name: filename, type ,tmp_name : localUri};
        console.log(JSON.stringify(file));
        formData.append("files[]", file);
        //});
      }

      const response = await apiInstance({
        method: "post",
        url: "getapi.php",
        data: formData,
        header: {
          "content-type": "multipart/form-data",
        },
      });

      console.log('response',response.data);
      if (response.data) {
        if (response.data.status == 1) {
          dispatch(
            PaymentReducer.setPaymentData({
              ...response.data[0],
            })
          );
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