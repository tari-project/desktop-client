import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "mobx-react";

import logsStore from "../../../stores/logs";
import LogsStream from "./LogsStream";

const styles = theme => {
	return {
		root: {
			height: "100%"
		}
	};
};

class DebugView extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Provider logsStore={logsStore}>
				<div className={classes.root}>
					<Typography>Server logs</Typography>

					<LogsStream/>
				</div>
			</Provider>
		);
	}
}

export default withStyles(styles)(DebugView);
