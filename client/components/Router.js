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

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/home">
					{
						width > 500 ?
							<FullScreenHome width={width} height={height} {...props}/> :
							<MobileHome width={width} height={height} {...props}/>
					}
				</Route>
				<Route path="/createAccount">
					<LoginLayout width={width} height={height} {...props}>
						<CreateAccount {...props}/>
					</LoginLayout>
				</Route>
				<Route path={"/"}>
					<LoginLayout width={width} height={height} {...props}>
						<Login {...props}/>
					</LoginLayout>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
