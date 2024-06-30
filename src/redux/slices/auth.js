import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));


export const signin = createAsyncThunk(
    "auth/signin",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await AuthService.signin(username, password);
            return { user: response };
        } catch (error) {
            const message = error.message || error.toString() || 'Error desconocido' 
            return rejectWithValue({ message });
        }
    }
);


export const signup = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await AuthService.signup(username, email, password);
            return response;
        } catch (error) {
            const message = error.message || error.toString() || 'Error desconocido' 
            return rejectWithValue({ message });
        }
    }
);


export const signout = createAsyncThunk(
    "auth/signout", 
    async () => {
        await AuthService.signout();
    }
);


const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(signin.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        })
        .addCase(signin.rejected, (state) => {
            state.isLoggedIn = false;
            state.user = null;
        })
        .addCase(signup.fulfilled, (state) => {
            state.isLoggedIn = false;
        })
        .addCase(signup.rejected, (state) => {
            state.isLoggedIn = false;
        })
        .addCase(signout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.user = null;
        });
    }
});


export default authSlice.reducer;