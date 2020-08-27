import React, {useState} from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import LoginLayout from "./Login/LoginLayout";
import Login from "./Login/Login";
import CreateAccount from "./Login/CreateAccount";
import Home from "./Home/Home";

import useWindowSize from "../hooks/useWindowSize";

const Router = props =>
{
	const {width, height} = useWindowSize();
	const [adminDashboard, setAdminDashboard] = useState(false);

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/home">
					<Home width={width} height={height} adminDashboard={adminDashboard} {...props}/> :
				</Route>
				<Route path="/createAccount">
					<LoginLayout width={width} height={height} {...props}>
						<CreateAccount {...props}/>
					</LoginLayout>
				</Route>
				<Route path={"/"}>
					<LoginLayout width={width} height={height} {...props}>
						<Login setAdminDashboard={setAdminDashboard} {...props}/>
					</LoginLayout>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
