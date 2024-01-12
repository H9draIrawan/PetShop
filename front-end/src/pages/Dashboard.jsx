import { Box, Grid, Paper, Typography } from "@mui/material";
import UpcomingAppointmentCard from "./UpcomingAppointment";
import { useEffect, useMemo } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { ordersLoaded } from "../apps/orderSlice";
import { petsLoaded } from "../apps/petSlice";

// Mock data card order
// const upcomingAppointment = {
//   name: 'Fluffer Puff',
//   date: '2024-01-31',
//   time: '10:00 AM',
//   description: 'Mandi',
// };

export default function Dashboard() {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("user"))._id;

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/order/user/${user}`)
			.then(function (response) {
				dispatch(ordersLoaded(response.data));
				console.log(response.data);
			});
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/pet/user/${user}`)
			.then(function (response) {
				dispatch(petsLoaded(response.data));
				console.log(response.data);
			});
	}, []);
	const orders = useSelector((state) => state.order.orders);
	const pets = useSelector((state) => state.pet.pets);

	const filteredOrder = useMemo(() => {
		if(orders.length <= 0) return [];

		return orders.filter((order) => !order);
	}, [orders]);

	return (
		<Box>
			<Typography fontSize={32} mb={2}>
				Upcoming Appoinments
			</Typography>
			<Paper elevation={3} style={{ padding: "15px" }}>
				{filteredOrder.length > 0 ? (
					filteredOrder.map((order, idx) =>
						<UpcomingAppointmentCard appointment={order} key={idx} />
					)
				) : (
					<Typography fontSize={16}>There's no appoinments yet</Typography>
				)}
			</Paper>
		</Box>
	);
}
