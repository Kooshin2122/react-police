import { createSlice } from "@reduxjs/toolkit";

const sliceName = "common";
const commonState = {
  theme: "light",
  fontSizeSliderValue: 0.5,
  fontSize: 0,
  userData:{}
};
const common = createSlice({
  name: sliceName,
  initialState: commonState,
  reducers: {
    updateTheme(state, { payload }) {
      // state.theme = payload;
      state.theme = "light"
    },
    updateFontValues(state, { payload }) {
      const { fontSizeSlider, fontSizeValue } = payload;
      state.fontSizeSliderValue = fontSizeSlider;
      state.fontSize = fontSizeValue;
    },
    setUserData(state, { payload }) {
      state.userData = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateTheme, updateFontValues,setUserData } = common.actions;

export default common.reducer;
