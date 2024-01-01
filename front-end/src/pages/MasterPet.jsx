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
	Select,
	MenuItem,
} from "@mui/material";

import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
	Delete,
	Cancel,
	CircleSharp,
	CircleNotifications,
	Block,
	Edit,
	CheckCircle,
} from "@mui/icons-material";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	petsBanned,
	petsLoaded,
	petsUnbanned,
	petsUpdated,
} from "../apps/petSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function MasterPet() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/api/pet`).then(function (response) {
			dispatch(petsLoaded(response.data));
			console.log(response.data);
		});
	}, []);
	const rows = useSelector((state) => state.pet.pets);

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

	const [EditPet, setEditPet] = useState(false);
	const [Pet, setPet] = useState();
	const [Image, setImage] = useState();
	const [SaveImage, setSaveImage] = useState();

	const onSubmit = (data) => {
		data.profile = SaveImage;
		dispatch(petsUpdated(data));
		setEditPet(false);
		setPet(null);
		setImage(null);
		setSaveImage(null);
		window.location.reload();
	};

	const Schema = Joi.object({
		_id: Joi.string().empty(),
		nama: Joi.string().empty(),
		umur: Joi.number().min(1),
		jenis: Joi.string().empty(),
		ras: Joi.string().allow(""),
	});
	const { register, handleSubmit } = useForm({
		resolver: joiResolver(Schema),
		values: {
			_id: Pet?._id,
			nama: Pet?.nama,
			umur: Pet?.umur,
			jenis: Pet?.jenis,
			ras: Pet?.ras,
		},
	});

	if (!EditPet) {
		return (
			<TableContainer
				component={Paper}
				sx={{ overflowX: "auto", maxWidth: 1000, minWidth: 1000, mt: 3 }}
			>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "bold" }}>Profile</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Ras</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Umur</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Pemilik</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row) => (
							<TableRow key={row._id}>
								<TableCell sx={{ flex: 1 }}>
									<img
										src={
											import.meta.env.VITE_API_URL + "/static/" + row.profile
										}
										width={100}
									/>
								</TableCell>
								<TableCell>{row.nama}</TableCell>
								<TableCell>{row.jenis}</TableCell>
								<TableCell>{row.ras}</TableCell>
								<TableCell>{row.umur}</TableCell>
								<TableCell>
									{row.status ? (
										<Typography color="green" sx={{ fontWeight: "bold" }}>
											ACTIVE
										</Typography>
									) : (
										<Typography color="red" sx={{ fontWeight: "bold" }}>
											NONACTIVE
										</Typography>
									)}
								</TableCell>
								<TableCell>{row.user.nama}</TableCell>
								<TableCell>
									<Button
										onClick={() => {
											setEditPet(true);
											setPet(row);
										}}
									>
										<Edit />
									</Button>
									{row.status ? (
										<Button
											onClick={() => {
												dispatch(petsBanned(row._id));
												window.location.reload();
											}}
										>
											<Block />
										</Button>
									) : (
										<Button
											onClick={() => {
												dispatch(petsUnbanned(row._id));
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
	} else {
		return (
			<Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					sx={{ width: 475, m: 1 }}
					type="text"
					label="Nama"
					{...register("nama")}
				/>
				<br />
				<TextField
					sx={{ width: 475, m: 1 }}
					type="number"
					label="Umur"
					{...register("umur")}
				/>
				<br />
				<Select sx={{ width: 475, m: 1 }} {...register("jenis")}>
					<MenuItem value={"Anjing"}>Anjing</MenuItem>
					<MenuItem value={"Kucing"}>Kucing</MenuItem>
					<MenuItem value={"Hamster"}>Hamster</MenuItem>
					<MenuItem value={"Kelinci"}>Kelinci</MenuItem>
				</Select>
				<br />
				<TextField
					sx={{ width: 475, m: 1 }}
					type="text"
					label="Ras"
					{...register("ras")}
				/>
				<img src={Image} style={{ width: 100, margin: 10 }} />
				<TextField
					sx={{ width: 475, m: 1 }}
					type="file"
					onChange={(event) => {
						setImage(URL.createObjectURL(event.target.files[0]));
						setSaveImage(event.target.files[0]);
					}}
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
						setEditPet(false);
						setPet(null);
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
