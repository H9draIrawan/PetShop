import {
	AppBar,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	Button,
	Box,
	Grid,
	Stack,
} from "@mui/material";
import {
	Home,
	Pets,
	ShoppingCart,
	Person,
	Feedback,
	AccessTimeFilled,
} from "@mui/icons-material";

import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";

export default function Admin() {
	const navigate = useNavigate();
	return (
		<Stack spacing={7}>
			{!localStorage.getItem("admin") && <Navigate to="/home" />}
			<AppBar>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography variant="h6">ADMIN</Typography>
					<Box>
						<Button
							variant="contained"
							color="error"
							onClick={() => {
								localStorage.removeItem("admin");
								navigate("/home");
							}}
						>
							Logout
						</Button>
					</Box>
				</Toolbar>
			</AppBar>

			<Grid container sx={{ mt: 7 }}>
				<Grid item>
					<List>
						<ListItemButton
							component={NavLink}
							to="/admin/dashboard"
							sx={{
								fontSize: 18,
								height: 60,
								width: 250,
								fontSize: 18,
								":hover": {
									backgroundColor: "lightgray",
								},
							}}
						>
							<ListItemIcon>
								<Home />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItemButton>
						<ListItemButton
							component={NavLink}
							to="/admin/user"
							sx={{
								height: 60,
								fontSize: 18,
								fontSize: 18,
								":hover": {
									backgroundColor: "lightgray",
								},
							}}
						>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary="User" />
						</ListItemButton>
						<ListItemButton
							component={NavLink}
							to="/admin/pet"
							sx={{
								height: 60,
								fontSize: 18,
								fontSize: 18,
								":hover": {
									backgroundColor: "lightgray",
								},
							}}
						>
							<ListItemIcon>
								<Pets />
							</ListItemIcon>
							<ListItemText primary="Pet" />
						</ListItemButton>
						<ListItemButton
							component={NavLink}
							to="/admin/order"
							sx={{
								height: 60,
								fontSize: 18,
								fontSize: 18,
								":hover": {
									backgroundColor: "lightgray",
								},
							}}
						>
							<ListItemIcon>
								<AccessTimeFilled />
							</ListItemIcon>
							<ListItemText primary="Order" />
						</ListItemButton>
						<ListItemButton
							component={NavLink}
							to="/admin/transaksi"
							sx={{
								height: 60,
								fontSize: 18,
								fontSize: 18,
								":hover": {
									backgroundColor: "lightgray",
								},
							}}
						>
							<ListItemIcon>
								<ShoppingCart />
							</ListItemIcon>
							<ListItemText primary="Transaksi" />
						</ListItemButton>
						<ListItemButton
							component={NavLink}
							to="/admin/kritiksaran"
							sx={{
								height: 60,
								fontSize: 18,
								fontSize: 18,
								":hover": {
									backgroundColor: "lightgray",
								},
							}}
						>
							<ListItemIcon>
								<Feedback />
							</ListItemIcon>
							<ListItemText primary="Kritik & Saran" />
						</ListItemButton>
					</List>
				</Grid>
				<Grid item>
					<Outlet />
				</Grid>
			</Grid>
		</Stack>
	);
}
