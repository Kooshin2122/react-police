import { createSlice } from "@reduxjs/toolkit";

const sliceName = "ChargePayment";
const ChargePaymentState = {
  isSignIn: true,
  ChargePaymentData: {},
  ChargePaymentDatedata:{},
};
const ChargePayment = createSlice({
  name: sliceName,
  initialState: ChargePaymentState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setChargePaymentData(state, { payload }) {
      state.ChargePaymentData = payload;
    },

    setChargePaymentDatedata(state, { payload }) {
      state.ChargePaymentDatedata = payload;
    },
    
  },
  extraReducers: (builder) => {},
});

export const { setChargePaymentData, setIsSignIn,setChargePaymentDatedata } = ChargePayment.actions;

export default ChargePayment.reducer;
