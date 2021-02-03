import React, {createContext} from "react";

import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";

import LoginLayout from "./Login/LoginLayout";
import LandingPage from "./Login/LandingPage";
import CreateAccount from "./Login/CreateAccount";
import ForgotPassword from "./Login/ForgotPassword";

import HomeRoute from "./Home/HomeRoute";
import DashBoard from "./Home/Dashboard";

import NotFound from "./NotFound";

export const AuthContext = createContext();

const Router = props =>
{
	return (
		<AuthNeeded>
			<BrowserRouter>
				<Routes {...props}/>
			</BrowserRouter>
		</AuthNeeded>
	);
};

const Routes = props =>
{
	const history = useHistory();

	return(
		<Switch>
			<Route exact path={"/"}>
				<LoginLayout>
					<LandingPage history={history} {...props}/>
				</LoginLayout>
			</Route>
			<Route exact path={"/create-account"}>
				<LoginLayout>
					<CreateAccount history={history} {...props}/>
				</LoginLayout>
			</Route>
			<Route exact path={"/forgot-password"}>
				<LoginLayout>
					<ForgotPassword history={history} {...props}/>
				</LoginLayout>
			</Route>
			<HomeRoute exact path={"/dashboard"} history={history} {...props}>
				<DashBoard history={history} {...props} />
			</HomeRoute>
			<Route exact path={"*"}>
				<LoginLayout>
					<NotFound history={history} {...props}/>
				</LoginLayout>
			</Route>
		</Switch>
	)
}

const AuthNeeded = props =>
{
	const authData = {
		userData: null,
		setUserData: (value) => authData.userData = value,
		loggedIn: false,
		setLoggedIn: (value) => authData.loggedIn = value
	}

	return (
		<AuthContext.Provider value={authData}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default Router;
