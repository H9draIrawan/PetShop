import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Stack,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import logo from "../assets/logo.png";
import Logout from "../pages/Logout";

const NavigationLink = ({ to, text }) => (
	<Typography
		component={RouterLink}
		to={to}
		variant="h6"
		color="black"
		sx={{ mx: 2, textDecoration: "none", borderRadius: 2 }}
	>
		{text}
	</Typography>
);


const Navbar = () => {
	const navigate = useNavigate();
	return (
		<AppBar
			position="static"
			sx={{ backgroundColor: "#fff", color: grey[800] }}
		>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<RouterLink
					to="/home"
					style={{
						textDecoration: "none",
						color: blue[300],
						marginRight: "1rem",
						fontSize: "30px",
						paddingLeft: "0.8rem",
						display: "flex",
						alignItems: "center"
					}}
				>
					<img src={logo} alt="logo" style={{ maxWidth: 150, padding: 8 }} />
				</RouterLink>

				{localStorage.getItem("user") && (
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
						<NavigationLink to="profile" text="Profile" />
						<NavigationLink to="pet" text="Pet" />
						<NavigationLink to="order" text="Order" />
						<NavigationLink to="kritik-saran" text="Kritik dan Saran" />
					</Typography>
				)}
				
				{localStorage.getItem("user") ? (
					<>
						<Stack
							display={"flex"}
							spacing={5}
							direction="row"
							alignItems={"center"}
						>
							<Typography variant="h6">
								Selamat Datang, {JSON.parse(localStorage.getItem("user")).nama}
							</Typography>
							{/* <img
								src={
									import.meta.env.VITE_API_URL +
									"/static/" +
									JSON.parse(localStorage.getItem("user")).profile
								}
								style={{ width: "40px" }}
							/> */}
							<Logout />
						</Stack>
					</>
				) : (
					<RouterLink
						to="/login"
						style={{ 
							color: "whitesmoke", 
							marginLeft: "120px", 
							paddingTop: "5px",
							paddingBottom: "5px",
							paddingLeft: "20px", 
							paddingRight: "20px", 
							backgroundColor: "#1976D2",
							border: "none",
							borderRadius: "5px",
						}}
					>
						LOGIN
					</RouterLink>
				)}
				</Toolbar>

			
				{/* <Toolbar
					sx={{
					display: "flex",
					justifyContent: "flex-end",
					marginTop: "-30px",
					}}
				>
					<Typography sx={{ marginLeft: 'auto', mt: 0 }}>WA Us +62 8242 29384 2301</Typography>	
				</Toolbar> */}
		</AppBar>
	);
};

export default Navbar;
