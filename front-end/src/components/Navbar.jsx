import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	Button,
	Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";
import logo from '../assets/logo.png'

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

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<AppBar
			position="static"
			sx={{ backgroundColor: "#fff", color: grey[800] }}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<RouterLink
					to="/home"
					style={{
						textDecoration: "none",
						color: blue[300],
						marginRight: "1rem",
						fontSize: "30px",
						paddingLeft: "0.8rem",
					}}
				>
					<img src={logo} alt="logo" style={{maxWidth: 150, padding: 8}}/>
				</RouterLink>

				<Search
					sx={{ backgroundColor: grey[300], color: grey[600], borderRadius: 8 }}
				>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ "aria-label": "search" }}
					/>
				</Search>
				{localStorage.getItem("user") ? (
					<>
						<Stack spacing={5} direction="row">
							<Typography variant="h6">
								{JSON.parse(localStorage.getItem("user")).nama}
							</Typography>
							<Button
								variant="contained"
								color="error"
								onClick={() => {
									localStorage.removeItem("user");
									navigate("/home");
								}}
							>
								LOGOUT
							</Button>
						</Stack>
					</>
				) : (
					<RouterLink
						to="/login"
						style={{ color: grey[800], marginLeft: "120px" }}
					>
						LOGIN
					</RouterLink>
				)}
			</Toolbar>
			<Toolbar>
				{localStorage.getItem("user") && (
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<NavigationLink to="profile" text="Profile" />
						<NavigationLink to="pet" text="Pet" />
						<NavigationLink to="order" text="Order" />
						<NavigationLink to="kritik-saran" text="Kritik dan Saran" />
					</Typography>
				)}

				<Typography>WA Us +62 8242 29384 2301</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
