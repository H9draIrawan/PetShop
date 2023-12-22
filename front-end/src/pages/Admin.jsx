import {
	AppBar,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Toolbar,
	Typography,
	Button,
	Box,
	Grid,
	Container,
	Stack, // Add Button import
} from "@mui/material";
import {
	Home,
	Pets,
	ShoppingCart,
	Person,
	Feedback,
	PowerSettingsNew, // Add PowerSettingsNew icon import
} from "@mui/icons-material";

import { NavLink, Outlet } from "react-router-dom";

export default function Admin() {
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
								<ShoppingCart />
							</ListItemIcon>
							<ListItemText primary="Order" />
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
					</List>
				</Grid>
				<Grid item>
					<Outlet />
				</Grid>
			</Grid>
		</Stack>
	);
}
