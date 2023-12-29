import { createSlice } from "@reduxjs/toolkit";
export const orderSlice = createSlice({
	name: "pet",
	initialState: {
		orders: [
			{
				_id: 1,
				id_user: 1,
				id_pet: 1,
				kategori: "grooming",
				harga : 100000,
				tanggal: Date.now(),
			},
			{
				_id: 1,
				id_user: 2,
				id_pet: 2,
				kategori: "grooming",
				harga : 100000,
				tanggal: Date.now(),
			},
		],
	},
	reducers: {
		ordersLoaded: (state, action) => {
			state.orders = action.payload;
		},
	},
});
export const {ordersLoaded} = orderSlice.actions;
export default orderSlice.reducer;
