import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type Register = {
    loading: Boolean,
    success: Boolean,
    userID: String,
    password: String
}

const initialState: Register = {
    loading: false,
    success: false,
    userID: "",
    password: "",
}

export const postRegister = createAsyncThunk(
    'register/postRegister',
    async ({ userID, password }: { userID: String, password: String }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/auth/register', { userID, password })
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {

    },
    extraReducers: {
        [postRegister.pending.type]: (state, action) => {
            state.loading = true;
        },
        [postRegister.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.userID = action.payload.userID;
            state.password = action.payload.password;
        },
        [postRegister.rejected.type]: (state, action) => {
            state.loading = false;
            // action.error.message = "Rejected
            state.success = false;
        }
    }
})

export default registerSlice.reducer;