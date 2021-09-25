import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { getInfo, updateInfoThunk } from "../store/auth";
import EditInfo from "./EditInfo";
import EditPassword from "./EditPassword";

const useStyles = makeStyles((theme) => ({
  infoRoot: {
    display: "flex",
    margin: "10px",
    padding: "5px",
    border: "8px solid #fcd000",
    borderRadius: "10px",
    alignItems: "center"
  },
  editButton: {
    margin: "10px",
    border: "3px solid #009edb"
  },
  buttonBox: {
    display: "flex",
    justifyContent: "right"
  },
  text: {
    fontFamily: "mario"
  }
}));

const Profile = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user) || [];
  const [edit, toggleEdit] = useState(false);
  const [editPassword, toggleEditPassword] = useState(false);

  useEffect(() => {
    dispatch(getInfo());
  }, []);

  return (
    <Grid item xs={12} className="page">
      <div className="all-products-header">
        <h4 className="all-products-title">Profile</h4>
      </div>
      {(edit) ? <EditInfo user = {user}  toggleEdit = {toggleEdit}/>: (
        <Box>
          <Card
          className={styles.infoRoot}>
            <Box style={{ flexGrow: 1 }}> <h1 className={styles.text}>Name</h1> </Box>
            <p className={styles.text}>  {user.firstName} {user.lastName} </p>
          </Card>
          <Card
          className={styles.infoRoot}>
            <Box style={{ flexGrow: 1 }}><h1 className={styles.text}>Email</h1></Box>
            <p className={styles.text}> {user.email}</p>
          </Card>
      </Box>
      )}
      <Box className={styles.buttonBox}>
        {(!edit) &&  <Button
        className = {styles.editButton}
        onClick = {() =>
            toggleEdit(!edit)}><h3 className={styles.text}>Edit</h3></Button>}
      </Box>
      {(editPassword) ? <EditPassword user = {user} toggleEdit = {toggleEditPassword} /> : (
          <Box>
            <Card
              className={styles.infoRoot}>
              <Box style={{ flexGrow: 1 }}> <h1 className={styles.text} >Password</h1> </Box>
              <div> <p className={styles.text}>******</p> </div>
          </Card>
        </Box>)}
      <Box className={styles.buttonBox}>
        {(!editPassword) &&  <Button
          className = {styles.editButton}
          onClick = {() =>
            toggleEditPassword(!editPassword)}><h3 className={styles.text}>Edit</h3></Button>}
      </Box>
    </Grid>
  );
};

export default Profile;
