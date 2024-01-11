import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
	TextField,
	Button,
	Container,
	Typography,
	Paper,
	Box,
	Stack,
} from "@mui/material";
import bgRegister from "../assets/bgRegister.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { usersLoaded } from "../apps/userSlice";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/user`)
			.then(function (response) {
				dispatch(usersLoaded(response.data));
				console.log(response.data);
			});
	}, []);
	const users = useSelector((state) => state.user.users);

	const UserSchema = (email) => {
		const user = users.find((user) => user.email === email);
		if (user) return true;
		return false;
	};
	const [formData, setFormData] = useState({
		nama: "",
		username: "",
		email: "",
		password: "",
		alamat: "",
		kota: "",
		no_hp: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!formData.username ||
			!formData.email ||
			!formData.password ||
			!formData.alamat ||
			!formData.kota ||
			!formData.no_hp
		) {
			alert("Please fill in all fields");
			return;
		}

		if (UserSchema(formData.email)) return alert("Email already registered");

		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, {
				nama: formData.nama,
				username: formData.username,
				email: formData.email,
				password: formData.password,
				alamat: formData.alamat,
				kota: formData.kota,
				no_hp: formData.no_hp,
			});
			setFormData({
				nama: "",
				username: "",
				email: "",
				password: "",
				alamat: "",
				kota: "",
				no_hp: "",
			});

			localStorage.setItem("verify", formData.email);
			localStorage.setItem("token", true);
			navigate("/verification");
		} catch (error) {
			console.error(error);
			alert("Registration failed. Please try again.");
		}
	};

	return (
		<>
			{/* <Navbar /> */}
			<div
				style={{
					backgroundImage: `url(${bgRegister})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Container component="main">
					<Button variant="contained" sx={{ mt: 3 }}>
						<Link to="/home">HOME</Link>
					</Button>
					<Paper sx={{ mt: 5, mb: 5, mx: 30, py: 3 }} elevation={3}>
						<Typography variant="h4" sx={{ textAlign: "center" }}>
							Register
						</Typography>
						<br />
						<Box component="form" onSubmit={handleSubmit}>
							<Stack spacing={3} sx={{ alignItems: "center" }}>
								<Stack direction="row" spacing={3}>
									<TextField
										type="text"
										label="Nama"
										variant="outlined"
										name="nama"
										value={formData.nama}
										onChange={handleChange}
										sx={{ width: 300 }}
									/>
									<TextField
										type="text"
										label="Username"
										variant="outlined"
										name="username"
										value={formData.username}
										onChange={handleChange}
										sx={{ width: 300 }}
									/>
								</Stack>
								<Stack direction="row" spacing={3}>
									<TextField
										type="email"
										label="Email"
										variant="outlined"
										name="email"
										value={formData.email}
										onChange={handleChange}
										sx={{ width: 300 }}
									/>
									<TextField
										type="password"
										label="Password"
										variant="outlined"
										name="password"
										value={formData.password}
										onChange={handleChange}
										sx={{ width: 300 }}
									/>
								</Stack>
								<TextField
									type="text"
									label="Alamat"
									variant="outlined"
									name="alamat"
									value={formData.alamat}
									onChange={handleChange}
									sx={{ width: 625 }}
								/>
								<TextField
									type="text"
									label="Kota"
									variant="outlined"
									name="kota"
									value={formData.kota}
									onChange={handleChange}
									sx={{ width: 625 }}
								/>
								<TextField
									type="tel"
									label="Nomor Telepon"
									variant="outlined"
									name="no_hp"
									value={formData.no_hp}
									onChange={handleChange}
									sx={{ width: 625 }}
								/>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									sx={{ width: 300 }}
								>
									Register
								</Button>
							</Stack>
						</Box>
					</Paper>
					<Typography
						variant="body1"
						style={{ textAlign: "right", margin: 30 }}
					>
						Sudah punya akun?{" "}
						<NavLink
							component={NavLink}
							to="/login"
							style={{ textDecoration: "none", color: "blue" }}
						>
							Login
						</NavLink>
					</Typography>
				</Container>
			</div>
		</>
	);
};

export default Register;
