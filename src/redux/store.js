import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/auth';
import themeReducer from '../redux/slices/theme';
import messageReducer from '../redux/slices/message';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    message: messageReducer,
  },
  devTools: true
  // devTools: process.env.NODE_ENV !== 'production'
});

