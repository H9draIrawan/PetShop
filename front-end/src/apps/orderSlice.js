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
			axios.post(`${import.meta.env.VITE_API_URL}/api/order`, {
				details: action.payload.details,
				tanggal: action.payload.tanggal,
			});
		},
		ordersDeleted: (state, action) => {
			axios.delete(`${import.meta.env.VITE_API_URL}/api/order/` + action.payload);
		},
		ordersUpdated: (state, action) => {
			axios.put(`${import.meta.env.VITE_API_URL}/api/order/` + action.payload._id, {
				details: action.payload.details,
				tanggal: action.payload.tanggal,
			});
		},
		ordersFinished: (state, action) => {
			axios.put(`${import.meta.env.VITE_API_URL}/order/finish/` + action.payload)
		}
	},
});
export const { ordersLoaded, ordersAdded, ordersDeleted, ordersUpdated,ordersFinished } =
	orderSlice.actions;
export default orderSlice.reducer;
