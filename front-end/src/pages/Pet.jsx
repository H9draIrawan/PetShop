import { NavLink, Outlet } from "react-router-dom";

export default function Pet() {
	return (
		<>
			<NavLink to={"Add"} className="bg-blue-500 px-3 mx-5">
				Add Pet
			</NavLink>
			<NavLink to={"Delete"} className="bg-blue-500 px-3 mx-5">
				Delete Pet
			</NavLink>
			<NavLink to={"Update"} className="bg-blue-500 px-3 mx-5">
				Update Pet
			</NavLink>
			<Outlet />
		</>
	);
}
