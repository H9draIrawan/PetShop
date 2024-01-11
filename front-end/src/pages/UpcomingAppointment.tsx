import React from 'react';
import { Card, CardContent, Typography, Divider, Grid } from '@mui/material';

interface IUpcomingAppointmentProps {
  appointment: {
    details: [
      {
        _id: false,
        id_pet: string,
        nama : string,
        kategori: [String],
        harga: Number,
      },
    ],
    tanggal: Date,
    status: {
      type: Boolean,
      default: false,
    },
  }
}

const UpcomingAppointmentCard = (props: IUpcomingAppointmentProps) => {
  const { details, tanggal, status } = props.appointment;

  const providedDate = new Date(tanggal);

  const day = providedDate.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(providedDate);
  const year = providedDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {
            details.map((detail) => (
              <>
                {detail.id_pet}
              </>
            ))
          }
        </Typography>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Date: {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Time: 00:00:00
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="body1">
          {
            details.map((detail) => (
              <>
                {detail.kategori}
                {", "}
              </>
            ))
          }
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentCard;
