import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
	return {
		root: {
			flex: 1,
			width: "100%",
			height: "100%",
			overflowY: "scroll"
		},
		logEntry: {
			fontSize: 12
		}
	};
};

class LogsStream extends Component {
	render() {
		const { logsStore, classes } = this.props;

		return (
			<div className={classes.root}>
				<pre>
					{logsStore.logs.map((log, index) => (
						<div className={classes.logEntry} key={index}>
							{log}
						</div>
					))}
				</pre>
			</div>
		);
	}
}

export default withStyles(styles)(inject("logsStore")(observer(LogsStream)));
