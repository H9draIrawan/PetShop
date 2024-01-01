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
				details: action.payload.details,
				tanggal: action.payload.tanggal,
			});
		},
		ordersDeleted: (state, action) => {
			axios.delete("http://localhost:3000/api/order/" + action.payload);
		},
		ordersUpdated: (state, action) => {
			axios.put("http://localhost:3000/api/order/" + action.payload._id, {
				details: action.payload.details,
				tanggal: action.payload.tanggal,
			});
		},
		ordersFinished: (state, action) => {
			axios.put("http://localhost:3000/api/order/finish/" + action.payload)
		}
	},
});
export const { ordersLoaded, ordersAdded, ordersDeleted, ordersUpdated,ordersFinished } =
	orderSlice.actions;
export default orderSlice.reducer;
