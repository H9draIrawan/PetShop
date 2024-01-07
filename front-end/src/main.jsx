import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./apps/store";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { AuthProvider } from '../src/components/Auth';

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Pet from "./pages/Pet";
import Profile from "./pages/Profile";
import KritikSaran from "./pages/KritikSaran";
import Dashboard from "./pages/Dashboard";
import Master from "./pages/Master";
import MasterUser from "./pages/MasterUser";
import MasterPet from "./pages/MasterPet";
import MasterOrder from "./pages/MasterOrder";
import MasterReview from "./pages/MasterReview";
import MasterTransaksi from "./pages/MasterTransaksi";
import Order from "./pages/Order";

const router = createBrowserRouter([
	{
		index: true,
		element: <Navigate to={"Home"} />,
	},
	{
		path: "register",
		element: <Register />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "home",
		element: <Home />,
		children: [
			{
				path: "profile",
				element: <Profile />,
				children: [
					{
						path: "dashboard",
						element: <Dashboard />,
					},
				],
			},
			{
				path: "pet",
				element: <Pet />,
			},
			{
				path: "order",
				element: <Order />,
			},
			{
				path: "kritik-saran",
				element: <KritikSaran />,
			},
		],
	},
	{
		path: "admin",
		element: <Admin />,
		children: [
			{
				path: "dashboard",
				element: <Master />,
			},
			{
				path: "user",
				element: <MasterUser />,
			},
			{
				path: "pet",
				element: <MasterPet />,
			},
			{
				path: "order",
				element: <MasterOrder />,
			},
			{
				path: "kritiksaran",
				element: <MasterReview />,
			},
			{
				path: "transaksi",
				element: <MasterTransaksi />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<Provider store={Store}>
				<RouterProvider router={router} />
			</Provider>
		</AuthProvider>
	</React.StrictMode>,
);
