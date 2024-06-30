import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "", // 'success', 'error', etc.
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.message = "";
      state.type = "";
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
