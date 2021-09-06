import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CreateContentModal = {
    isCreateModalOpen: boolean,
}

const initialState: CreateContentModal = {
    isCreateModalOpen: false,
}

const createContentModalSlice = createSlice({
    name: 'createContent',
    initialState,
    reducers: {
        setIsCreateContentModal: (state, action: PayloadAction<boolean>) => {
            state.isCreateModalOpen = action.payload;
        }
    },
})

export const { setIsCreateContentModal } = createContentModalSlice.actions;
export default createContentModalSlice.reducer;