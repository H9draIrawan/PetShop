import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const petSlice = createSlice({
	name: "pet",
	initialState: {
		pets: [],
	},
	reducers: {
		petsLoaded: (state, action) => {
			state.pets = action.payload;
		},
		petsAdded: (state, action) => {
			const formData = new FormData();
			formData.append("profile", action.payload.profile);
			formData.append("nama", action.payload.nama);
			formData.append("umur", action.payload.umur);
			formData.append("jenis", action.payload.jenis);
			formData.append("ras", action.payload.ras);
			axios.post(`${import.meta.env.VITE_API_URL}/api/pet`, formData);
		},
		petsUpdated: (state, action) => {
			axios.put(`${import.meta.env.VITE_API_URL}/api/pet/` + action.payload._id, {
				nama: action.payload.nama,
				umur: action.payload.umur,
				jenis: action.payload.jenis,
				ras: action.payload.ras,
			});
			const formData = new FormData();
			formData.append("profile", action.payload.profile);
			axios.put(
				`${import.meta.env.VITE_API_URL}/api/pet/profile/` + action.payload._id,
				formData,
			);
		},
		petsBanned: (state, action) => {
			axios.put(`${import.meta.env.VITE_API_URL}/api/pet/banned/` + action.payload);
		},
		petsUnbanned: (state, action) => {
			axios.put(`${import.meta.env.VITE_API_URL}/api/pet/unbanned/` + action.payload);
		},
	},
});
export const { petsLoaded, petsAdded, petsUpdated, petsBanned, petsUnbanned } =
	petSlice.actions;
export default petSlice.reducer;
