import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		verify : null
	},
	reducers: {
		usersLoaded: (state, action) => {
			state.users = action.payload;
		},
		usersUpdated: (state, action) => {
			axios.put(
				`${import.meta.env.VITE_API_URL}/api/user/${action.payload._id}`,
				{
					nama: action.payload.nama,
					username: action.payload.username,
					email: action.payload.email,
					password: action.payload.password,
					alamat: action.payload.alamat,
					kota: action.payload.kota,
					no_hp: action.payload.no_hp,
				},
			);
			// const formData = new FormData();
			// formData.append("profile", action.payload.profile);
			// axios.post(
			// 	`${import.meta.env.VITE_API_URL}/api/user/profile/${
			// 		action.payload._id
			// 	}`,
			// 	formData,
			// );
		},
		usersDeleted: (state, action) => {
			axios.delete(
				`${import.meta.env.VITE_API_URL}/api/user/${action.payload}`,
			);
		},
		usersBanned: (state, action) => {
			axios.put(
				`${import.meta.env.VITE_API_URL}/api/user/banned/${action.payload}`,
			);
		},
		userUnbanned: (state, action) => {
			axios.put(
				`${import.meta.env.VITE_API_URL}/api/user/unbanned/${action.payload}`,
			);
		},
	},
});
export const {
	usersLoaded,
	usersUpdated,
	usersDeleted,
	usersBanned,
	userUnbanned,
} = userSlice.actions;
export default userSlice.reducer;
