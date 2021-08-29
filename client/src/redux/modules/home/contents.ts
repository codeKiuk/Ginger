import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

type Contents = {
    loading: Boolean,
    success: Boolean,
    page: Number,
    perPage: Number,
    clubContents: Array<Object>,
    groupContents: Array<Object>,
    contentsCount: number,
}

const initialState: Contents = {
    loading: false,
    success: false,
    page: 1,
    perPage: 10,
    clubContents: [],
    groupContents: [],
    contentsCount: -1,
}

export const deleteContent = createAsyncThunk(
    'contents/deleteContent',
    async ({ contentID }: { contentID: string }, ThunkAPI) => {
        try {
            const res = await axios.delete('/api/contents', { data: { contentID: contentID } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

/**
 *              Group Contents
 */
export const getGroupContents = createAsyncThunk(
    'contents/getGroupContent',
    async ({ page, perPage }: { page: Number, perPage: Number }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/group/contents', { params: { page, perPage } })
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)
export const postGroupContent = createAsyncThunk(
    'contents/postGroupContent',
    async ({ title, content, userID }: { title: String, content: String, userID: String }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/group/contents', { title, content, userID })
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

/**
 *              Club Contents
 */
export const getClubContents = createAsyncThunk(
    'contents/getClubContent',
    async ({ page, perPage }: { page: Number, perPage: Number }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/club/contents', { params: { page, perPage } })
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

export const postClubContent = createAsyncThunk(
    'contents/postClubContent',
    async ({ title, content, userID }: { title: String, content: String, userID: String }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/club/contents', { title, content, userID })
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

const contentsSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<Number>) => {
            state.page = action.payload;
        },
        setPerPage: (state, action: PayloadAction<Number>) => {
            state.perPage = action.payload;
        }
    },
    extraReducers: {
        // Get Group Contents
        [getGroupContents.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getGroupContents.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.groupContents = action.payload.contents;
            state.contentsCount = action.payload.contentsCount;
            state.success = true;
        },
        [getGroupContents.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        // Post Group Content
        [postGroupContent.pending.type]: (state, action) => {
            state.loading = true;
        },
        [postGroupContent.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        [postGroupContent.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        // Get Club Contents
        [getClubContents.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getClubContents.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.clubContents = action.payload.contents;
            state.contentsCount = action.payload.contentsCount;
            state.success = true;
        },
        [getClubContents.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        // Post Club Content
        [postClubContent.pending.type]: (state, action) => {
            state.loading = true;
        },
        [postClubContent.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        [postClubContent.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
        // Delete Content
        [deleteContent.pending.type]: (state, action) => {
            state.loading = true;
        },
        [deleteContent.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        [deleteContent.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
    }
})

export const { setPage, setPerPage } = contentsSlice.actions;
export default contentsSlice.reducer