import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const orderSlice = createSlice({
	name: "pet",
	initialState: {
		orders: [],
	},
	reducers: {
		ordersLoaded: (state, action) => {
			state.orders = action.payload;
		},
		ordersAdded: (state, action) => {
			axios.post("http://localhost:3000/api/order", {
				details : action.payload.details,
				tanggal : action.payload.tanggal,
			});
		},
	},
});
export const { ordersLoaded, ordersAdded } = orderSlice.actions;
export default orderSlice.reducer;
