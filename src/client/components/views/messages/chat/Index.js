import React, { Component } from "react";
import { Provider } from "mobx-react";

import MessageBox from "./MessageBox";
import messagesStore from "../../../../stores/messages";

class ChatView extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;

		messagesStore.setCurrentUser(id);
	}

	render() {
		return (
			<Provider messagesStore={messagesStore}>
				<MessageBox/>
			</Provider>
		);
	}
}

export default ChatView;
