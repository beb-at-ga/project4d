import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { red, orange } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: red
  }
});

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    margin: "0px 0px 0px 0px",
    [theme.breakpoints.up("sm")]: {
      margin: "0px 0px 0px 240px",
      flexShrink: 0
    }
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'lightgray',
    zIndex: theme.zIndex.drawer + 1,
  },
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {},
  margin: "40px 16px",
}));
