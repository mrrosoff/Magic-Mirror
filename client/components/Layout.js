import React, {useEffect, useState} from "react";

import Login from "./Screens/Login";
import GarageScreen from "./Screens/GarageDoorOpener";

const Layout = props =>
{
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() =>
	{

	}, []);

	return loggedIn ? <GarageScreen {...props}/> : <Login setLoggedIn={setLoggedIn} {...props}/>
};

export default Layout;
