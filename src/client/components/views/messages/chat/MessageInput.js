import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EnterIcon from "@material-ui/icons/Send";

import PropTypes from "prop-types";

const styles = theme => {
	return {
		root: {
			display: "flex"
		},
		iconButton: {
			color: "#FFFFFF"
		}
	};
};

class MessageInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ""
		};
	}

	onSend() {
		const { text } = this.state;

		if (text) {
			this.props.onSend(text);

			this.setState({ text: "" });
		}
	}

	handleKeyPress(e) {
		if (e.key === "Enter") {
			this.onSend();
		}
	}

	render() {
		const { classes } = this.props;
		const { text } = this.state;

		return (
			<div className={classes.root}>
				<TextField
					id="standard-full-width"
					placeholder="Type here..."
					// helperText="Connected"
					fullWidth
					InputLabelProps={{
						shrink: true
					}}
					value={text}
					onChange={e => this.setState({ text: e.target.value })}
					onKeyPress={this.handleKeyPress.bind(this)}
				/>

				<IconButton
					color="primary"
					className={classes.iconButton}
					aria-label="Directions"
					onClick={this.onSend.bind(this)}
				>
					<EnterIcon/>
				</IconButton>
			</div>
		);
	}
}

MessageInput.propTypes = {
	onSend: PropTypes.func.isRequired
};

export default withStyles(styles)(MessageInput);
