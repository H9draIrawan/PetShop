import { Outlet } from "react-router-dom";
import React from 'react';
import { Card, CardContent, Typography, Divider, Grid, Paper } from '@mui/material';
import UpcomingAppointmentCard from './UpcomingAppointment';

export default function Dashboard() {
    const upcomingAppointment = {
        name: 'Fluffer Puff',
        date: '2024-01-31',
        time: '10:00 AM',
        description: 'Mandi',
      };

    return(
        <>
            <h1>Upcoming Appoinments</h1>
            <div style={{ padding: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '15px' }}>
                        <UpcomingAppointmentCard appointment={upcomingAppointment} />
                    </Paper>
                    </Grid>
                </Grid>
            </div>
            {/* <Outlet/> */}
        </>
    )
}

