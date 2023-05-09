import { createSlice } from "@reduxjs/toolkit";

const sliceName = "Payment";
const PaymentState = {
  isSignIn: true,
  PaymentData: {},
  Datedata:{},
};
const Payment = createSlice({
  name: sliceName,
  initialState: PaymentState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setPaymentData(state, { payload }) {
      state.PaymentData = payload;
    },

    setDatedata(state, { payload }) {
      state.Datedata = payload;
    },
    
  },
  extraReducers: (builder) => {},
});

export const { setPaymentData, setIsSignIn,setDatedata } = Payment.actions;

export default Payment.reducer;
