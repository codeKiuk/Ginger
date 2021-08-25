import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type GroupContent = {
    loading: Boolean,
    success: Boolean,
    page: Number,
    perPage: Number,
    contents: Array<Object>,
    contentsCount: Number,
}

const initialState: GroupContent = {
    loading: false,
    success: false,
    page: 1,
    perPage: 10,
    contents: [],
    contentsCount: 0,
}

export const getGroupContents = createAsyncThunk(
    'groupContent/getGroupContent',
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
    'groupContent/postGroupContent',
    async ({ title, content, userID }: { title: String, content: String, userID: String }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/group/contents', { title, content, userID })
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

const groupContentSlice = createSlice({
    name: 'GroupContent',
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
            state.contents = action.payload.contents;
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
        }
    }
})

export default groupContentSlice.reducer