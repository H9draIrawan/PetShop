import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

import { Outlet, useLocation } from "react-router-dom"

import {Banner, PetVariant} from "../components/home";


const Home = () => {
  const location = useLocation();
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Afacad',
        'sans-serif',
      ].join(','),
    }
  })
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <Navbar /> 
        {
          location.pathname === "/home" ? 
          (<Box>
            <Banner />
            <PetVariant />
          </Box>)
        :
          <Outlet />
        }
        <Footer/>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
