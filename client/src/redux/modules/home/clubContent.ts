import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type ClubContent = {
    loading: Boolean,
    success: Boolean,
    page: Number,
    perPage: Number,
    contents: Array<Object>,
    contentsCount: Number,
}

const initialState: ClubContent = {
    loading: false,
    success: false,
    page: 1,
    perPage: 10,
    contents: [],
    contentsCount: 0,
}

export const getClubContents = createAsyncThunk(
    'clubContent/getClubContent',
    async ({ page, perPage }: { page: Number, perPage: Number }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/club/contents', { params: { page, perPage } })
            console.log('clubContent res', res);
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

export const postClubContent = createAsyncThunk(
    'clubContent/postClubContent',
    async ({ title, content, userID }: { title: String, content: String, userID: String }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/club/contents', { title, content, userID })
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

const clubContentSlice = createSlice({
    name: 'clubContent',
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
        // Get Club Contents
        [getClubContents.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getClubContents.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.contents = action.payload.contents;
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
        }
    }
})

export default clubContentSlice.reducer