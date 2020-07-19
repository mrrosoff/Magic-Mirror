import React, {useEffect, useState} from "react";

import {IconButton} from "@material-ui/core";

import DomainIcon from '@material-ui/icons/Domain';
import GitHubIcon from '@material-ui/icons/GitHub';

import Login from "./Screens/Login";
import GarageScreen from "./Screens/GarageDoorOpener";

import useWindowSize from "../hooks/useWindowSize";

const Layout = props =>
{
	const {width, height} = useWindowSize();
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() =>
	{

	}, []);

	return loggedIn ?
		<GarageScreen width={width} height={height} {...props}/> :
		<>
			{
				width > 1200 ?
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
					: null
			}
			<Login width={width} height={height} setLoggedIn={setLoggedIn} {...props}/>
		</>
};

export default Layout;
