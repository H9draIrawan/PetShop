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
			axios.post("http://localhost:3000/api/pet", formData);
		},
		petsUpdated: (state, action) => {
			axios.put("http://localhost:3000/api/pet/" + action.payload._id, {
				nama: action.payload.nama,
				umur: action.payload.umur,
				jenis: action.payload.jenis,
				ras: action.payload.ras,
			});
			const formData = new FormData();
			formData.append("profile", action.payload.profile);
			axios.put(
				"http://localhost:3000/api/pet/profile" + action.payload._id,
				formData,
			);
		},
		petsDeleted: (state, action) => {
			axios.delete("http://localhost:3000/api/pet/" + action.payload);
		},
	},
});
export const { petsLoaded, petsAdded, petsUpdated, petsDeleted } =
	petSlice.actions;
export default petSlice.reducer;
