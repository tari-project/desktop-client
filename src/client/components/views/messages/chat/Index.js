import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer, Provider } from "mobx-react";

import MessageInput from "./MessageInput";
import MessageBox from "./MessageBox";

import messagesStore from "../../../../stores/messages";
import BreadCrumbs from "../../../common/BreadCrumbs";
import contactsStore from "../../../../stores/contacts";

const styles = theme => {
	return {
		root: {
			display: "flex",
			height: "100%"
		},
		messagesContainer: {
			height: "100%",
			display: "flex",
			flex: 1,
			flexDirection: "column"
			//borderStyle: "solid"
		},
		messageBox: {
			flex: 1,
			width: "100%",
			backgroundColor: "rgba(255,255,255,0.05)"
		}
	};
};

class ChatView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			screenName: ""
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;

		//TODO move this logic to a mobx store
		const screenName = contactsStore.contacts
			? contactsStore.contacts.find(c => c.id === id).screenName
			: "Loading...";

		this.setState({ screenName });

		messagesStore.startChat(id);
	}

	sendMessage(text) {
		messagesStore.sendMessage(text);
	}

	render() {
		const { classes } = this.props;
		const { screenName } = this.state;

		return (
			<React.Fragment>
				<BreadCrumbs
					crumbs={[
						{ to: "/messages", label: "Messages" },
						{ label: screenName }
					]}
				/>
				<Provider messagesStore={messagesStore}>
					<div className={classes.root}>
						<div className={classes.messagesContainer}>
							<MessageBox/>
							<MessageInput onSend={this.sendMessage.bind(this)}/>
						</div>
					</div>
				</Provider>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ChatView);
