import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
	},
	reducers: {
		usersLoaded: (state, action) => {
			state.users = action.payload;
		},
		usersUpdated: (state, action) => {
			const formData = new FormData();
			formData.append("nama", action.payload.nama);
			formData.append("username", action.payload.username);
			formData.append("email", action.payload.email);
			formData.append("password", action.payload.password);
			formData.append("alamat", action.payload.alamat);
			formData.append("kota", action.payload.kota);
			formData.append("no_hp", action.payload.no_hp);
			formData.append("profile", action.payload.profile);
			axios.put(
				`http://localhost:3000/api/user/${action.payload._id}`,
				formData,
			);
		},
		usersDeleted: (state, action) => {
			axios.delete(`http://localhost:3000/api/user/${action.payload}`);
		},
		usersBanned: (state, action) => {
			axios.put(`http://localhost:3000/api/user/banned/${action.payload}`);
		},
		userUnbanned: (state, action) => {
			axios.put(
				`http://localhost:3000/api/user/unbanned/${action.payload}`,
			);
		}
	},
});
export const { usersLoaded, usersUpdated, usersDeleted, usersBanned,userUnbanned } =
	userSlice.actions;
export default userSlice.reducer;
