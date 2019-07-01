import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import classnames from "classnames";
import { inject, observer } from "mobx-react";

const styles = theme => {
	return {
		root: {
			flex: 1,
			width: "100%",
			overflowY: "scroll"
		},
		messageContainer: {
			display: "flex",
			alignItems: "center",
			marginBottom: 10
		},
		rightMessageContainer: {
			justifyContent: "flex-end"
		},
		avatar: {
			width: 30,
			height: 30
		},
		meAvatar: {
			marginLeft: 10,
			color: "#FFFFFF",
			backgroundColor: "#00838F"
		},
		zerAvatar: {
			marginRight: 10,
			color: "#FFFFFF",
			backgroundColor: "#0D47A1"
		},
		messageText: {
			fontSize: 15
		}
	};
};

const Message = ({ children, name, classes, isMe }) => {
	const initials = typeof name === "string" && name.length > 0 ? name[0] : "?";

	const avatar = (
		<Avatar
			className={classnames({
				[classes.avatar]: true,
				[classes.meAvatar]: isMe,
				[classes.zerAvatar]: !isMe
			})}
		>
			{initials}
		</Avatar>
	);

	return (
		<div
			className={classnames({
				[classes.messageContainer]: true,
				[classes.rightMessageContainer]: isMe
			})}
		>
			{isMe ? null : avatar}
			<Typography className={classes.messageText}>{children}</Typography>
			{isMe ? avatar : null}
		</div>
	);
};

class MessageBox extends Component {
	autoScrollMessages() {
		//TODO only scroll if there was a new message
		const list = document.getElementById("message-list");
		if (list) {
			const scrollTop = list.scrollHeight - list.clientHeight;
			list.scrollTop = scrollTop;
		}
	}

	renderMessages(messages) {
		if (messages === null) {
			return null;
		}

		const { classes } = this.props;

		return messages.map(({ id, from, text, isMe }) => (
			<Message key={id} name={from} classes={classes} isMe={!!isMe}>
				{text}
			</Message>
		));
	}

	render() {
		const { classes, messagesStore } = this.props;
		const { messages } = messagesStore;

		this.autoScrollMessages();

		return (
			<div className={classes.root} id="message-list">
				{this.renderMessages(messages)}
			</div>
		);
	}
}

export default withStyles(styles)(
	inject("messagesStore")(observer(MessageBox))
);
