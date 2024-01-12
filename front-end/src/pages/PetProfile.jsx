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

export default function PetProfile() {
	const dispatch = useDispatch();
	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem("user"))._id;
		axios
			.get(`${import.meta.env.VITE_API_URL}/api/pet/user/${userId}`)
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
			<Typography fontSize={32} mb={2}> Daftar Pet Peliharaan Kamu</Typography>
				<Stack sx={{mt:3}} direction="row" flexWrap={"wrap"} justifyContent={"space-around"}>
					{rows.map(
						(row) => row.status && row.user._id == JSON.parse(localStorage.getItem("user"))._id && (
							<Stack key={row._id} sx={{mb:3}}>
								<Card sx={{ display: 'flex' , width: 380, justifyContent: 'space-between', maxHeight:120}}>
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
				</Stack>
		</Container>
	);
}
