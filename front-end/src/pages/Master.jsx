import * as React from "react";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { usersLoaded } from "../apps/userSlice";
import { petsLoaded } from "../apps/petSlice";
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { reviewsLoaded } from "../apps/reviewSlice";
import { transactionsLoaded } from "../apps/transactionSlice";
import { ordersLoaded } from "../apps/orderSlice";

export default function Master() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get("http://localhost:3000/api/user").then(function (response) {
			dispatch(usersLoaded(response.data));
			console.log(response.data);
		});
		axios.get("http://localhost:3000/api/pet").then(function (response) {
			dispatch(petsLoaded(response.data));
			console.log(response.data);
		});
		axios.get("http://localhost:3000/api/order").then(function (response) {
			dispatch(ordersLoaded(response.data));
			console.log(response.data);
		});
		axios
			.get("http://localhost:3000/api/transaction")
			.then(function (response) {
				dispatch(transactionsLoaded(response.data));
				console.log(response.data);
			});
		axios.get("http://localhost:3000/api/review").then(function (response) {
			dispatch(reviewsLoaded(response.data));
			console.log(response.data);
		});
	}, []);

	const users = useSelector((state) => state.user.users);
	const pets = useSelector((state) => state.pet.pets);
	const orders = useSelector((state) => state.order.orders);
	const transactions = useSelector((state) => state.transaction.transactions);
	const reviews = useSelector((state) => state.review.reviews);

	const active = users.filter((user) => user.status === "active");
	const nonactive = users.filter((user) => user.status === "nonactive");
	const banned = users.filter((user) => user.status === "banned");
	const orderPrice = orders.map((order) => order.total);
	const orderDate = orders.map(
		(order) =>
			new Date(order.tanggal).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "short",
				year: "numeric",
			}) +
			" " +
			new Date(order.tanggal).toLocaleTimeString("en-GB"),
	);
	const transactionPrice = transactions.map((transaction) => transaction.harga);
	const transactionDate = transactions.map(
		(transaction) =>
			new Date(transaction.harga).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "short",
				year: "numeric",
			}) +
			" " +
			new Date(transaction.harga).toLocaleTimeString("en-GB"),
	);
	const rating = reviews.map((review) => review.rating);
	const ratingDate = reviews.map(
		(review) =>
			new Date(review.order.tanggal).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "short",
				year: "numeric",
			}) +
			" " +
			new Date(review.order.tanggal).toLocaleTimeString("en-GB"),
	);

	const data = {
		labels: ["Active", "Nonactive", "Banned"],
		datasets: [
			{
				label: "Users",
				data: [active.length, nonactive.length, banned.length],
				backgroundColor: [
					"rgba(75, 192, 192, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 99, 132, 0.2)",
				],
				borderColor: [
					"rgba(75, 192, 192, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 99, 132, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const data2 = {
		labels: orderDate,
		datasets: [
			{
				label: "Order",
				data: orderPrice,
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
		],
	};

	const data3 = {
		labels: transactionDate,
		datasets: [
			{
				label: "Transaction",
				data: transactionPrice,
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};

	const data4 = {
		labels: ratingDate,
		datasets: [
			{
				label: "Rating",
				data: rating,
				backgroundColor: "rgba(255, 255, 0, 0.2)",
				borderColor: "rgba(255, 255, 0, 1)",
				borderWidth: 1,
			},
		],
	};
	const options = {
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
				},
			},
		},
	};
	const options2 = {
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1000,
				},
			},
		},
	};

	return (
		<Container>
			<Grid container spacing={3} sx={{ mx: 10, mt: 1 }}>
				<Grid item>
					<Card sx={{ backgroundColor: "green" }}>
						<CardContent>
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>
								ACTIVE USERS
							</Typography>
							<Typography sx={{ textAlign: "center" }} variant="h6">
								{active.length}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card sx={{ backgroundColor: "blue" }}>
						<CardContent>
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>
								NONACTIVE USERS
							</Typography>
							<Typography sx={{ textAlign: "center" }} variant="h6">
								{nonactive.length}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card sx={{ backgroundColor: "red" }}>
						<CardContent>
							<Typography variant="h5" sx={{ fontWeight: "bold" }}>
								BANNED USERS
							</Typography>
							<Typography sx={{ textAlign: "center" }} variant="h6">
								{banned.length}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			<Grid container spacing={3} sx={{ mx: 10, mt: 1 }}>
				<Grid item>
					<Card sx={{ backgroundColor: "yellow", width: 745 }}>
						<CardContent>
							<Typography variant="h4" sx={{ fontWeight: "bold" }}>
								{pets.length + " PETS "}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			<Grid sx={{ width: 600, mx: 10 }}>
				<Grid item>
					<Bar data={data} options={options} />
				</Grid>
				<Grid item>
					<Line data={data2} options={options2} />
				</Grid>
				<Grid item>
					<Bar data={data3} options={options2} />
				</Grid>
				<Grid item>
					<Line data={data4} options={options} />
				</Grid>
			</Grid>
		</Container>
	);
}
