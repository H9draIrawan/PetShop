import { Outlet, Link, useNavigate  } from "react-router-dom";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
// // import Dialog from '@mui/material/Dialog';
// // import DialogActions from '@mui/material/DialogActions';
// // import DialogContent from '@mui/material/DialogContent';
// // import DialogContentText from '@mui/material/DialogContentText';
// // import DialogTitle from '@mui/material/DialogTitle';
// // import Button from '@mui/material/Button';
import Dashboard from "./Dashboard";
import History from "./History";
import Detail from "./DetailAccount";
import Pet from "./Pet";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function Profile() {
	const [value, setValue] = React.useState(0);
  // const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
  //   if (newValue === 4) {
  //     setLogoutModalOpen(true);
  //   } else {
      setValue(newValue);
  //   }
  };

  // const navigate = useNavigate();

  // const handleCloseLogoutModal = () => {
  //   setLogoutModalOpen(false);
  // };

  // const handleConfirmLogout = () => {
  //   // Logout logic here
  //   // Ex: clear user authentication state or dispatch logout action

  //   setLogoutModalOpen(false);
  //   // navigate('/home');
  // };
  

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: '60px'}}
    >
      <Tabs
        orientation="vertical"
        variant="visibleScrollbar"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider'}}
      >
        <Tab label="Dashboard" {...a11yProps(0)} sx={{marginBottom: 5}}/>
        <Tab label="History Booking" {...a11yProps(1)}  sx={{marginBottom: 5}}/>
        <Tab label="Detail Account" {...a11yProps(2)}  sx={{marginBottom: 5}}/>
        <Tab label="Pets" {...a11yProps(3)}  sx={{marginBottom: 5}}/>
      </Tabs>
      <TabPanel value={value} index={0}>
		    <Dashboard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <History/>
      </TabPanel>
      <TabPanel value={value} index={2}>
		    <Detail/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Pet/>
      </TabPanel>
      
      {/* Logout Confirmation Modal */}
      {/* <Dialog open={logoutModalOpen} onClose={handleCloseLogoutModal}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog> */}

    </Box>
  );
}
