import { NavLink } from "react-router-dom";

export default function Register() {
	return (
		<form>
			<NavLink to={"/login"} className="bg-blue-500 px-3 py-1 rounded-lg">
				Login
			</NavLink>
			<br />
			<label>Name : </label>
			<input type="text" className="border-black border-2" />
			<br />
			<label>Username : </label>
			<input type="text" className="border-black border-2" />
			<br />
			<label>Email : </label>
			<input type="email" className="border-black border-2" />
			<br />
			<label>No. Hp : </label>
			<input type="text" className="border-black border-2" />
			<br />
			<label>Password : </label>
			<input type="password" className="border-black border-2" />
			<br />
			<label>Confirm Password: </label>
			<input type="password" className="border-black border-2" />
			<br />
			<button type="submit" className="bg-blue-500 px-3 py-1 rounded-lg">
				Register
			</button>
		</form>
	);
}
