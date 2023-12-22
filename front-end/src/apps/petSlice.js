import { createSlice } from "@reduxjs/toolkit";
export const petSlice = createSlice({
	name: "pet",
	initialState: {
		pets: [
			{
				_id: 1,
				id_user: 1,
				profile: "https://picsum.photos/536/354",
				nama: "doggy",
				umur: 2,
				jenis: "anjing",
				ras: "bulldog",
			},
			{
				_id: 2,
				id_user: 2,
				profile: "https://picsum.photos/536/354",
				nama: "catty",
				umur: 2,
				jenis: "kucing",
				ras: "persia",
			},
		],
	},
});
export const {} = petSlice.actions;
export default petSlice.reducer;
