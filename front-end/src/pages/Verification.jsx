import React, { useEffect, useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Verification = () => {
	const navigate = useNavigate();
	const [verificationCode, setVerificationCode] = useState(null);
	const [time, setTime] = useState(180);

	useEffect(() => {
		handleResend()
	}, []);

	useEffect(() => {
		if (time > 0) {
			setTimeout(() => setTime(time - 1), 1000);
		}
	}, [time]);

	const handleSubmit = async () => {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/user/verify`,
			{
				token: verificationCode,
			},
		);
		if (response.data.message === "User verified") {
			navigate("/login");
		}
	};
	const handleResend = async () => {
		await axios.post(`${import.meta.env.VITE_API_URL}/api/user/token`, {
			email: localStorage.getItem("email"),
		});
		setTime(180);
	};
	return (
		<Container>
			{!localStorage.getItem("verify") && <Navigate to="/home" />}
			<Button
				variant="contained"
				sx={{ mt: 3 }}
				onClick={() => localStorage.removeItem("verify")}
			>
				<Link to="/home">HOME</Link>
			</Button>
			<Stack spacing={3} sx={{ mt: 5, px: 50, alignItems: "center" }}>
				<Typography variant="h4" sx={{ textAlign: "center" }}>
					VERIFICATION
				</Typography>
				<TextField
					label="Verification Code"
					variant="outlined"
					value={verificationCode}
					onChange={(e) => setVerificationCode(e.target.value)}
					fullWidth
				/>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={handleSubmit}
				>
					VERIFY
				</Button>
				{time == 0 && (
					<Button variant="outlined" color="primary" onClick={handleResend}>
						RESEND
					</Button>
				)}
				{time > 0 && <Typography>Gunakan sebelum : {time}</Typography>}
			</Stack>
		</Container>
	);
};

export default Verification;
