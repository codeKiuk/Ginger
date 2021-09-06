import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type UpdateContentModal = {
    loading: boolean,
    success: boolean,
    isOpen: boolean
}

const initialState: UpdateContentModal = {
    loading: false,
    success: false,
    isOpen: false,
}

export const updateContent = createAsyncThunk(
    'updateContentModal/updateContent',
    async ({ contentID, title, content }: { contentID: string, title: string, content: string }, ThunkAPI) => {
        try {
            const res = await axios.put('/api/contents', { contentID: contentID, title: title, content: content });
            return res.data
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
)

const updateContentModalSlice = createSlice({
    name: 'updateContentModal',
    initialState,
    reducers: {
        setUpdateContentModal: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    },
    extraReducers: {
        // Update Content
        [updateContent.pending.type]: (state, action) => {
            state.loading = true;
        },
        [updateContent.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        [updateContent.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        },
    }
})

export const { setUpdateContentModal } = updateContentModalSlice.actions
export default updateContentModalSlice.reducer;