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
	return (
		<React.Fragment>
			<FormGroup sx={{ ml: 1 }}>
				<FormControlLabel control={<Checkbox />} label="Mandi" />
				<FormControlLabel control={<Checkbox />} label="Potong Kuku" />
				<FormControlLabel control={<Checkbox />} label="Membersihkan Kutu" />
				<FormControlLabel control={<Checkbox />} label="Potong Rambut/Bulu" />
			</FormGroup>
		</React.Fragment>
	);
}
