import { createSlice } from "@reduxjs/toolkit";
export const reviewSlice = createSlice({
	name: "review",
	initialState: {
		reviews: [
			{
				_id: 1,
				id_order: 1,
				id_user: 1,
				rating: 5,
				kritik: "bagus",
				saran: "tambah lagi",
			},
			{
				_id: 2,
				id_order: 1,
				id_user: 1,
				rating: 3,
				kritik: "gak bagus",
				saran: "kurangi lagi",
			},
		],
	},
	reducers: {
		reviewsLoaded: (state, action) => {
			state.reviews = action.payload;
		},
	},
});
export const { reviewsLoaded } = reviewSlice.actions;
export default reviewSlice.reducer;
