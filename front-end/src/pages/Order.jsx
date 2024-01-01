import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Select,
	Stack,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { petsLoaded } from "../apps/petSlice";
import {
	Cancel,
	Delete,
	ReplyAll,
	Undo,
	Visibility,
} from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ordersAdded, ordersDeleted, ordersLoaded } from "../apps/orderSlice";

export default function Order() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/api/pet`).then(function (response) {
			dispatch(petsLoaded(response.data));
			console.log(response.data);
		});
		axios.get(`${import.meta.env.VITE_API_URL}/api/order`).then(function (response) {
			dispatch(ordersLoaded(response.data));
			console.log(response.data);
		});
	});
	const rows = useSelector((state) => state.pet.pets);
	const orders = useSelector((state) => state.order.orders);

	const [Form, setForm] = useState(false);
	const [Visible, setVisible] = useState(false);
	const [Details, setDetails] = useState([]);
	const [Order, setOrder] = useState();

	const onSubmit = (data) => {
		const Harga = data.kategori.length * 20000;
		setDetails([
			...Details,
			{
				id_pet: data.pet,
				kategori: data.kategori,
				harga: Harga,
			},
		]);
		setForm(null);
	};

	const onOrder = (data) => {
		alert("Order Berhasil");
		data.details = Details;
		dispatch(ordersAdded(data));
	};

	const { register, handleSubmit } = useForm();

	return (
		<Container>
			{!Form && (
				<Stack>
					<TableContainer sx={{ mt: 3 }}>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
									Nama
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
									Kategori
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
									Harga
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Details.map((detail, index) => (
								<TableRow key={detail.id_pet}>
									<TableCell sx={{ fontSize: 20, textTransform: "capitalize" }}>
										{rows.filter((row) => row._id == detail.id_pet)[0]?.nama}
									</TableCell>
									<TableCell sx={{ fontSize: 20, textTransform: "capitalize" }}>
										{detail.kategori + ""}
									</TableCell>
									<TableCell sx={{ fontSize: 20, textTransform: "capitalize" }}>
										{detail.harga.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												setDetails(
													Details.filter((detail, idx) => idx != index),
												)
											}
										>
											<Delete />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</TableContainer>

					<Box component="form" onSubmit={handleSubmit(onOrder)}>
						<TextField type="date" sx={{ m: 3 }} {...register("tanggal")} />
						<br />
						<Button type="submit" variant="contained" sx={{ m: 3, width: 100 }}>
							Set Order
						</Button>
					</Box>

					<Button
						variant="contained"
						sx={{ m: 3 }}
						onClick={() => setForm(true)}
					>
						Tambah Order
					</Button>
				</Stack>
			)}
			{Form && (
				<Box component="form" sx={{ m: 3 }} onSubmit={handleSubmit(onSubmit)}>
					<Select sx={{ width: 400 }} {...register("pet")}>
						{rows.map(
							(row) =>
								row.status && <MenuItem value={row._id}>{row.nama}</MenuItem>,
						)}
					</Select>
					<FormGroup sx={{ ml: 1 }}>
						<FormControlLabel
							control={<Checkbox value={"Mandi"} {...register("kategori")} />}
							label="Mandi"
						/>
						<FormControlLabel
							control={
								<Checkbox value={"Potong Kuku"} {...register("kategori")} />
							}
							label="Potong Kuku"
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="Membersihkan Kutu"
							value={"Membersihkan Kutu"}
							{...register("kategori")}
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="Potong Rambut/Bulu"
							value={"Potong Rambut/Bulu"}
							{...register("kategori")}
						/>
					</FormGroup>
					<Button type="submit" variant="contained" sx={{ mt: 3 }}>
						Submit
					</Button>
				</Box>
			)}
			{!Form && !Visible && (
				<TableContainer sx={{ m: 3 }}>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
								Total
							</TableCell>
							<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
								Tanggal
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map(
							(order) =>
								!order.status && (
									<TableRow key={order._id}>
										<TableCell sx={{ fontSize: 20 }}>
											{order.total.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</TableCell>
										<TableCell sx={{ fontSize: 20 }}>
											{new Date(order.tanggal).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "short",
												year: "numeric",
											}) +
												" " +
												new Date(order.tanggal).toLocaleTimeString("en-GB")}
										</TableCell>
										<TableCell sx={{ fontSize: 20 }}>
											<Button
												onClick={() => {
													setVisible(true);
													setOrder(order.details);
												}}
											>
												<Visibility />
											</Button>
											<Button
												onClick={() => dispatch(ordersDeleted(order._id))}
											>
												<Delete></Delete>
											</Button>
										</TableCell>
									</TableRow>
								),
						)}
					</TableBody>
				</TableContainer>
			)}

			{!Form && Visible && (
				<Container>
					<Button
						onClick={() => {
							setVisible(false);
							setOrder([]);
						}}
					>
						<Undo />
					</Button>
					<TableContainer sx={{ m: 3 }}>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
									Pet
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
									Kategori
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
									Harga
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Order.map((order) => (
								<TableRow>
									<TableCell sx={{ fontSize: 20 }}>
										{rows.filter((row) => row._id == order.id_pet)[0]?.nama}
									</TableCell>
									<TableCell sx={{ fontSize: 20 }}>
										{order.kategori + ""}
									</TableCell>
									<TableCell sx={{ fontSize: 20 }}>
										{order.harga.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</TableContainer>
				</Container>
			)}
		</Container>
	);
}
