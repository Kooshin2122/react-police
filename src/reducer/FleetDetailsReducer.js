import { createSlice } from "@reduxjs/toolkit";

const sliceName = "FleetDetails";
const FleetDetailsState = {
    isSignIn: true,
    FleetDetailsData: [],
};
const FleetDetails = createSlice({
  name: sliceName,
  initialState: FleetDetailsState,
  reducers: {
    setIsSignIn(state, { payload }) {
        state.isSignIn = payload;
      },
    setFleetDetailsData(state, { payload }) {
      state.FleetDetailsData = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setFleetDetailsData,setIsSignIn } = FleetDetails.actions;

export default FleetDetails.reducer;
