import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";

import { inject, observer } from "mobx-react";
import Avatar from "../../common/Avatar";

const styles = theme => {
	return {
		root: {
			minWidth: 300
		}
	};
};

class NewChatDialog extends Component {
	render() {
		const { classes, contactsStore, open, onClose } = this.props;
		const { contacts } = contactsStore;

		return (
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Start new chat</DialogTitle>
				<DialogContent className={classes.root}>
					<List>
						{contacts ? (
							contacts.map(({ screen_name, id }) => (
								<Link to={`/messages/${id}`} key={id}>
									<ListItem button onClick={onClose}>
										<ListItemAvatar>
											<Avatar>{screen_name}</Avatar>
										</ListItemAvatar>
										<ListItemText primary={screen_name}/>
									</ListItem>
								</Link>
							))
						) : (
							<Typography>Loading contacts...</Typography>
						)}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

NewChatDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};
export default withStyles(styles)(
	inject("contactsStore")(observer(NewChatDialog))
);
