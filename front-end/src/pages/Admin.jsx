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

import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usersLoaded } from "../apps/userSlice";
import { petsLoaded } from "../apps/petSlice";
import { ordersLoaded } from "../apps/orderSlice";
import { reviewsLoaded } from "../apps/reviewSlice";

export default function Admin() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get("http://localhost:3000/api/user").then(function (response) {
			dispatch(usersLoaded(response.data));
			console.log(response.data);
		});
		axios.get("http://localhost:3000/api/pet").then(function (response) {
			dispatch(petsLoaded(response.data));
			console.log(response.data);
		});
		axios.get("http://localhost:3000/api/order").then(function (response) {
			dispatch(ordersLoaded(response.data));
			console.log(response.data);
		});
		axios.get("http://localhost:3000/api/review").then(function (response) {
			dispatch(reviewsLoaded(response.data));
			console.log(response.data);
		});
	});

	return (
		<Stack spacing={7}>
			<AppBar>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography variant="h6">ADMIN</Typography>
					<Box>
						<Button variant="contained" color="error">
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
