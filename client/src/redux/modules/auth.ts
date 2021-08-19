import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type auth = {
    loading: Boolean,
    tokenMatch: Boolean,
    userID: String,
    password: String,
    admin: Number,
}

const initialState: auth = {
    loading: false,
    tokenMatch: false,
    userID: '',
    password: '',
    admin: 0,
}

export const compareToken = createAsyncThunk(
    'auth/compareToken',
    async (undefined, thunkAPI) => {
        try {
            const res = await axios.get('/api/auth')
            console.log('auth res: ', res);
            return res.data
        } catch (err) {
            console.log('auth err: ', err);
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: {
        [compareToken.pending.type]: (state, action) => {
            state.loading = true;
        },
        [compareToken.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.admin = action.payload.admin;
            state.userID = action.payload.userID;
            state.password = action.payload.password;
            state.tokenMatch = action.payload.tokenMatch;
        },
        [compareToken.rejected.type]: (state, action) => {
            state.loading = false;
            state.tokenMatch = false;
        }
    }
})

export default authSlice.reducer;