import { Card, CardContent, Typography, Divider, Grid } from "@mui/material";

const UpcomingAppointmentCard = ({ appointment }) => {
	const { details, tanggal, status, total, pets } = appointment;

	const providedDate = new Date(tanggal);

	const day = providedDate.getDate();
	const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
		providedDate,
	);
	const year = providedDate.getFullYear();

	const formattedDate = `${day} ${month} ${year}`;
	
	return (
		<Card variant="outlined">
			<CardContent>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Typography
							variant="body1"
							color="black"
							sx={{ fontWeight: "bold" }}
							gutterBottom
						>
							Date: {formattedDate}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}></Grid>
				</Grid>
				<Divider />
				<Typography variant="body2">
					{details.map((detail, idx) => (
						<>
							{pets[idx]._id == detail.id_pet && (
								<Typography>
									{pets[idx].nama} : {detail.kategori + ""}
								</Typography>
							)}
							<br />
						</>
					))}
				</Typography>
				<Divider />
				<Typography variant="body1">
					{total.toLocaleString("id-ID", {
						style: "currency",
						currency: "IDR",
					})}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default UpcomingAppointmentCard;
