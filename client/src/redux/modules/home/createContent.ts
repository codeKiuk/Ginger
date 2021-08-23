import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

type CreateContent = {
    loading: Boolean,
    success: Boolean,
    isCreateModalOpen: Boolean,
}

const initialState: CreateContent = {
    loading: false,
    success: false,
    isCreateModalOpen: false,
}

export const postClubContent = createAsyncThunk(
    'createContent/postClubContent',
    async ({ }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/club/contents', {});
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

export const postGroupContent = createAsyncThunk(
    'createContent/postGroupcontent',
    async ({ }, ThunkAPI) => {
        try {
            const res = await axios.post('/api/group/contents', {});
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

const createContentSlice = createSlice({
    name: 'createContent',
    initialState,
    reducers: {
        setIsCreateModalOpen: (state, action: PayloadAction<Boolean>) => {
            state.isCreateModalOpen = action.payload;
        }
    },
    extraReducers: {
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

export const { setIsCreateModalOpen } = createContentSlice.actions;
export default createContentSlice.reducer;