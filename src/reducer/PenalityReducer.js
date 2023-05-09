import { createSlice } from "@reduxjs/toolkit";

const sliceName = "Penality";
const PenalityState = {
  isSignIn: true,
  PenalityData: {},
};
const Penality = createSlice({
  name: sliceName,
  initialState: PenalityState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setPenalityData(state, { payload }) {
      state.PenalityData = payload;
    },
    
  },
  extraReducers: (builder) => {},
});

export const { setPenalityData, setIsSignIn } = Penality.actions;

export default Penality.reducer;
