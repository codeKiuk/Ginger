import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Logout = {
    loading: boolean
    success: boolean,
}

const initialState: Logout = {
    loading: false,
    success: false,
}

export const postLogout = createAsyncThunk(
    'logout/postLogout',
    async (undefined, ThunkAPI) => {
        try {
            const res = await axios.post('/api/auth/logout')
            return res.data
        } catch (err) {
            ThunkAPI.rejectWithValue(err);
        }
    }
)

const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {

    },
    extraReducers: {
        [postLogout.pending.type]: (state, action) => {
            state.loading = true;
        },
        [postLogout.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
        },
        [postLogout.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
        }
    }
})

export default logoutSlice.reducer;