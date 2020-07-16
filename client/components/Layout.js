import React, {useEffect, useState} from "react";

import {IconButton} from "@material-ui/core";

import DomainIcon from '@material-ui/icons/Domain';
import GitHubIcon from '@material-ui/icons/GitHub';

import Login from "./Screens/Login";
import GarageScreen from "./Screens/GarageDoorOpener";

const Layout = props =>
{
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() =>
	{

	}, []);

	return loggedIn ?
		<GarageScreen {...props}/> :
		<>
			<section style={{position: "absolute", top: 10, left: 10}}>
				<IconButton
					href={"https://www.maxrosoff.com"}
					target="_blank" rel="noopener"
				>
					<DomainIcon />
				</IconButton>
				<IconButton
					href={"https://github.com/mrrosoff/Garage-Pi"}
					target="_blank" rel="noopener"
				>
					<GitHubIcon />
				</IconButton>
			</section>
			<Login setLoggedIn={setLoggedIn} {...props}/>
		</>
};

export default Layout;
