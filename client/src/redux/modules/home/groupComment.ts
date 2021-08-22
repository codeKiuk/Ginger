import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type GroupComment = {
    loading: Boolean,
    success: Boolean,
    comments: Array<Object>
}

const initialState: GroupComment = {
    loading: false,
    success: false,
    comments: []
}

export const getGroupComments = createAsyncThunk(
    'groupComment/getGroupComments',
    async ({ contentID }: { contentID: String }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/group/comments', { params: { contentID: contentID } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

const groupCommentSlice = createSlice({
    name: 'groupComments',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getGroupComments.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getGroupComments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.comments = action.payload.comments;
            state.success = true;
        },
        [getGroupComments.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    }
})

export default groupCommentSlice.reducer