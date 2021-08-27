import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { createShorthandPropertyAssignment } from 'typescript';

type Comments = {
    loading: Boolean,
    success: Boolean,
    comments: Array<{
        userID: string,
        comment: string,
        contentType: Number,
    }>,
    singleContent: {
        title: string,
        content: string,
        userID: string,
        contentType: Number,
    },
}

const initialState: Comments = {
    loading: false,
    success: false,
    comments: [],
    singleContent: {
        title: '',
        content: '',
        userID: '',
        contentType: -1,
    },
}

export const getComments = createAsyncThunk(
    'comments/getComments',
    async ({ contentID }: { contentID: string }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/comments', { params: { contentID: contentID } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

export const getSingleContent = createAsyncThunk(
    'comments/getSingleContent',
    async ({ contentID }: { contentID: string }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/single-content', { params: { contentID: contentID } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err)
        }
    }
)

export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({ userID, comment, contentID }: { userID: string, comment: string, contentID: string }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/comments', { userID, comment, contentID });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err)
        }
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getComments.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getComments.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.comments = action.payload.comments;
            state.success = true;
        },
        [getComments.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [getSingleContent.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getSingleContent.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.singleContent = action.payload.content
            state.success = true;
        },
        [getSingleContent.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        [postComment.pending.type]: (state, action) => {
            state.loading = true;
        },
        [postComment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        [postComment.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    },
})


export default commentsSlice.reducer;