// import { NavLink, Outlet } from "react-router-dom";

// export default function Home() {
// 	return (
// 		<div>
// 			<NavLink to={"/Home"} className="text-3xl font-bold">Pet Shop</NavLink>
// 			<NavLink to={"Profile"} className="bg-blue-500 rounded-lg mx-5 px-3">Profile</NavLink>
// 			<NavLink to={"Pet"} className="bg-blue-500 rounded-lg mx-5 px-3">Pet</NavLink>
// 			<NavLink to={"kritik-saran"} className="bg-blue-500 rounded-lg mx-5 px-3">Kritik dan Saran</NavLink>
// 			<NavLink to={"/registerLogin"} className="bg-blue-500 rounded-lg mx-5 px-3">Register/Login</NavLink>
// 			<br />
// 			<br />

// 			<Outlet />
// 		</div>
// 	);
// }

import React from "react";
import { NavLink as RouterLink, Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const NavigationLink = ({ to, text }) => (
  <Button
    component={RouterLink}
    to={to}
    variant="contained"
    color="primary"
    sx={{ mx: 2, borderRadius: 2 }}
  >
    {text}
  </Button>
);

const Home = () => {
  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
        <RouterLink to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
          Pet Shop
        </RouterLink>
		<NavigationLink to="Profile" text="Profile" />
		<NavigationLink to="Pet" text="Pet" />
		<NavigationLink to="kritik-saran" text="Kritik dan Saran" />
		<NavigationLink to="/registerLogin" text="Register/Login" />
      </Typography>

      
      <Outlet />
    </Box>
  );
};

export default Home;
