import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ContentsMenu = {
    isOpen: Boolean,
}

const initialState: ContentsMenu = {
    isOpen: false,
}

const contentsMenuSlice = createSlice({
    name: 'contentsMenu',
    initialState,
    reducers: {
        setContentsMenuOpen: (state, action: PayloadAction<Boolean>) => {
            state.isOpen = action.payload;
        }
    }
})

export const { setContentsMenuOpen } = contentsMenuSlice.actions
export default contentsMenuSlice.reducer