import { createSlice } from "@reduxjs/toolkit";
export const reviewSlice = createSlice({
	name: "review",
	initialState: {
		reviews: [],
	},
	reducers: {
		reviewsLoaded: (state, action) => {
			state.reviews = action.payload;
		},
	},
});
export const { reviewsLoaded } = reviewSlice.actions;
export default reviewSlice.reducer;
