import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Pagination = {
    perPage: number,
    totalDocs: number,
}

const initialState: Pagination = {
    perPage: 10,
    totalDocs: 1,
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setTotalDocs: (state, action: PayloadAction<number>) => {
            state.totalDocs = action.payload;
        }
    },
    extraReducers: {

    }
})

export const { setTotalDocs } = paginationSlice.actions;
export default paginationSlice.reducer;