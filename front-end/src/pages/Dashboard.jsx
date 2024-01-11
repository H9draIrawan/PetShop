import { Box, Grid, Paper, Typography } from '@mui/material';
import UpcomingAppointmentCard from './UpcomingAppointment';
import { useEffect } from 'react';
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux';
import { ordersLoaded } from '../apps/orderSlice';

// Mock data card order
// const upcomingAppointment = {
//   name: 'Fluffer Puff',
//   date: '2024-01-31',
//   time: '10:00 AM',
//   description: 'Mandi',
// };

export default function Dashboard() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    const getOrder = async () => {
      const id_user = JSON.parse(localStorage.getItem("user"))._id;

      try {
        const orderList = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/user/${id_user}`);

        dispatch(ordersLoaded(orderList.data));
      } catch (err) {
        console.error("sorry there has an error while get the order");
      }
    }

    getOrder();
  }, []);

  return (
    <Box>
      <Typography fontSize={32} mb={2}>
        Upcoming Appoinments
      </Typography>
      <Paper elevation={3} style={{ padding: '15px' }}>
        {
          orders.length > 0 ?
            orders.map((order, idx) => (
              <UpcomingAppointmentCard appointment={order} key={idx} />
            )) :
            <Typography fontSize={16}>
              There's no appoinments yet
            </Typography>
        }
      </Paper>
    </Box>
  )
}

