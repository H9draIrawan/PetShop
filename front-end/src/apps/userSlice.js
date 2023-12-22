import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [
			{
				_id: 1,
				profile: "https://picsum.photos/536/354",
				nama: "kanna",
				username: "kanna04",
				password: "123",
				email: "kanna@gmail.com",
				alamat: "jalan kanna",
				kota: "kanna",
				no_hp: "08123456789",
				status: true,
			},
			{
				_id: 2,
				profile: "https://picsum.photos/536/354",
				nama: "maria",
				username: "maria04",
				password: "123",
				email: "maria@gmail.com",
				alamat: "jalan maria",
				kota: "maria",
				no_hp: "08123456788",
				status: false,
			},
		],
	},
});
export const {} = userSlice.actions;
export default userSlice.reducer;
