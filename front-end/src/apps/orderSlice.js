import { createSlice } from "@reduxjs/toolkit";
export const orderSlice = createSlice({
	name: "pet",
	initialState: {
		orders: [],
	},
	reducers: {
		ordersLoaded: (state, action) => {
			state.orders = action.payload;
		},
	},
});
export const { ordersLoaded } = orderSlice.actions;
export default orderSlice.reducer;
