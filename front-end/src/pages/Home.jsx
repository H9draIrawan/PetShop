import { NavLink, Outlet } from "react-router-dom";

export default function Home() {
	return (
		<div>
			<NavLink to={"/Home"} className="text-3xl font-bold">Pet Shop</NavLink>
			<NavLink to={"Profile"} className="bg-blue-500 rounded-lg mx-5 px-3">Profile</NavLink>
			<NavLink to={"Pet"} className="bg-blue-500 rounded-lg mx-5 px-3">Pet</NavLink>
			<NavLink to={"kritik-saran"} className="bg-blue-500 rounded-lg mx-5 px-3">Kritik dan Saran</NavLink>
			<NavLink to={"/registerLogin"} className="bg-blue-500 rounded-lg mx-5 px-3">Register/Login</NavLink>
			<br />
			<br />

			<Outlet />
		</div>
	);
}
