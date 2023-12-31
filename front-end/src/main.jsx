import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./apps/store";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import RegisterLogin from "./pages/RegisterLogin";
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

const router = createBrowserRouter([
	{
		index: true,
		element: <Navigate to={"registerLogin"} />,
	},
	{
		path: "registerLogin",
		element: <RegisterLogin />,
	},
	{
		path: "home",
		element: <Home />,
		children: [
			{
				path: "pet",
				element: <Pet />,
			},
			{
				path: "Profile",
				element: <Profile />,
				children: [
					{
						path: "Dashboard",
						element: <Dashboard />,
					},
				],
			},
			{
				path: "kritik-saran",
				element: <KritikSaran />,
				children: [],
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
		<Provider store={Store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
