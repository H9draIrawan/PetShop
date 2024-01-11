import React, { useEffect, useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Verification = () => {
	const navigate = useNavigate();
	const [verificationCode, setVerificationCode] = useState(null);
	const [time, setTime] = useState(0);

	useEffect(() => {
		if (!localStorage.getItem("verify")) {
			navigate("/login");
		}
		else if (localStorage.getItem("verify") && localStorage.getItem("token")) {
			handleResend();
			setTime(60);
			localStorage.removeItem("token");
		}
		else if(localStorage.getItem("verify") && !localStorage.getItem("token")){
			setTime(localStorage.getItem("time"));
		}
	}, []);

	useEffect(() => {
		if (time > 0) {
			setTimeout(() => setTime(time - 1), 1000);
			localStorage.setItem("time", time);
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
			localStorage.removeItem("verify");
			localStorage.removeItem("token");
			navigate("/login");
		}
	};
	const handleResend = async () => {
		await axios.post(`${import.meta.env.VITE_API_URL}/api/user/token`, {
			email: localStorage.getItem("verify"),
		});
		setTime(60);
	};
	const formatTime = (time) => {
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};
	return (
		<Container>
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
				{time > 0 && <Typography>{formatTime(time)}</Typography>}
			</Stack>
		</Container>
	);
};

export default Verification;
