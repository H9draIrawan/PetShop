import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const LogoutModal = ({ open, onClose, onConfirmLogout }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Logout Confirmation</DialogTitle>
			<DialogContent>
				<DialogContentText>Are you sure you want to logout?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirmLogout} color="primary">
					Logout
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const LogoutPage = () => {
	const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

	const handleOpenLogoutModal = () => {
		setLogoutModalOpen(true);
	};

	const handleCloseLogoutModal = () => {
		setLogoutModalOpen(false);
	};

	const handleConfirmLogout = () => {
		handleCloseLogoutModal();
		localStorage.removeItem("user");
		window.location.href = "/login";
	};

	return (
		<div style={{ padding: "20px" }}>
			<Button variant="contained" color="error" onClick={handleOpenLogoutModal}>
				Logout
			</Button>

			<LogoutModal
				open={isLogoutModalOpen}
				onClose={handleCloseLogoutModal}
				onConfirmLogout={handleConfirmLogout}
			/>
		</div>
	);
};

export default LogoutPage;
