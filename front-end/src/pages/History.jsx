import { Outlet } from "react-router-dom";

// export default function History() {
//     return(
//         <>
//             <h1>History</h1>
//             <Outlet/>
//         </>
//     )
// }

import React from 'react';
import { Paper, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const groomingHistory = [
  { id: 1, petName: 'Buddy', service: 'Bath and Haircut', date: '2023-10-15' },
  { id: 2, petName: 'Whiskers', service: 'Nail Trim', date: '2023-11-20' },
];

const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

const HistoryPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Grooming History
      </Typography>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pet Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groomingHistory.map((historyEntry) => (
              <TableRow key={historyEntry.id}>
                <TableCell>{historyEntry.id}</TableCell>
                <TableCell>{historyEntry.petName}</TableCell>
                <TableCell>{historyEntry.service}</TableCell>
                <TableCell>{formatDateString(historyEntry.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryPage;
