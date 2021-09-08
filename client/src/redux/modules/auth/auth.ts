import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type auth = {
    loading: boolean,
    tokenMatch: boolean,
    userID: string,
    admin: Number,
}

const initialState: auth = {
    loading: false,
    tokenMatch: false,
    userID: '',
    admin: 0,
}

export const compareToken = createAsyncThunk(
    'auth/compareToken',
    async (undefined, thunkAPI) => {
        try {
            const res = await axios.get('/api/auth')
            return res.data
        } catch (err) {
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
            state.tokenMatch = action.payload.tokenMatch;
        },
        [compareToken.rejected.type]: (state, action) => {
            state.loading = false;
            // action.error.message = "Rejected
            state.tokenMatch = false;
        }
    }
})

export default authSlice.reducer;