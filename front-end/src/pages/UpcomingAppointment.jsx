import React from 'react';
import { Card, CardContent, Typography, Divider, Grid } from '@mui/material';

const UpcomingAppointmentCard = ({ appointment }) => {
  const { name, date, time, description } = appointment;

  const providedDate = new Date(date);

  const day = providedDate.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(providedDate);
  const year = providedDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
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
              Time: {time}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentCard;
