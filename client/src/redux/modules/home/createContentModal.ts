import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

type CreateContentModal = {
    isCreateModalOpen: Boolean,
}

const initialState: CreateContentModal = {
    isCreateModalOpen: false,
}

const createContentModalSlice = createSlice({
    name: 'createContent',
    initialState,
    reducers: {
        setIsCreateModalOpen: (state, action: PayloadAction<Boolean>) => {
            state.isCreateModalOpen = action.payload;
        }
    },
})

export const { setIsCreateModalOpen } = createContentModalSlice.actions;
export default createContentModalSlice.reducer;