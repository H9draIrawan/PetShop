import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
	},
	reducers: {
		usersLoaded: (state, action) => {
			state.users = action.payload;
		},
	},
});
export const { usersLoaded } = userSlice.actions;
export default userSlice.reducer;
