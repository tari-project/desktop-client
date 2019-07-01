import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import contactsStore from "../../../stores/contacts";
import ContactsList from "./List";

const styles = theme => {
	return {
		root: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			height: "100%"
		},
		fabContainer: {
			display: "flex",
			justifyContent: "flex-end"
		},
		addFab: {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.secondary.main
		}
	};
};

class ContactsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: "",
			pubKey: "",
			addContactDialogOpen: false
		};

		this.closeAddDialog = this.closeAddDialog.bind(this);
		this.saveContact = this.saveContact.bind(this);
	}

	componentDidMount() {
		contactsStore.loadContacts();
	}

	saveContact() {
		const { userName, pubKey } = this.state;

		if (!userName || !pubKey) {
			return;
		}

		contactsStore.addContact(
			{ userName, pubKey },
			() => {
				this.closeAddDialog();
				this.setState({ userName: "", pubKey: "" });
			},
			error => {
				console.error(error); //TODO error handling
			}
		);
	}

	closeAddDialog() {
		this.setState({ addContactDialogOpen: false });
	}

	renderAddDialog() {
		const { addContactDialogOpen, userName, pubKey } = this.state;

		return (
			<Dialog open={addContactDialogOpen} onClose={this.closeAddDialog}>
				<DialogTitle>New contact</DialogTitle>
				<DialogContent>
					{/*<DialogContentText>*/}
					{/*To subscribe to this website, please enter your email address here.*/}
					{/*We will send updates occasionally.*/}
					{/*</DialogContentText>*/}
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="text"
						fullWidth
						value={userName}
						onChange={e => this.setState({ userName: e.target.value })}
					/>
					<TextField
						margin="dense"
						id="pubKey"
						label="Pub key"
						type="text"
						fullWidth
						value={pubKey}
						onChange={e => this.setState({ pubKey: e.target.value })}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.closeAddDialog}>Cancel</Button>
					<Button onClick={this.saveContact} color="secondary">
            Add contact
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	render() {
		const { classes } = this.props;

		return (
			<Provider contactsStore={contactsStore}>
				<div className={classes.root}>
					{this.renderAddDialog()}
					<ContactsList/>

					<div className={classes.fabContainer}>
						<Fab
							className={classes.addFab}
							onClick={() => this.setState({ addContactDialogOpen: true })}
						>
							<AddIcon/>
						</Fab>
					</div>
				</div>
			</Provider>
		);
	}
}

export default withStyles(styles)(ContactsView);
