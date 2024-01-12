import {
	Autocomplete,
	Box,
	Button,
	Container,
	Grid,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
	InputLabel,
	Card, 
	CardContent,
	CardMedia
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
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

export default function Pet() {
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/pet`)
			.then(function (response) {
				dispatch(petsLoaded(response.data));
				console.log(response.data);
			});
	}, []);
	const rows = useSelector((state) => state.pet.pets);

	const [Form, setForm] = useState(null);
	const [Pet, setPet] = useState(null);
	const [Image, setImage] = useState();
	const [SaveImage, setSaveImage] = useState();

	const onSubmit = (data) => {
		data.id_user = JSON.parse(localStorage.getItem("user"))._id;
		data.profile = SaveImage;
		if (Form == "add") {
			dispatch(petsAdded(data));
		} else if (Form == "edit") {
			data._id = Pet._id;
			dispatch(petsUpdated(data));
		}
		setForm(null);
		setPet(null);
		window.location.reload();
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
				<Stack sx={{mt:3}}>
					{rows.map(
						(row) => row.status && row.user._id == JSON.parse(localStorage.getItem("user"))._id && (
							<Stack key={row._id} sx={{mb:3}}>
								<Card sx={{ display: 'flex' , width: 380, justifyContent: 'space-between'}}>
									<Box sx={{ display: 'flex', flexDirection: 'column' }}>
										<CardContent sx={{ flex: '1 0 auto' }}>
											<Typography component="div" variant="h5">
												{row.nama}
											</Typography>
											<Typography variant="subtitle1" color="text.secondary" component="div">
												{row.umur} bulan
											</Typography>
											<Typography variant="subtitle1" color="text.secondary" component="div">
												{row.jenis} : {row.ras}
											</Typography>
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
										</CardContent>
									</Box>
									<CardMedia
										component="img"
										sx={{ width: 151 }}
										image={import.meta.env.VITE_API_URL + "/static/" + row.profile}
										alt="Live from space album cover"
									/>
								</Card>
							</Stack>
						),
					)}
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
					<InputLabel style={{ marginTop: "0px" }}>Foto</InputLabel>
					<TextField
						style={{ marginTop: "0px" }}
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
					<InputLabel style={{ marginTop: "15px" }}>Nama</InputLabel>
					<TextField
						// label="Nama"
						style={{ marginTop: "0px", width: "825px" }}
						fullWidth
						variant="outlined"
						sx={{ width: 800, mt: 3 }}
						{...register("nama")}
					/>

					<Box display={"flex"}>
						<Box width={"100%"} >
							<InputLabel style={{ marginTop: "15px" }}>Umur</InputLabel>
							<Box display={'flex'} alignItems={'center'}>
								<TextField
									// label="Umur"
									style={{ marginTop: "0px" }}
									type="number"
									sx={{ width: 400, mt: 3 }}
									{...register("umur")}
								/>
								<Typography sx={{marginLeft: 2}}>bulan</Typography>
							</Box>
						</Box>
						<Box marginX={"auto"} width={"100%"}>
							<InputLabel style={{ marginTop: "15px" }}>Jenis Hewan</InputLabel>
							<Select
								style={{ marginTop: "0px" }}
								sx={{ width: 400, mt: 3 }}
								{...register("jenis")}
							>
								<MenuItem value={"Anjing"}>Anjing</MenuItem>
								<MenuItem value={"Kucing"}>Kucing</MenuItem>
								<MenuItem value={"Hamster"}>Hamster</MenuItem>
								<MenuItem value={"Kelinci"}>Kelinci</MenuItem>
							</Select>
						</Box>
					</Box>

					<InputLabel style={{ marginTop: "15px" }}>Ras</InputLabel>
					<TextField
						// label="Ras"
						style={{ marginTop: "0px" }}
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
