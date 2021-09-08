import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

type Comments = {
    loading: boolean,
    success: boolean,
    comments: Array<{
        _id: string,
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

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({ commentID }: { commentID: string }, ThunkAPI) => {
        try {
            const res = await axios.delete('/api/comments', { data: { commentID: commentID } })
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
        // Get Comments of This Content
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
        // Get Info of This Content
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
        // Post Comment
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
        },
        // Delete Comment
        [deleteComment.pending.type]: (state, action) => {
            state.loading = true;
        },
        [deleteComment.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        [deleteComment.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    },
})


export default commentsSlice.reducer;