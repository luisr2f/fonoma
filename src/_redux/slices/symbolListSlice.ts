import {createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import axios from "../../_global/axios";
import { Simbols} from "../../types/Simbols";


interface InitialState {
	loading: boolean;
	result: Simbols | null;
	error: string;
}
const initialState: InitialState = {
	loading: false,
	result: null,
	error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetch = createAsyncThunk("simbolList/fetch", async () => {
	return await axios.get("/symbols").then(response => response.data);
});

const simbolListSlice = createSlice({
	name: "simbolList",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetch.pending, state => {
			state.loading = true;
			state.result =  initialState.result;
			state.error = "";
		});
		builder.addCase(fetch.fulfilled, (state, action: PayloadAction<any>) => {
			state.loading = false;
			if ( action.payload.success) {
				state.result = action.payload.symbols;
				state.error = "";
			} else {
				state.result = initialState.result;
				state.error = action.payload?.message ?? "Something went wrong";
			}
		});
		builder.addCase(fetch.rejected, (state, action) => {
			state.loading = false;
			state.result = initialState.result;
			state.error = action.error.message ?? "Something went wrong";
		});
	},
});

export default simbolListSlice.reducer;
