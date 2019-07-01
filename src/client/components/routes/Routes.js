import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import withRoot from "./withRoot";
import Container from "../common/Container";
import NotFound from "../common/NotFound";

//import HomeView from "../views/home/Index";
import MessagesView from "../views/messages/Index";
import ContactsView from "../views/contacts/Index";
import DebugView from "../views/debug/Index";

class Routes extends Component {
	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		return (
			<Router>
				<Container>
					<Switch>
						<Route
							exact
							path="/"
							component={() => <Redirect to="/messages"/>}
						/>
						<Route exact path="/messages" component={MessagesView}/>
						<Route exact path="/contacts" component={ContactsView}/>

						<Route exact path="/debug" component={DebugView}/>
						<Route component={NotFound}/>
					</Switch>
				</Container>
			</Router>
		);
	}
}

Routes.propTypes = {
	//classes: PropTypes.object.isRequired
};

export default withRoot(Routes);
