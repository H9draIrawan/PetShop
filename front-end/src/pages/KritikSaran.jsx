import React, { useState } from "react";
import {
	AppBar,
	Box,
	Container,
	CssBaseline,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
	Rating,
	Button,
	TextField,
	MenuItem,
	Select,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { petsLoaded } from "../apps/petSlice";
import { usersLoaded } from "../apps/userSlice";
import { useForm } from "react-hook-form";
import { reviewsAdded, reviewsLoaded } from "../apps/reviewSlice";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import StarIcon from "@mui/icons-material/Star";

// mandi
// potong kuku
// basmi kutu
// potong bulu
// grooming (semua)

// const reviewss = [
//   { id: 1, name: 'John Doe', rating: 3, kritik: 'Great product, highly recommended!', saran: 'ini saran', kategori: 'Mandi' },
//   { id: 2, name: 'Jane Smith', rating: 4, kritik: 'Excellent service and quality.', saran: 'ini saran', kategori: 'Mandi' },
//   { id: 3, name: 'Jane a', rating: 4, kritik: 'Excellent service and quality.', saran: 'ini saran', kategori: 'Potong Bulu' },
//   { id: 4, name: 'Jane b', rating: 4, kritik: 'Excellent service and quality.', saran: 'ini saran', kategori: 'Basmi Kutu' },
//   { id: 5, name: 'Jane c', rating: 5, kritik: 'Excellent service and quality.', saran: 'ini saran', kategori: 'Grooming' },
//   { id: 6, name: 'Jane d', rating: 5, kritik: 'Excellent service and quality.', saran: 'ini saran', kategori: 'Mandi' },
//   { id: 7, name: 'Jane e', rating: 5, kritik: 'Excellent service and quality.', saran: 'ini saran', kategori: 'Potong kuku' },
// ];

export default function KritikSaran() {
	const [filteredOrders, setFilteredOrders] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"))._id;
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/order/${user}`)
			.then(function (response) {
				const allOrders = response.data;
				const filteredOrders = allOrders.filter(
					(order) => order.status === true,
				);
				setFilteredOrders(filteredOrders);
				dispatch(ordersLoaded(response.data));
				console.log(response.data);
			});
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/user`)
			.then(function (response) {
				dispatch(usersLoaded(response.data));
				console.log(response.data);
			});
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/review`)
			.then(function (response) {
				dispatch(reviewsLoaded(response.data));
				console.log(response.data);
			});
	}, []);

	const orders = useSelector((state) => state.order.orders);
	const users = useSelector((state) => state.user.users);
	const reviews = useSelector((state) => state.review.reviews);

	const [sortBy, setSortBy] = useState(null);
	const [showAllReviews, setShowAllReviews] = useState(false);
	const [jumlahDisplay, setJumlahDisplay] = useState(6);
	const [selectedCategory, setSelectedCategory] = useState("All");

	const [showForm, setShowForm] = useState(false);

	// const ReviewSchema = (name) => {
	// 	const reviewsCek = reviews.find((reviewsCek) => user.nama === name);
	// 	if (reviewsCek) return true;
	// 	return false;
	// };

	const [newReview, setNewReview] = useState({
		rating: "",
		kritik: "",
		saran: "",
	});

	const [id_order, setIdOrder] = useState();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewReview((prevReview) => ({
			...prevReview,
			[name]: value,
		}));
	};

	const handleSort = (order) => {
		setSortBy(order);
	};

	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	};

	// const handleCheck = (event) => {
	//   if (!userOrder) {
	//     alert("To access, an appointment needs to be completed first");
	// 		return;
	//   }
	// };

	const handleSubmitReview = async (e) => {
		if (!newReview.rating || !newReview.kritik || !newReview.saran) {
			alert("Please fill in all fields");
			return;
		}

		const user = JSON.parse(localStorage.getItem("user"));

		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/api/review`, {
				id_user: user._id,
				id_order: id_order,
				rating: newReview.rating,
				kritik: newReview.kritik,
				saran: newReview.saran,
			});
			setNewReview({
				name: "",
				rating: "",
				kritik: "",
				saran: "",
			});
		} catch (error) {
			console.error(error);
			alert("Submission failed. Please try again.");
		}
		// Handle submitting the new review (e.g., send it to an API)
		setShowForm(false);
	};

	const sortedReviews = [...reviews].sort((a, b) => {
		if (sortBy === "lowest") {
			return a.rating - b.rating;
		} else if (sortBy === "highest") {
			return b.rating - a.rating;
		} else if (sortBy === "lastAdded") {
			return b.id - a.id;
		}
		return 0;
	});

	const filteredReviews =
		selectedCategory === "All"
			? sortedReviews
			: sortedReviews.filter((review) =>
					review.details.includes(selectedCategory),
			  );

	const displayedReviews =
		showAllReviews || filteredReviews.length <= jumlahDisplay
			? filteredReviews
			: filteredReviews.slice(0, jumlahDisplay);

	const categories = [
		"Mandi",
		"Potong Kuku",
		"Membersihkan Kutu",
		"Potong Rambut/Bulu",
	];
	categories.unshift("All");

	const userOrder = filteredOrders.filter(
		(order) => order.id_user === localStorage("user")._id,
	);

	return (
		<React.Fragment>
			<CssBaseline />
			{/* <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Kritik dan Saran</Typography>
        </Toolbar>
      </AppBar> */}
			<Toolbar />
			<Container>
				{/* BUTTON SORT-------- */}
				{/* <Box sx={{ textAlign: 'right', mb: 2 }}>
          Sort : 
          <Button onClick={() => handleSort('lowest')}>by Lowest rating</Button>
          <Button onClick={() => handleSort('highest')}>by Highest rating</Button>
          <Button onClick={() => handleSort('lastAdded')}>by Recently added</Button>
        </Box> */}
				{/* ----------------- */}

				{/* CATEGORY SELECT */}
				{/* <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Select
            label="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((details) => (
              <MenuItem key={details} value={details}>
                {details}
              </MenuItem>
            ))}
          </Select>
        </Box> */}
				{/* ----------------- */}

				<Grid container spacing={3}>
					{displayedReviews.map((review) => (
						<Grid item key={review.id} xs={12} md={6} lg={4}>
							<Paper elevation={3} sx={{ p: 2, height: "100%" }}>
								<Typography variant="h6">{review.name}</Typography>
								<Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
									{/* <Typography variant="body1" sx={{ mr: 1, color: 'text.secondary' }}>
                    {review.rating}.0
                  </Typography>
                  <Rating value={review.rating} readOnly precision={0.5} icon={<StarIcon fontSize="inherit" />} /> */}
								</Box>
								<Typography variant="body1">{review.rating}</Typography>
								<Typography variant="body1">
									{" "}
									Kritik : {review.kritik}
								</Typography>
								<Typography variant="body1"> Saran : {review.saran}</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>

				<br />

				{/* CARD-BASED USER ORDERS */}
				<Grid container spacing={3}>
					{orders.map((order) => {
						if (order.status)
							return (
								<Grid item key={order._id} xs={12} md={6} lg={4}>
									<Paper elevation={3} sx={{ p: 2, height: "100%" }}>
										<Typography variant="h6">Order ID: {order._id}</Typography>
										<Typography variant="body1">
											Tanggal: {new Date(order.tanggal).toLocaleDateString()}
										</Typography>
										<Typography>
											{order.details.map((detail) => (
												<Typography variant="body1">
													{detail.kategori}
												</Typography>
											))}
										</Typography>
										<Typography>
											{order.total.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</Typography>
										<br />
										<Button
											variant="outlined"
											color="warning"
											onClick={() => {
												setShowForm(!showForm);
												setIdOrder(order._id);
											}}
										>
											Review
										</Button>
									</Paper>
								</Grid>
							);
					})}
				</Grid>

				{/* BUTTON SHOW ALL */}
				{filteredReviews.length > jumlahDisplay && (
					<Box sx={{ textAlign: "center", mt: 2 }}>
						{showAllReviews ? (
							<Button onClick={() => setShowAllReviews(false)}>
								Show Less Reviews
							</Button>
						) : (
							<Button onClick={() => setShowAllReviews(true)}>
								{showAllReviews ? "Show Less Reviews" : "Show More Reviews"}
							</Button>
						)}
					</Box>
				)}

				{/* BUTTON SHOW FORM (bingung di sini)*/}
				{/* {!userOrder && ( */}
				{/* {!showForm && (
            <Box sx={{ my: 3, textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={()=>setShowForm(true)}>
                Buat Kritik dan Saran
              </Button>
            </Box>
          )} */}
				{/* } */}

				{showForm && (
					<Box
						component={"form"}
						sx={{ my: 3, textAlign: "center" }}
						onSubmit={handleSubmitReview}
					>
						<Typography variant="h5" gutterBottom>
							Kritik dan Saran
						</Typography>

						<TextField
							label="Rating"
							name="rating"
							value={newReview.rating}
							onChange={handleChange}
							fullWidth
							margin="normal"
						/>
						<TextField
							label="Kritik"
							name="kritik"
							value={newReview.kritik}
							onChange={handleChange}
							fullWidth
							multiline
							rows={4}
							margin="normal"
						/>
						<TextField
							label="Saran"
							name="saran"
							value={newReview.saran}
							onChange={handleChange}
							fullWidth
							multiline
							rows={4}
							margin="normal"
						/>
						<Button variant="contained" color="primary" type="submit">
							Submit
						</Button>
					</Box>
				)}
			</Container>
		</React.Fragment>
	);
}
