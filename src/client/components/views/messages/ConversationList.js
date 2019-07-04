import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

import Avatar from "../../common/Avatar";

const styles = theme => {
	return {
		root: {
			width: "100%"
		},
		avatar: {
			width: 45,
			height: 45
		}
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

class ConversationList extends Component {
	render() {
		const { classes, conversationsStore } = this.props;
		const { conversations } = conversationsStore;

		return (
			<List className={classes.root}>
				{conversations ? (
					conversations.map(({ id, screen_name, last_message }) => {
						return (
							<Link to={`/messages/${id}`} key={id}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar className={classes.avatar}>{screen_name}</Avatar>
									</ListItemAvatar>
									<ListItemText primary={screen_name} secondary={last_message}/>
								</ListItem>
								<Divider variant="inset" component="li"/>
							</Link>
						);
					})
				) : (
					<Typography>No contacts found.</Typography>
				)}
			</List>
		);
	}
}

export default withStyles(styles)(
	inject("conversationsStore")(observer(ConversationList))
);
