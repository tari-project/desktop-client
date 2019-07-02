import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
	root: {}
});

const BreadCrumbView = ({ classes, crumbs }) =>
	crumbs ? (
		<Breadcrumbs className={classes.root}>
			{crumbs.map(({ to, label }, index) => {
				if (to) {
					return (
						<Link key={index} to={to}>
							<Typography key={index} color="textPrimary">
								{label}
							</Typography>{" "}
						</Link>
					);
				}

				return (
					<Typography key={index} color="inherit">
						{label}
					</Typography>
				);
			})}
		</Breadcrumbs>
	) : null;

BreadCrumbView.propTypes = {
	classes: PropTypes.object.isRequired,
	crumbs: PropTypes.arrayOf(
		PropTypes.shape({
			to: PropTypes.string,
			label: PropTypes.string.isRequired
		})
	).isRequired
};

export default withStyles(styles)(BreadCrumbView);
