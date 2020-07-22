import React, {useEffect, useState} from "react";

import {IconButton} from "@material-ui/core";

import GitHubIcon from '@material-ui/icons/GitHub';

import Login from "./Login";
import MobileHome from "./Home/Mobile/Mobile";
import FullScreenHome from "./Home/FullScreen/FullScreen";

import useWindowSize from "../hooks/useWindowSize";

const Layout = props =>
{
	const {width, height} = useWindowSize();
	const [loggedIn, setLoggedIn] = useState(false);

	let screen = width > 1200 ?
		<FullScreenHome width={width} height={height} {...props}/> :
		<MobileHome width={width} height={height} {...props}/>;

	useEffect(() =>
	{

	}, []);

	return loggedIn ? screen :
		<>
			{
				width > 1200 ?
					<section style={{position: "absolute", top: 10, left: 10}}>
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
