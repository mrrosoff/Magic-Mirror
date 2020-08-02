import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import LoginLayout from "./Login/LoginLayout";
import Login from "./Login/Login";
import CreateAccount from "./Login/CreateAccount";
import MobileHome from "./Home/Mobile/Mobile";
import FullScreenHome from "./Home/FullScreen/FullScreen";

import useWindowSize from "../hooks/useWindowSize";

const Router = props =>
{
	const {width, height} = useWindowSize();

	let screen = width > 1200 ?
		<FullScreenHome width={width} height={height} {...props}/> :
		<MobileHome width={width} height={height} {...props}/>;

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/home">
					{screen}
				</Route>
				<Route path="/createAccount">
					<LoginLayout>
						<CreateAccount />
					</LoginLayout>
				</Route>
				<Route path={"/"}>
					<LoginLayout>
						<Login />
					</LoginLayout>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
