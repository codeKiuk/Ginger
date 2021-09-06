import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UpdateContentModal = {
    isOpen: boolean
}

const initialState: UpdateContentModal = {
    isOpen: false,
}

const updateContentModalSlice = createSlice({
    name: 'updateContentModal',
    initialState,
    reducers: {
        setUpdateContentModal: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    },
})

export const { setUpdateContentModal } = updateContentModalSlice.actions
export default updateContentModalSlice.reducer;