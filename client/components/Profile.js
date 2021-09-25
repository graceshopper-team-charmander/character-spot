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

const useStyles = makeStyles((theme) => ({
  infoRoot: {
    display: "flex",
    margin: "10px",
    padding: "5px",
    border: "8px solid #fcd000",
    borderRadius: "10px",
  },
}));

const Profile = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user) || [];
  const [edit, toggleEdit] = useState(false);

  useEffect(() => {
    dispatch(getInfo());
  }, []);

  return (
    <Grid item xs={12} className="page">
      <div className="all-products-header">
        <h4 className="all-products-title">Profile</h4>
      </div>
      {(edit) ? <EditInfo user = {user}  toggleEdit = {toggleEdit}/>: (
          <div>
          <Card
          className={styles.infoRoot}>
            <Box style={{ flexGrow: 1 }}>
            <h1>Name</h1>
            </Box>
            <div>
            {user.firstName} {user.lastName}
            </div>
          </Card>
          <Card
          className={styles.infoRoot}>
            <Box style={{ flexGrow: 1 }}>
              <h1>Email</h1>
            </Box>
            <div>
            {user.email}
            </div>
          </Card>
      </div>
      )}
      {(!edit) &&  <Button className = {styles.editButton} onClick = {() =>
          toggleEdit(!edit)}>Edit</Button>}
      <Card
        className={styles.infoRoot}>
        <Box style={{ flexGrow: 1 }}>
          <h1>Password</h1>
        </Box>
        <div>
        ******
        </div>
      </Card>
      <Button onClick = {() =>
          toggleEdit(!edit)}>Edit</Button>
    </Grid>
  );
};

export default Profile;
