import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type MyContent = {
    loading: Boolean,
    success: Boolean
    contents: Array<Object>
};

const initialState: MyContent = {
    loading: false,
    success: false,
    contents: []
};

export const getMyContent = createAsyncThunk(
    'myContent/getMyContent',
    async ({ userID }: { userID: string }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/my/contents', { params: { userID: userID } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
);

const myContentSlice = createSlice({
    name: 'myContent',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getMyContent.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getMyContent.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.contents = action.payload.contents;
            state.success = true;
        },
        [getMyContent.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    }
});


export default myContentSlice.reducer;