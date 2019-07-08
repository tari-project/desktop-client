import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "../../common/Avatar";
import MessagesIcon from "@material-ui/icons/Message";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const styles = theme => {
	return {
		list: { width: "100%", overflowY: "scroll" }
	};
};

class ContactsList extends Component {
	render() {
		const { classes, contactsStore } = this.props;
		const { contacts } = contactsStore;

		if (!contacts) {
			return <Typography>No contacts</Typography>;
		}

		return (
			<List dense className={classes.list}>
				{contacts.map(({ screen_name, id }) => {
					return (
						<ListItem key={screen_name} button>
							<ListItemAvatar>
								<Avatar>{screen_name}</Avatar>
							</ListItemAvatar>
							<ListItemText primary={screen_name}/>
							<ListItemSecondaryAction>
								<Link to={`/messages/${id}`}>
									<IconButton edge="end" aria-label="Start chat">
										<MessagesIcon/>
									</IconButton>
								</Link>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		);
	}
}

export default withStyles(styles)(
	inject("contactsStore")(observer(ContactsList))
);
