import { useEffect, useMemo } from "react";
import {
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ordersLoaded } from "../apps/orderSlice";
import axios from "axios";

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const HistoryPage = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/order/user/${user}`)
      .then(function (response) {
        dispatch(ordersLoaded(response.data));
        console.log(response.data);
      });
  }, []);

  const orders = useSelector((state) => state.order.orders);

  const filteredOrders = useMemo(() => {
    if (orders.length <= 0) return [];
    return orders.filter(order => order.status || order.status == "true");
  }, [orders]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Grooming History
      </Typography>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        {
          filteredOrders.length > 0 ?
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
            {filteredOrders.map((historyEntry) => (
                <TableRow key={historyEntry.details[0]._id}>
                  <TableCell>{historyEntry._id}</TableCell>
                  <TableCell>{historyEntry.pets[0].nama}</TableCell>
                  <TableCell>{historyEntry.details[0].kategori.map((kat, idx) =>{
                    if(idx < historyEntry.details[0].kategori.length - 1) {
                      return kat + ","
                    } else return kat
                  })}</TableCell>
                  <TableCell>{historyEntry.date ? formatDateString(historyEntry.date) : new Date().toLocaleString()}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table> :
            <Typography gutterBottom textAlign={"center"}>
              No history order
            </Typography>
        }
      </TableContainer>
    </div>
  );
};

export default HistoryPage;
