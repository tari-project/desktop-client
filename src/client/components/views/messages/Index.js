import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import BreadCrumbs from "../../common/BreadCrumbs";
import ChatList from "./ChatList";
import NewChatDialog from "./NewChatDialog";
import messagesStore from "../../../stores/messages";
import contactsStore from "../../../stores/contacts";

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

class MessagesList extends Component {
	constructor(props) {
		super(props);

		this.state = { newChatDialogOpen: false };

		this.closeAddDialog = this.closeAddDialog.bind(this);
	}

	closeAddDialog() {
		this.setState({ newChatDialogOpen: false });
	}

	render() {
		const { classes } = this.props;
		const { newChatDialogOpen } = this.state;

		return (
			<React.Fragment>
				<BreadCrumbs crumbs={[{ label: "Messages" }]}/>

				<Provider messagesStore={messagesStore} contactsStore={contactsStore}>
					<div className={classes.root}>
						<NewChatDialog
							open={newChatDialogOpen}
							onClose={() => this.setState({ newChatDialogOpen: false })}
						/>
						<ChatList/>
						<div className={classes.fabContainer}>
							<Fab
								className={classes.addFab}
								onClick={() => this.setState({ newChatDialogOpen: true })}
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

export default withStyles(styles)(MessagesList);
