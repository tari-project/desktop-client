import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import classnames from "classnames";

const styles = theme => ({
	root: { width: 30, height: 30, color: "#FFFFFF" },
	default: {
		backgroundColor: "#00838F"
	},
	other: {
		backgroundColor: "#0D47A1"
	}
});

const CustomAvatar = ({ classes, children, variant, className }) => {
	const initials = children && children.length > 0 ? children[0] : "?";

	return (
		<Avatar
			className={classnames({
				[classes.root]: true,
				[classes[variant]]: true,
				[className]: true
			})}
		>
			{initials}
		</Avatar>
	);
};

CustomAvatar.defaultProps = {
	variant: "default",
	className: ""
};

CustomAvatar.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.string,
	variant: PropTypes.oneOf(["default", "other"]),
	className: PropTypes.string
};

export default withStyles(styles)(CustomAvatar);
