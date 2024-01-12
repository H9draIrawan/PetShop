import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
	TextField,
	Button,
	Container,
	Typography,
	Paper,
	Grid,
	Box,
} from "@mui/material";
import bgRegister from "../assets/bgRegister.svg";
import axios from "axios";
import Navbar from "../components/Navbar";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		if (email === "admin@petshop.com" && password === "admin@petshop.com") {
			localStorage.setItem("admin", true);
			navigate("/admin");
			return;
		}
		event.preventDefault();

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/user/login`,
				{
					email: email,
					password: password,
				},
			);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			navigate("/home");
		} catch (error) {
			if (error.response.data.message === "User not verified") {
				localStorage.setItem("verify", email);
				localStorage.setItem("token", true);
				navigate("/verification");
			} else if (error.response.data.message === "User not found") {
				alert("Email not found");
			} else if (error.response.data.message === "Wrong password") {
				alert("Wrong password");
			}
		}
		setEmail("");
		setPassword("");
	};

	return (
		<>
			<Navbar style={{ position: "relative", zIndex: 1}}/>
			<div
				style={{
					position: "relative",
					backgroundImage: `url(${bgRegister})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100vh",
					zIndex: "0"
				}}
			>
				<Container component="main" style={{ position: 'relative', zIndex: 1 }}>
					{/* <Button variant="contained" sx={{ mb: 10 }}>
						<Link to="/home">HOME</Link>
					</Button> */}
					<Paper
						elevation={3}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
						sx={{ mx: 40, px: 5, py: 3, my: 0 }}
					>
						<Typography variant="h4">Login</Typography>
						<Box style={{ width: "100%" }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										type="email"
										variant="outlined"
										fullWidth
										label="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										type="password"
										variant="outlined"
										fullWidth
										label="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Grid>
							</Grid>
							<Button
								type="button"
								fullWidth
								variant="contained"
								color="primary"
								onClick={handleLogin}
								style={{ marginTop: 16 }}
							>
								Login
							</Button>
						</Box>
					</Paper>
					<Typography
						variant="body1"
						style={{ marginTop: 10, textAlign: "right", marginRight: "20rem" }}
					>
						Belum punya akun?{" "}
						<NavLink
							component={NavLink}
							to="/register"
							style={{ textDecoration: "none", color: "blue" }}
						>
							Register
						</NavLink>
					</Typography>
				</Container>
			</div>
		</>
	);
};

export default Login;
