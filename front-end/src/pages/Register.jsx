import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
import { useAuth } from "../components/Auth";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
	const { login } = useAuth();
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

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/user/register`,
				{
					nama: formData.nama,
					username: formData.username,
					email: formData.email,
					password: formData.password,
					alamat: formData.alamat,
					kota: formData.kota,
					no_hp: formData.no_hp,
				},
			);

			setFormData({
        nama : "",
				username: "",
				email: "",
				password: "",
				alamat: "",
				kota: "",
				no_hp: "",
			});

      navigate("/login");
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
						<Typography
							variant="body1"
							style={{ textAlign: "right", marginTop: 30, marginRight: 30 }}
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
					</Paper>
				</Container>
			</div>
		</>
	);
};

export default Register;
