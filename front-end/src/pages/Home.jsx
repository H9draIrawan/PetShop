import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Hourglass } from "react-loader-spinner";

import { Outlet, useLocation } from "react-router-dom"

import { Banner, PetVariant, Service } from "../components/home";

const OverlayLoader = () => {
  return (
    <Box display="flex" justifyContent={"center"} alignItems={"center"} position={"fixed"} top={0} left={0} width={"100vw"} height={"100vh"} sx={{ backgroundColor: "#fff", zIndex: 1024 }}>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
    </Box>
  );
}

const Home = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Afacad',
        'sans-serif',
      ].join(','),
    }
  })

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {
        isLoading ? <OverlayLoader /> :
          <ThemeProvider theme={theme}>
            <Navbar />
            {
              location.pathname === "/home" ?
                (<Box>
                  <Banner />
                  <PetVariant />
                  <Service />
                </Box>)
                :
                <Outlet />
            }
            <Footer />
          </ThemeProvider>
      }
    </Box>
  );
};

export default Home;
