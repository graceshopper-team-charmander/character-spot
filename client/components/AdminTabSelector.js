import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500
  }
});

const AdminTabSelector = (props) => {
  const {selectedTab, setSelectedTab} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();


  const handleChange = (evt, newValue) => {
    const section = evt.target.innerText.toLowerCase();
    setValue(newValue);
    setSelectedTab(section);
    history.push('/admin/' + section);
  };


  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example">
        <Tab icon={<PeopleAltIcon />} label="Users" />
        <Tab icon={<AddShoppingCartIcon />} label="Products" />
      </Tabs>
    </Paper>
  );
};

export default AdminTabSelector;
