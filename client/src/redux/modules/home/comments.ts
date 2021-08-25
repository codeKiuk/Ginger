import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

type Comments = {
    loading: Boolean,
    success: Boolean,
    clubComments: Array<Object>,
    groupComments: Array<Object>
}

const initialState: Comments = {
    loading: false,
    success: false,
    clubComments: [],
    groupComments: []
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

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getClubComments.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getClubComments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.clubComments = action.payload.comments;
            state.success = true;
        },
        [getClubComments.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [getGroupComments.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getGroupComments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.groupComments = action.payload.comments;
            state.success = true;
        },
        [getGroupComments.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    },
})


export default commentsSlice.reducer;