import { createMuiTheme } from "@material-ui/core/styles";

const textColorPrimary = "#FFFFFF";
const textColorSecondary = "#000000";

const theme = createMuiTheme({
	palette: {
		type: "dark"
	},
	typography: {
		fontSize: 16,
		color: textColorPrimary
	},
	primary: {},
	overrides: {
		MuiButton: {
			root: {
				boxShadow: "none"
			}
		}
	}
});

export { textColorPrimary, textColorSecondary, theme };
