import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuContent from "./MenuContent";

const drawerWidth = 65;

const styles = theme => ({
	root: {
		height: "100%",
		flex: 1,
		flexGrow: 1,
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex",
		width: "100%"
	},
	drawerPaper: {
		width: drawerWidth,
		minHeight: "100%",
		position: "relative",
		borderStyle: "none",
		backgroundColor: "rgba(0,0,0,0.05)"
	},
	content: {
		height: "100%",
		flexGrow: 1,
		padding: 10
	}
});

class Container extends React.Component {
	render() {
		const { classes, children } = this.props;

		return (
			<div className={classes.root}>
				<Drawer
					anchor="left"
					variant="permanent"
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<MenuContent/>
				</Drawer>
				<main className={classes.content}>{children}</main>
			</div>
		);
	}
}

Container.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired
};

export default withStyles(styles)(Container);
