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
				tanggal: Date.now(),
			},
			{
				_id: 1,
				id_user: 2,
				id_pet: 2,
				kategori: "grooming",
				tanggal: Date.now(),
			},
		],
	},
});
export const {} = orderSlice.actions;
export default orderSlice.reducer;
