import {createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import axios from "../../_global/axios";
import { Rates } from "../../types/Rates";


interface InitialState {
	loading: boolean;
	result: {time: number, rates: Rates} | null;
	error: string;
}
const initialState: InitialState = {
	loading: false,
	result: null,
	error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetch = createAsyncThunk("exchangeRate/fetch", async () => {
	return await axios.get("/latest").then(response => response.data);
});

const exchangeRateSlice = createSlice({
	name: "exchangeRate",
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
				state.result ={time: Date.now(), rates: action.payload.rates};
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

export default exchangeRateSlice.reducer;
