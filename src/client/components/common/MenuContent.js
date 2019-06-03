import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import logo from "../../images/white-logo.svg";

//Icons
import ContactsIcon from "@material-ui/icons/People";
import MessagesIcon from "@material-ui/icons/Message";
//import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
//import AboutIcon from "@material-ui/icons/Info";
import DebugIcon from "@material-ui/icons/BugReport";

const styles = theme => ({
	content: {
		flex: 1,
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "column"
	},
	logoContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	},
	logo: {
		color: "#FFFFFF",
		width: "80%",
		height: "100%"
	},
	icon: {
		color: theme.palette.text.default
		//marginRight: 4
	}
});

const MenuItem = ({ to, children }) => {
	return (
		<Link to={to}>
			<ListItem
				style={{
					display: "flex",
					justifyContent: "center"
				}}
				button
			>
				{children}
				{/* <ListItemText inset primary={children}/> */}
			</ListItem>
		</Link>
	);
};

class MenuContent extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { classes } = this.props;

		return (
			<List component="nav" style={{ flex: 1, display: "flex" }}>
				<div className={classes.content}>
					<div>
						<div className={classes.logoContainer}>
							<img src={logo} className={classes.logo} alt="logo"/>
						</div>

						{/* <MenuItem to="/">
							<HomeIcon className={classes.icon}/>
						</MenuItem> */}

						<MenuItem to="/messages">
							<MessagesIcon className={classes.icon}/>
						</MenuItem>

						<MenuItem to="/contacts">
							<ContactsIcon className={classes.icon}/>{" "}
						</MenuItem>
					</div>

					<div>
						{/* <MenuItem to="/about">
							<AboutIcon className={classes.icon}/>
						</MenuItem> */}
						<MenuItem to="/debug">
							<DebugIcon className={classes.icon}/>
						</MenuItem>
						<MenuItem to="/settings">
							<SettingsIcon className={classes.icon}/>
						</MenuItem>
					</div>
				</div>
			</List>
		);
	}
}

MenuContent.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuContent);
