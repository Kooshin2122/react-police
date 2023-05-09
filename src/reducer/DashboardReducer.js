import { createSlice } from "@reduxjs/toolkit";

const sliceName = "Dashboard";
const DashboardState = {
  isSignIn: true,
  DashboardData: {},
};
const Dashboard = createSlice({
  name: sliceName,
  
  initialState: DashboardState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setDashboardData(state, { payload }) {
      state.DashboardData = payload;
    },
    
  },
  extraReducers: (builder) => {},
});

export const { setDashboardData, setIsSignIn } = Dashboard.actions;

export default Dashboard.reducer;
