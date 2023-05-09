import { createSlice } from "@reduxjs/toolkit";

const sliceName = "Track";
const TrackState = {
  isSignIn: true,
  TrackData: {},
};
const Track = createSlice({
  name: sliceName,
  
  initialState: TrackState,
  reducers: {
    setIsSignIn(state, { payload }) {
      state.isSignIn = payload;
    },
    setTrackData(state, { payload }) {
      state.TrackData = payload;
    },
    
  },
  extraReducers: (builder) => {},
});

export const { setTrackData, setIsSignIn } = Track.actions;

export default Track.reducer;
