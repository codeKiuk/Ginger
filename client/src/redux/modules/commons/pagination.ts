import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Pagination = {
    page: number,
    perPage: number,
    totalDocs: number,
}

const initialState: Pagination = {
    page: 1,
    perPage: 10,
    totalDocs: 1,
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setTotalDocs: (state, action: PayloadAction<number>) => {
            state.totalDocs = action.payload;
        }
    },
    extraReducers: {

    }
})

export const { setPage, setTotalDocs } = paginationSlice.actions;
export default paginationSlice.reducer;