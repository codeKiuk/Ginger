import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ContentSubject { CLUB_CONTENT, GROUP_CONTENT, MY_CONTENT, MY_COMMENT, PROFILE }

type ContentsMenu = {
    isOpen: Boolean,
    contentSubject: ContentSubject
}

const initialState: ContentsMenu = {
    isOpen: false,
    contentSubject: ContentSubject.CLUB_CONTENT
}

const contentMenuSlice = createSlice({
    name: 'contentsMenu',
    initialState,
    reducers: {
        setContentMenuOpen: (state, action: PayloadAction<Boolean>) => {
            state.isOpen = action.payload;
        },
        setContentSubject: (state, action: PayloadAction<ContentSubject>) => {
            state.contentSubject = action.payload;
            console.log('state.contentSubject: ', state.contentSubject);
        }
    }
})

export const { setContentMenuOpen, setContentSubject } = contentMenuSlice.actions
export default contentMenuSlice.reducer