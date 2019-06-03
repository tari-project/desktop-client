import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "mobx-react";

import MessageInput from "./MessageInput";
import MessageBox from "./MessageBox";

import messagesStore from "../../../stores/messages";

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

class HomeView extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	sendMessage(text) {
		messagesStore.sendMessage(text);
	}

	render() {
		const { classes } = this.props;

		return (
			<Provider messagesStore={messagesStore}>
				<div className={classes.root}>
					<div className={classes.messagesContainer}>
						<MessageBox/>
						<MessageInput onSend={this.sendMessage.bind(this)}/>
					</div>
				</div>
			</Provider>
		);
	}
}

export default withStyles(styles)(HomeView);
