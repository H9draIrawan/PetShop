import { Link as Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import {createMuiTheme, ThemeProvider} from '@mui/material'
import Navbar from "../components/Navbar";

// Sections
import {Banner, PetVariant} from "../components/home";

const Home = () => {
  const theme = createMuiTheme({
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
        <Outlet/>
        <Banner />
        <PetVariant />
      </ThemeProvider>
    </Box>
  );
};

export default Home;
