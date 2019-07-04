import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import classnames from "classnames";

import { inject, observer } from "mobx-react";

const styles = theme => {
	return {
		root: {}
	};
};

const OpenMessage = ({ children, name, classes, isMe }) => {
	const initials = typeof name === "string" && name.length > 0 ? name[0] : "?";

	const avatar = (
		<Avatar className={classes.availableColors}>{initials}</Avatar>
	);

	return (
		<div>
			{avatar}
			<Typography className={classes.messageText}>{children}</Typography>
		</div>
	);
};

class ChatList extends Component {
	render() {
		const { classes, messagesStore } = this.props;
		const { messages } = messagesStore;

		return (
			<div className={classes.root}>
        		TODO list open chats (Click the add button)
			</div>
		);
	}
}

export default withStyles(styles)(inject("messagesStore")(observer(ChatList)));
