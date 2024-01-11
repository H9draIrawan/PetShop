import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const reviewSlice = createSlice({
	name: "review",
	initialState: {
		reviews: [],
	},
	reducers: {
		reviewsLoaded: (state, action) => {
			state.reviews = action.payload;
		},
		reviewsAdded: (state, action) => {
			axios.post(`${import.meta.env.VITE_API_URL}/api/review`, {
				id_user: action.payload.id_user,
				id_order: action.payload.id_order,
				rating: action.payload.rating,
				kritik: action.payload.kritik,
				saran: action.payload.saran,
			});
		},
	},
});
export const { reviewsLoaded, reviewsAdded } = reviewSlice.actions;
export default reviewSlice.reducer;
