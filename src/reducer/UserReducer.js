import { createSlice } from "@reduxjs/toolkit";

const sliceName = "user";
const userState = {
  isSignIn: false,
  userData: {},
  profileData:{},
};
const user = createSlice({
  name: sliceName,
  initialState: userState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setUserData(state, { payload }) {
      state.userData = payload;
    },
    setProfileData(state, { payload }) {
      state.profileData = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUserData, setIsSignIn,setProfileData } = user.actions;

export default user.reducer;
