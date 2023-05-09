import { createSlice } from "@reduxjs/toolkit";

const sliceName = "BarCodeScanner";
const BarCodeScannerState = {
  isSignIn: true,
  BarCodeScannerData: {},
};
const BarCodeScanner = createSlice({
  name: sliceName,
  
  initialState: BarCodeScannerState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setBarCodeScannerData(state, { payload }) {
      state.BarCodeScannerData = payload;
    },
    
  },
  extraReducers: (builder) => {},
});

export const { setBarCodeScannerData, setIsSignIn } = BarCodeScanner.actions;

export default BarCodeScanner.reducer;
