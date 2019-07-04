import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "../../../common/Avatar";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import BreadCrumbs from "../../../common/BreadCrumbs";
import MessageInput from "./MessageInput";

const styles = theme => {
	return {
		root: {
			display: "flex",
			flexDirection: "column",
			flex: 1,
			//borderStyle: "solid", // backgroundColor: "rgba(255,255,255,0.05)",

			height: "100%"
		},
		messagesContainer: {
			paddingTop: 20,
			overflowY: "scroll",
			flex: 1,
			flexDirection: "column"
		},
		messageBox: { flex: 1, width: "100%", height: "100%" }, // 	flex: 1, //borderStyle: "solid" // root: {
		// 	width: "100%",
		// 	overflowY: "scroll"
		// },
		messageContainer: {
			display: "flex",
			alignItems: "center",
			marginBottom: 10
		},
		rightMessageContainer: { justifyContent: "flex-end" },
		meAvatar: { marginLeft: 10 },
		zerAvatar: { marginRight: 10 },
		messageText: { fontSize: 15 }
	};
};

const Message = ({ children, name, classes, isMe }) => {
	const avatar = (
		<Avatar
			className={classnames({
				[classes.meAvatar]: isMe,
				[classes.zerAvatar]: !isMe
			})}
			variant={isMe ? "other" : "default"}
		>
			{name}
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
	sendMessage(text) {
		const { messagesStore } = this.props;
		messagesStore.sendMessage(text);
	}

	renderMessages(messages) {
		if (messages === null) {
			return null;
		}

		const { classes } = this.props;

		return messages.map(({ id, screen_name, text, isMe }) => (
			<Message key={id} name={screen_name} classes={classes} isMe={!!isMe}>
				{text}
			</Message>
		));
	}

	render() {
		const { classes, messagesStore } = this.props;
		const { currentMessages, currentContact } = messagesStore;

		const screen_name = currentContact
			? currentContact.screen_name
			: "Loading...";

		return (
			<div className={classes.root}>
				<BreadCrumbs
					crumbs={[
						{ to: "/messages", label: "Messages" },
						{ label: screen_name }
					]}
				/>
				<div className={classes.messagesContainer}>
					<div className={classes.messageBox}>
						{this.renderMessages(currentMessages)}
					</div>
				</div>
				<MessageInput onSend={this.sendMessage.bind(this)}/>
			</div>
		);
	}
}

export default withStyles(styles)(
	inject("messagesStore")(observer(MessageBox))
);
