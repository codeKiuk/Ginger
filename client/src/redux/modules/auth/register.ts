import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type Register = {
    loading: boolean,
    success: boolean,
    isUserIDduplicated: boolean,
}

const initialState: Register = {
    loading: false,
    success: false,
    isUserIDduplicated: false,
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

export const getIsUserIDduplicated = createAsyncThunk(
    'register/getIsUserIDduplicated',
    async ({ userID }: { userID: String }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/auth/register', { params: { userID: userID } })
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
        },
        [postRegister.rejected.type]: (state, action) => {
            state.loading = false;
            // action.error.message = "Rejected
            state.success = false;
        },
        [getIsUserIDduplicated.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getIsUserIDduplicated.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.isUserIDduplicated = action.payload.isUserIDduplicated;
        },
        [getIsUserIDduplicated.rejected.type]: (state, action) => {
            state.loading = false;
            // action.error.message = "Rejected
            state.success = false;
        }
    }
})

export default registerSlice.reducer;