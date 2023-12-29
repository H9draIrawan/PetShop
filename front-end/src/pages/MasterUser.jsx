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
} from "@mui/icons-material";

import { useSelector } from "react-redux";

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
	const rows = useSelector((state) => state.user.users);
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
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
					).map((row) => (
						<TableRow key={row._id}>
							{console.log()}
							<TableCell>
								<img
									src={import.meta.env.VITE_API_URL + "/static/" + row.profile}
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
							<TableCell>
								<Button>
									<Edit />
								</Button>
								<Button>
									<Delete />
								</Button>
								<Button>
									<Block />
								</Button>
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
