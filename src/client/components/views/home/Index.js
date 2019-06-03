import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
	return {
		root: {}
	};
};

class HomeView extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Typography>Home</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(HomeView);
