import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

type CreateContent = {
    isCreateModalOpen: Boolean,
}

const initialState: CreateContent = {
    isCreateModalOpen: false,
}

const createContentSlice = createSlice({
    name: 'createContent',
    initialState,
    reducers: {
        setIsCreateModalOpen: (state, action: PayloadAction<Boolean>) => {
            state.isCreateModalOpen = action.payload;
        }
    },
})

export const { setIsCreateModalOpen } = createContentSlice.actions;
export default createContentSlice.reducer;