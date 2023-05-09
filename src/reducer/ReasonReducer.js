import { createSlice } from "@reduxjs/toolkit";

const sliceName = "Reason";
const ReasonState = {
  isSignIn: true,
  ReasonData: {},
};
const Reason = createSlice({
  name: sliceName,
  initialState: ReasonState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setReasonData(state, { payload }) {
      state.ReasonData = payload;
    },
    
  },
  extraReducers: (builder) => {},
});

export const { setReasonData, setIsSignIn } = Reason.actions;

export default Reason.reducer;
