import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const transactionSlice = createSlice({
	name: "transaction",
	initialState: {
		transactions: [],
	},
	reducers: {
		transactionsLoaded: (state, action) => {
			state.transactions = action.payload;
		},
		transactionsCreated: (state, action) => {
			axios.post("http://localhost:3000/api/transaction", {
				id_user: action.payload.user._id,
				id_order: action.payload._id,
				nama: action.payload.user.nama,
				username: action.payload.user.username,
				email: action.payload.user.email,
				no_hp: action.payload.user.no_hp,
				harga: action.payload.total,
				tanggal: action.payload.tanggal,
			});
		},
		transactionsCanceled: (state, action) => {
			axios.put(
				"http://localhost:3000/api/transaction/cancel/" + action.payload,
			);
		},
	},
});
export const { transactionsLoaded, transactionsCreated, transactionsCanceled } =
	transactionSlice.actions;
export default transactionSlice.reducer;
