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
  <Typography
    component={RouterLink}
    to={to}
    variant="h6"
    color="black"
    sx={{ mx: 2,  textDecoration: 'none', borderRadius: 2 }}
  >
    {text}
  </Typography>
);

const Home = () => {
  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, ml:2, mt:2 }}>
        <RouterLink to="/Home" style={{ textDecoration: 'none', color: 'inherit', marginRight: '1rem'}}>
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
