import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type ClubComment = {
    loading: Boolean,
    success: Boolean,
    comments: Array<Object>
}

const initialState: ClubComment = {
    loading: false,
    success: false,
    comments: []
}

export const getClubComments = createAsyncThunk(
    'clubComment/getClubComments',
    async ({ contentID }: { contentID: String }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/club/comments', { params: { contentID: contentID } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

const clubCommentSlice = createSlice({
    name: 'clubComments',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getClubComments.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getClubComments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.comments = action.payload.comments;
            state.success = true;
        },
        [getClubComments.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    }
})

export default clubCommentSlice.reducer