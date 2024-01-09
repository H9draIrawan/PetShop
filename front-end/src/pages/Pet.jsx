import {
	Autocomplete,
	Box,
	Button,
	Container,
	Grid,
	MenuItem,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	InputLabel
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	petsAdded,
	petsBanned,
	petsLoaded,
	petsUpdated,
} from "../apps/petSlice";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

export default function Pet() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/api/pet`).then(function (response) {
			dispatch(petsLoaded(response.data));
			console.log(response.data);
		});
	});
	const rows = useSelector((state) => state.pet.pets);

	const [Form, setForm] = useState(null);
	const [Pet, setPet] = useState(null);
	const [Image, setImage] = useState();
	const [SaveImage, setSaveImage] = useState();
	

	const onSubmit = (data) => {
		data.profile = SaveImage;
		if (Form == "add") {
			dispatch(petsAdded(data));
		} else if (Form == "edit") {
			data._id = Pet._id;
			dispatch(petsUpdated(data));
		}
		setForm(null);
		setPet(null);
	};

	const Schema = Joi.object({
		nama: Joi.string().empty(),
		umur: Joi.number().min(1),
		jenis: Joi.string().empty(),
		ras: Joi.string().allow(""),
	});
	const { register, handleSubmit } = useForm({
		resolver: joiResolver(Schema),
		values: {
			nama: Pet?.nama,
			umur: Pet?.umur,
			jenis: Pet?.jenis,
			ras: Pet?.ras,
		},
	});

	return (
		<Container>
			{!Form && (
				<Stack>
					<TableContainer sx={{ mt: 3 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
										Profile
									</TableCell>
									<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
										Nama
									</TableCell>
									<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
										Umur
									</TableCell>
									<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
										Jenis
									</TableCell>
									<TableCell sx={{ fontWeight: "bold", fontSize: 25 }}>
										Ras
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(
									(row) =>
										row.status && (
											<TableRow key={row._id}>
												<TableCell>
													<img
														src={
															import.meta.env.VITE_API_URL +
															"/static/" +
															row.profile
														}
														width={200}
													/>
												</TableCell>
												<TableCell
													sx={{ fontSize: 20, textTransform: "capitalize" }}
												>
													{row.nama}
												</TableCell>
												<TableCell
													sx={{ fontSize: 20, textTransform: "capitalize" }}
												>
													{row.umur}
												</TableCell>
												<TableCell
													sx={{ fontSize: 20, textTransform: "capitalize" }}
												>
													{row.jenis}
												</TableCell>
												<TableCell
													sx={{ fontSize: 20, textTransform: "capitalize" }}
												>
													{row.ras}
												</TableCell>
												<TableCell>
													<Button
														onClick={() => {
															setForm("edit");
															setPet(row);
														}}
													>
														<Edit />
													</Button>
													<Button onClick={() => dispatch(petsBanned(row._id))}>
														<Delete />
													</Button>
												</TableCell>
											</TableRow>
										),
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<Button
						variant="contained"
						sx={{ m: 3 }}
						onClick={() => setForm("add")}
					>
						Tambah Pet
					</Button>
				</Stack>
			)}
			{Form && (
				<Box component="form" sx={{ m: 3 }} onSubmit={handleSubmit(onSubmit)}>
					<img src={Image} style={{ width: 100, margin: 10 }} />
					<InputLabel style={{ marginTop:"0px" }}>Foto</InputLabel>
					<TextField
						style={{ marginTop:"0px" }}
						type="file"
						fullWidth
						variant="outlined"
						sx={{ width: 300, mt: 3 }}
						onChange={(event) => {
							setImage(URL.createObjectURL(event.target.files[0]));
							setSaveImage(event.target.files[0]);
						}}
					/>
					<br />
					<InputLabel style={{ marginTop:"15px" }}>Nama</InputLabel>
					<TextField
						// label="Nama"
						style={{ marginTop:"0px", width: "825px" }}
						fullWidth
						variant="outlined"
						sx={{ width: 800, mt: 3 }}
						{...register("nama")}
					/>

					<Box display={"flex"}>
                    	<Box width={"100%"} marginRight={3}>
							<InputLabel style={{ marginTop:"15px" }}>Umur</InputLabel>
							<TextField
								// label="Umur"
								style={{ marginTop:"0px" }}
								type="number"
								sx={{ width: 400, mt: 3 }}
								{...register("umur")}
							/>
						</Box>
						<Box marginX={"auto"} width={"100%"}>
							<InputLabel style={{ marginTop:"15px" }}>Jenis Hewan</InputLabel>
							<Select style={{ marginTop:"0px" }} sx={{ width: 400, mt: 3 }} {...register("jenis")}>
								<MenuItem value={"Anjing"}>Anjing</MenuItem>
								<MenuItem value={"Kucing"}>Kucing</MenuItem>
								<MenuItem value={"Hamster"}>Hamster</MenuItem>
								<MenuItem value={"Kelinci"}>Kelinci</MenuItem>
							</Select>
						</Box>
					</Box>

					<InputLabel style={{ marginTop:"15px" }}>Ras</InputLabel>
					<TextField
						// label="Ras"
						style={{ marginTop:"0px" }}
						variant="outlined"
						sx={{ width: 400, mt: 3 }}
						{...register("ras")}
					/>
					<br />
					<Button type="submit" variant="contained" sx={{ mt: 3 }}>
						Submit
					</Button>
				</Box>
			)}
		</Container>
	);
}
