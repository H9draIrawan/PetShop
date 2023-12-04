import { NavLink, Outlet } from "react-router-dom";

export default function Home() {
	return (
		<div>
			<NavLink to={"/Home"} className="text-3xl font-bold">Pet Shop</NavLink>
			<NavLink to={"Profile"} className="bg-blue-500 rounded-lg mx-5 px-3">Profile</NavLink>
			<NavLink to={"Pet"} className="bg-blue-500 rounded-lg mx-5 px-3">Pet</NavLink>
			<br />
			<Outlet />
		</div>
	);
}
