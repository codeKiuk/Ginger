import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type Login = {
    success: boolean,
    loading: boolean,
}

const initialState: Login = {
    success: false,
    loading: false,
}

export const postLogin = createAsyncThunk(
    'login/postLogin',
    async ({ userID, password }: { userID: String, password: String }, thunkAPI) => {

        try {
            const res = await axios.post('/api/auth/login', { userID, password });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }

    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: {
        [postLogin.pending.type]: (state, action) => {
            state.loading = true;
        },
        [postLogin.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
        },
        [postLogin.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    }
})


export default loginSlice.reducer