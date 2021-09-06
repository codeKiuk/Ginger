import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type MyContent = {
    loading: boolean,
    success: boolean
    contents: Array<Object>
    contentsCount: number,
};

const initialState: MyContent = {
    loading: false,
    success: false,
    contents: [],
    contentsCount: -1,
};

export const getMyContents = createAsyncThunk(
    'myContent/getMyContent',
    async ({ userID, page, perPage }: { userID: string, page: Number, perPage: Number }, ThunkAPI) => {
        try {
            const res = await axios.get('/api/my-contents', { params: { userID: userID, page: page, perPage: perPage } });
            return res.data;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err);
        }
    }
);

const myContentsSlice = createSlice({
    name: 'myContent',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getMyContents.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getMyContents.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.contents = action.payload.contents;
            state.contentsCount = action.payload.contentsCount;
            state.success = true;
        },
        [getMyContents.rejected.type]: (state, action) => {
            state.loading = false;
            state.success = false;
        }
    }
});


export default myContentsSlice.reducer;