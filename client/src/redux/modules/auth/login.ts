import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type Login = {
    success: Boolean,
    loading: Boolean,
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
            console.log('login res: ', res);
            return res.data;
        } catch (err) {
            console.log('login err: ', err);
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
            // console.log('action.payload: ', action.payload);
        },
        [postLogin.rejected.type]: (state, action) => {
            state.loading = false;
            // action.error.message = "Rejected
            state.success = false;
        }
    }
})


export default loginSlice.reducer