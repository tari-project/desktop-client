import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "mobx-react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import BreadCrumbs from "../../common/BreadCrumbs";
import ChatList from "./ConversationList";
import NewChatDialog from "./NewChatDialog";
import conversationsStore from "../../../stores/conversations";
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
			justifyContent: "flex-end",
			paddingBottom: 25
		},
		addFab: {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.secondary.main
		}
	};
};

class Conversations extends Component {
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

				<Provider
					conversationsStore={conversationsStore}
					contactsStore={contactsStore}
				>
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

export default withStyles(styles)(Conversations);
