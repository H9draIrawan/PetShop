import { Button } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

export default function Pet() {
	return (
		<>
			<NavLink to={"Add"}>
				<Button variant="contained" sx={{ m: 3 }}>
					Tambah Pet
				</Button>
			</NavLink>
			<NavLink to={"Delete"}>
				<Button variant="contained" sx={{ m: 3 }}>
					Hapus Pet
				</Button>
			</NavLink>
			<NavLink to={"Update"}>
				<Button variant="contained" sx={{ m: 3 }}>
					Perbarui Pet
				</Button>
			</NavLink>
			<Outlet />
		</>
	);
}
