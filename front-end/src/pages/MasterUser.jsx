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

export default function MasterUser() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/user`)
			.then(function (response) {
				dispatch(usersLoaded(response.data));
				console.log(response.data);
			});
	}, []);
	const [rows, setrows] = useState(useSelector((state) => state.user.users));
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [EditUser, setEditUser] = useState(false);
	const [User, setUser] = useState(null);
	// const [Image, setImage] = useState();
	// const [SaveImage, setSaveImage] = useState();

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const onSubmit = (data) => {
		// data.profile = SaveImage;
		dispatch(usersUpdated(data));
		setEditUser(false);
		setUser(null);
		// setImage(null);
		// setSaveImage(null);
		window.location.reload();
	};

	const Schema = Joi.object({
		_id: Joi.string().empty(),
		nama: Joi.string().empty(),
		username: Joi.string().empty(),
		email: Joi.string().empty(),
		no_hp: Joi.string().empty(),
		alamat: Joi.string().empty(),
		kota: Joi.string().empty(),
		password: Joi.string().empty(),
		confirm_password: Joi.ref("password"),
	});
	const { register, handleSubmit } = useForm({
		resolver: joiResolver(Schema),
		values: {
			_id: User?._id,
			nama: User?.nama,
			username: User?.username,
			email: User?.email,
			alamat: User?.alamat,
			kota: User?.kota,
			no_hp: User?.no_hp,
		},
	});

	if (!EditUser) {
		return (
			<>
				<TableContainer
					component={Paper}
					sx={{ overflowX: "auto", maxWidth: 1000, minWidth: 1000, mt: 3 }}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: "bold" }}>Profile</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Nomer Hp</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Kota</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Alamat</TableCell>
								<TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? rows.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage,
								  )
								: rows
							).map((row) => (
								<TableRow key={row._id}>
									<TableCell>
										<img
											src={
												import.meta.env.VITE_API_URL + "/static/" + row.profile
											}
											width={200}
										/>
									</TableCell>
									<TableCell>{row.nama}</TableCell>
									<TableCell>{row.username}</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>{row.no_hp}</TableCell>
									<TableCell>{row.kota}</TableCell>
									<TableCell>{row.alamat}</TableCell>
									<TableCell>
										{row.status == "active" ? (
											<Typography color="green" sx={{ fontWeight: "bold" }}>
												ACTIVE
											</Typography>
										) : row.status == "nonactive" ? (
											<Typography color="red" sx={{ fontWeight: "bold" }}>
												NONACTIVE
											</Typography>
										) : (
											<Typography color="red" sx={{ fontWeight: "bold" }}>
												BANNED
											</Typography>
										)}
									</TableCell>
									<TableCell>
										<Button
											onClick={() => {
												setEditUser(true);
												setUser(row);
											}}
										>
											<Edit />
										</Button>
										{row.status == "nonactive" && (
											<Button
												onClick={() => {
													dispatch(usersDeleted(row._id));
													window.location.reload();
												}}
											>
												<Delete />
											</Button>
										)}
										{row.status == "active" ? (
											<Button
												onClick={() => {
													dispatch(usersBanned(row._id));
													window.location.reload();
												}}
											>
												<Block />
											</Button>
										) : (
											<Button
												onClick={() => {
													dispatch(userUnbanned(row._id));
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
			</>
		);
	} else {
		return (
			<Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					sx={{ width: 475, m: 1 }}
					type="text"
					label="Nama"
					{...register("nama")}
				/>
				<TextField
					sx={{ width: 475, m: 1 }}
					type="text"
					label="Username"
					{...register("username")}
				/>
				<br />
				<TextField
					sx={{ width: 475, m: 1 }}
					type="email"
					label="Email"
					{...register("email")}
				/>
				<TextField
					sx={{ width: 475, m: 1 }}
					type="text"
					label="No HP"
					{...register("no_hp")}
				/>
				<br />
				<TextField
					sx={{ width: 475, m: 1 }}
					type="text"
					label="Alamat"
					{...register("alamat")}
				/>
				<TextField
					sx={{ width: 475, m: 1 }}
					type="text"
					label="Kota"
					{...register("kota")}
				/>
				<br />
				{/* <img src={Image} style={{ width: 100, margin: 10 }} /> */}
				{/* <TextField
					sx={{ width: 475, m: 1 }}
					type="file"
					onChange={(event) => {
						setImage(URL.createObjectURL(event.target.files[0]));
						setSaveImage(event.target.files[0]);
					}}
				/> */}
				{/* <br /> */}
				<TextField
					sx={{ width: 475, m: 1 }}
					type="password"
					label="Password"
					{...register("password")}
				/>
				<TextField
					sx={{ width: 475, m: 1 }}
					type="password"
					label="Confirm Password"
					{...register("confirm_password")}
				/>
				<br />
				<Button
					type="submit"
					{...register("_id")}
					variant="contained"
					sx={{ m: 1 }}
				>
					Edit
				</Button>
				<Button
					onClick={() => {
						setEditUser(false);
						setUser(null);
					}}
					variant="contained"
					sx={{ m: 1 }}
				>
					Cancel
				</Button>
			</Box>
		);
	}
}
