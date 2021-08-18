import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type login = {
    loginSuccess: Boolean,
    loading: Boolean,
}

const initialState: login = {
    loginSuccess: false,
    loading: false,
}

export const postLogin = createAsyncThunk(
    'login/postLogin',
    async ({ userID, password }: { userID: String, password: String }, thunkAPI) => {

        try {
            const res = await axios.post('/api/auth/login', { userID, password });
            // console.log('res: ', res);
            return res.data;
        } catch (err) {
            // console.log('err: ', err);
            return thunkAPI.rejectWithValue(err);
        }

    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginSuccess: (state, action: PayloadAction<Boolean>) => {
            state.loginSuccess = action.payload;
        }
    },
    extraReducers: {
        [postLogin.pending.type]: (state, action) => {
            state.loading = true;
        },
        [postLogin.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.loginSuccess = action.payload.loginSuccess;
            // console.log('action.payload: ', action.payload);
        },
        [postLogin.rejected.type]: (state, action) => {
            state.loading = false;
            // action.error.message = "Rejected
            state.loginSuccess = false;
        }
    }
})


export default loginSlice.reducer