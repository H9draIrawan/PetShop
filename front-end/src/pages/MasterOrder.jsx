import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TablePagination,
	TableRow,
	Paper,
	IconButton,
	TableHead,
	Typography,
	Button,
	Container,
	TextField,
} from "@mui/material";

import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
	Delete,
	Block,
	Edit,
	CheckCircle,
	Visibility,
	Undo,
} from "@mui/icons-material";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ordersDeleted,
	ordersFinished,
	ordersLoaded,
	ordersUpdated,
} from "../apps/orderSlice";
import { useState } from "react";
import { petsLoaded } from "../apps/petSlice";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { transactionsCreated } from "../apps/transactionSlice";
import { usersLoaded } from "../apps/userSlice";

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
			</IconButton>
		</Box>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

export default function MasterOrder() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get("http://localhost:3000/api/order").then(function (response) {
			dispatch(ordersLoaded(response.data));
			console.log(response.data);
		});
		axios.get("http://localhost:3000/api/pet").then(function (response) {
			dispatch(petsLoaded(response.data));
			console.log(response.data);
		});
	}, []);
	const rows = useSelector((state) => state.order.orders);
	const pets = useSelector((state) => state.pet.pets);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [Visible, setVisible] = useState(false);
	const [EditOrder, setEditOrder] = useState(false);
	const [Details, setDetails] = useState();
	const [Order, setOrder] = useState();

	const onSubmit = (data) => {
		data.details = Details;
		dispatch(ordersUpdated(data));
		setEditOrder(false);
		setDetails();
		setOrder();
		window.location.reload();
	};
	const { register, handleSubmit } = useForm({
		values: {
			_id: Order?._id,
			tanggal: Order?.tanggal,
		},
	});

	if (!Visible && !EditOrder) {
		return (
			<TableContainer
				component={Paper}
				sx={{ overflowX: "auto", maxWidth: 1000, minWidth: 900, mt: 3 }}
			>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "bold" }}>Pemesan</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row) => (
							<TableRow key={row._id}>
								<TableCell>{row.user.nama}</TableCell>
								<TableCell>
									{row.total.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
									})}
								</TableCell>
								<TableCell>
									{new Date(row.tanggal).toLocaleDateString("id-ID", {
										day: "numeric",
										month: "short",
										year: "numeric",
									}) +
										" " +
										new Date(row.tanggal).toLocaleTimeString("en-GB")}
								</TableCell>
								<TableCell>
									{row.status ? (
										<Typography color="green" sx={{ fontWeight: "bold" }}>
											DONE
										</Typography>
									) : (
										<Typography color="red" sx={{ fontWeight: "bold" }}>
											WAIT
										</Typography>
									)}
								</TableCell>
								<TableCell>
									<Button
										onClick={() => {
											setVisible(true);
											setDetails(row.details);
										}}
									>
										<Visibility />
									</Button>
									{!row.status && (
										<Button
											onClick={() => {
												setEditOrder(true);
												setOrder(row);
												setDetails(row.details);
											}}
										>
											<Edit />
										</Button>
									)}

									{!row.status && (
										<Button
											onClick={() => {
												dispatch(ordersDeleted(row._id));
												window.location.reload();
											}}
										>
											<Delete />
										</Button>
									)}
									{!row.status && (
										<Button
											onClick={() => {
												dispatch(ordersFinished(row._id));
												dispatch(transactionsCreated(row));
												window.location.reload();
											}}
										>
											<CheckCircle />
										</Button>
									)}
								</TableCell>
							</TableRow>
						))}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		);
	} else if (Visible && !EditOrder) {
		return (
			<Container sx={{ mt: 5 }}>
				<Button
					onClick={() => {
						setVisible(false);
						setDetails();
					}}
				>
					<Undo />
				</Button>
				<TableContainer
					component={Paper}
					sx={{ maxWidth: 1000, minWidth: 950, mt: 3 }}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: "bold" }}>Pet</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Kategori</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Details.map((detail) => (
								<TableRow>
									<TableCell>
										{pets.filter((pet) => pet._id == detail.id_pet)[0]?.nama}
									</TableCell>
									<TableCell>{detail.kategori + ""}</TableCell>
									<TableCell>
										{detail.harga.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		);
	} else {
		return (
			<Container>
				<Button
					sx={{ mt: 5 }}
					onClick={() => {
						setEditOrder(false);
						setDetails();
					}}
				>
					<Undo />
				</Button>
				<TableContainer
					component={Paper}
					sx={{ maxWidth: 1000, minWidth: 950, mt: 3 }}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: "bold" }}>Pet</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Kategori</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Details.map((detail) => (
								<TableRow>
									<TableCell>
										{pets.filter((pet) => pet._id == detail.id_pet)[0]?.nama}
									</TableCell>
									<TableCell>{detail.kategori + ""}</TableCell>
									<TableCell>
										{detail.harga.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<br />
				<Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
					<TextField type="date" {...register("tanggal")} />
					<br />
					<Button
						type="submit"
						variant="contained"
						{...register("_id")}
						sx={{ mt: 5 }}
					>
						Edit
					</Button>
				</Box>
			</Container>
		);
	}
}
