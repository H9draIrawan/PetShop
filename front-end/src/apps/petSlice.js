import { createSlice } from "@reduxjs/toolkit";
export const petSlice = createSlice({
	name: "pet",
	initialState: {
		pets: [],
	},
	reducers: {
		petsLoaded: (state, action) => {
			state.pets = action.payload;
		},
	},
});
export const { petsLoaded } = petSlice.actions;
export default petSlice.reducer;
