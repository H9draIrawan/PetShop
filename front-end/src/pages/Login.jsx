import { NavLink } from "react-router-dom";

export default function Login() {
	return (
		<form>
			<NavLink to={"/register"} className="bg-blue-500 px-3 py-1 rounded-lg">Register</NavLink>
            <br />
			<label>Username/Email : </label>
			<input type="text" className="border-black border-2"/>
			<br />
			<label>Password : </label>
			<input type="password" className="border-black border-2"/>
			<br />
			<button type="submit" className="bg-blue-500 px-3 py-1 rounded-lg">Login</button>
		</form>
	);
}
