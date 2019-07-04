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
import BreadCrumbs from "../../common/BreadCrumbs";

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
			screen_name: "",
			pub_key: "",
			address: "",
			addContactDialogOpen: false
		};

		this.closeAddDialog = this.closeAddDialog.bind(this);
		this.saveContact = this.saveContact.bind(this);
	}

	componentDidMount() {
		contactsStore.loadContacts();
	}

	saveContact() {
		const { screen_name, pub_key, address } = this.state;

		if (!screen_name || !pub_key || !address) {
			return;
		}

		contactsStore.addContact(
			{ screen_name, pub_key, address },
			() => {
				this.closeAddDialog();
				this.setState({ screen_name: "", pub_key: "", address: "" });
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
		const { addContactDialogOpen, screen_name, pub_key, address } = this.state;

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
						id="screen_name"
						label="Screen name"
						type="text"
						fullWidth
						value={screen_name}
						onChange={e => this.setState({ screen_name: e.target.value })}
					/>
					<TextField
						margin="dense"
						id="pub_key"
						label="Public key"
						type="text"
						fullWidth
						value={pub_key}
						onChange={e => this.setState({ pub_key: e.target.value })}
					/>
					<TextField
						margin="dense"
						id="address"
						label="Address"
						type="text"
						placeholder={"127.0.0.1:20000"}
						fullWidth
						value={address}
						onChange={e => this.setState({ address: e.target.value })}
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
			<React.Fragment>
				<BreadCrumbs crumbs={[{ label: "Contacts" }]}/>
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
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ContactsView);
