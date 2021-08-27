import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type MyComment = {
    loading: Boolean,
    success: Boolean
    comments: Array<Object>
};

const initialState: MyComment = {
    loading: false,
    success: false,
    comments: []
};

export const getMyComments = createAsyncThunk(
    'myComment/getMyComment',
    async ({ userID, page, perPage }: { userID: string, page: Number, perPage: Number }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/my-comments', { params: { userID: userID, page: page, perPage: perPage } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
);

const myCommentsSlice = createSlice({
    name: 'myComment',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getMyComments.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getMyComments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.comments = action.payload.comments;
            state.success = true;
        },
        [getMyComments.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    }
});


export default myCommentsSlice.reducer;