import {
	Autocomplete,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";

export default function AddPet() {
	const Jenis = [
		{ label: "Anjing" },
		{ label: "Kucing" },
		{ label: "Hamster" },
		{ label: "Kelinci" },
	];
	return (
		<React.Fragment>
			<Grid container spacing={3} sx={{ ml: 3 }}>
				<Grid item xs={3}>
					<TextField required label="Nama Pet" fullWidth variant="standard" />
				</Grid>
				<Grid item xs={12}>
					<Autocomplete
						disablePortal
						options={Jenis}
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Jenis" />}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Umur"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography>Pelayanan</Typography>
					<FormGroup sx={{ml:1}}>
						<FormControlLabel control={<Checkbox />} label="Mandi" />
						<FormControlLabel control={<Checkbox />} label="Potong Kuku" />
						<FormControlLabel
							control={<Checkbox />}
							label="Membersihkan Kutu"
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="Potong Rambut/Bulu"
						/>
					</FormGroup>
				</Grid>
				<Button variant="contained" sx={{ml : 3}}>Tambah Pet</Button>
			</Grid>
		</React.Fragment>
	);
}
