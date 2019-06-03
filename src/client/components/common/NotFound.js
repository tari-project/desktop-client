import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class NotFound extends Component {
	render() {
		return (
			<div>
				<Typography>Coming soon</Typography>
				<Typography>{window.location.pathname}</Typography>
			</div>
		);
	}
}

export default NotFound;
