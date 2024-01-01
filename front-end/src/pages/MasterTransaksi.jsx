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
	Cancel,
} from "@mui/icons-material";

import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	usersLoaded,
	usersUpdated,
	usersDeleted,
	usersBanned,
	userUnbanned,
} from "../apps/userSlice";
import { set, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
	transactionsCanceled,
	transactionsLoaded,
} from "../apps/transactionSlice";
import { ordersLoaded } from "../apps/orderSlice";

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

export default function MasterTransaksi() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get("http://localhost:3000/api/transaction")
			.then(function (response) {
				dispatch(transactionsLoaded(response.data));
				console.log(response.data);
			});
	}, []);

	const rows = useSelector((state) => state.transaction.transactions);

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

	const onSubmit = (data) => {};

	const Schema = Joi.object({});
	const { register, handleSubmit } = useForm({
		resolver: joiResolver(Schema),
	});

	return (
		<TableContainer
			component={Paper}
			sx={{ overflowX: "auto", maxWidth: 1000, minWidth: 1000, mt: 3 }}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Created</TableCell>
						<TableCell sx={{ fontWeight: "bold" }}>Updated</TableCell>
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
								{new Date(row.order.tanggal).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short",
									year: "numeric",
								}) +
									" " +
									new Date(row.order.tanggal).toLocaleTimeString("en-GB")}
							</TableCell>
							<TableCell>
								{row.harga.toLocaleString("id-ID", {
									style: "currency",
									currency: "IDR",
								})}
							</TableCell>
							<TableCell>
								{new Date(row.created).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short",
									year: "numeric",
								}) +
									" " +
									new Date(row.created).toLocaleTimeString("en-GB")}
							</TableCell>
							<TableCell>
								{new Date(row.updated).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short",
									year: "numeric",
								}) +
									" " +
									new Date(row.updated).toLocaleTimeString("en-GB")}
							</TableCell>
							<TableCell>
								{row.status == "PENDING" ? (
									<Typography color="blue" sx={{ fontWeight: "bold" }}>
										PENDING
									</Typography>
								) : row.status == "EXPIRED" ? (
									<Typography color="red" sx={{ fontWeight: "bold" }}>
										EXPIRED
									</Typography>
								) : (
									<Typography color="green" sx={{ fontWeight: "bold" }}>
										PAID
									</Typography>
								)}
							</TableCell>
							<TableCell>
								{row.status == "PENDING" && (
									<Button
										onClick={() => {
											dispatch(transactionsCanceled(row.id_invoice));
											window.location.reload();
										}}
									>
										<Cancel />
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
}
