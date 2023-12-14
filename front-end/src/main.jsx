import React from "react";
import ReactDOM from "react-dom/client";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import RegisterLogin from "./pages/RegisterLogin";
import Home from "./pages/Home";
import AddPet from "./components/AddPet";
import DeletePet from "./components/DeletePet";
import Admin from "./pages/Admin";
import Pet from "./pages/Pet";
import UpdatePet from "./components/UpdatePet";
import Profile from "./pages/Profile";
import KritikSaran from "./pages/KritikSaran";
import Dashboard from "./pages/Dashboard";

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
				path: "Pet",
				element: <Pet />,
				children: [
					{
						path: "Add",
						element: <AddPet />,
					},
					{
						path: "Delete",
						element: <DeletePet />,
					},
					{
						path: "Update",
						element: <UpdatePet />,
					},
				],
			},
			{
				path: "Profile",
				element: <Profile />,
				children : [
				{
					path : "Dashboard",
					element: <Dashboard/>
				}
				]
			},
			{
				path: "kritik-saran",
				element:  <KritikSaran/>,
				children : [
						
				]
			},
		],
	},
	{
		path: "admin",
		element: <Admin />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
