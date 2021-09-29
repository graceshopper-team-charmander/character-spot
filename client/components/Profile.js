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
  paperRoot: {
    margin: "1rem 40px"
  },
  infoRoot: {
    display: "flex",
    margin: "10px",
    padding: "15px",
    border: "8px solid #fcd000",
    borderRadius: "10px",
    alignItems: "center"
  },
  editButton: {
    margin: "10px",
    width: "100px",
    // border: "3px solid #009edb",
    backgroundColor: "#009edb",
    color: "white"
  },
  buttonBox: {
    display: "flex",
    justifyContent: "right",
    margin: " 0 25px"
  },
  buttonText: {
    fontFamily: "mario",
    fontSize: "1.2rem"
  },
  labelText: {
    fontSize: "1.5rem",
    fontFamily: "mario"
  }
}));

const Profile = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector((state) => state.auth) || [];
  const [edit, toggleEdit] = useState(false);
  const [editPassword, toggleEditPassword] = useState(false);

  useEffect(() => {
    dispatch(getInfo());
  }, []);

  return (
    <Grid
      item
      xs={12}
      style={{
        paddingTop: "1rem",
        /* width: 80%; */
        margin: "0 auto"
      }}>
      <div className="all-products-header">
        <h4 className="all-products-title">Profile</h4>
      </div>

      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <div className="profile-body">
          {edit ? (
            <EditInfo toggleEdit={toggleEdit} />
          ) : (
            <Box style={{ margin: "25 25 0 25" }}>
              <Card className={styles.infoRoot}>
                <Box style={{ minWidth: "13rem" }}>
                  <h1 className={styles.labelText}>Name</h1>
                </Box>
                <Box style={{ flexGrow: 1, textAlign: "center" }}>
                  <p className={styles.text}>
                    {firstName} {lastName}
                  </p>
                </Box>
              </Card>
              <Card className={styles.infoRoot}>
                <Box style={{ minWidth: "13rem" }}>
                  <h1 className={styles.labelText}>Email</h1>
                </Box>
                <Box style={{ flexGrow: 1, textAlign: "center" }}>
                  <p className={styles.text}> {email}</p>
                </Box>
              </Card>
            </Box>
          )}

          <Box className={styles.buttonBox}>
            {!edit && (
              <Button
                size="large"
                variant="contained"
                color="secondary"
                className={styles.editButton}
                onClick={() => toggleEdit(!edit)}>
                <h3 className={styles.buttonText}>Edit</h3>
              </Button>
            )}
          </Box>
          {editPassword ? (
            <EditPassword toggleEdit={toggleEditPassword} />
          ) : (
            <Box style={{ margin: "25 25 0 25" }}>
              <Card className={styles.infoRoot}>
                <Box style={{ minWidth: "13rem" }}>
                  <h1 className={styles.labelText}>Password</h1>{" "}
                </Box>
                <Box style={{ flexGrow: 1, textAlign: "center" }}>
                  <p className={styles.text}>******</p>{" "}
                </Box>
              </Card>
            </Box>
          )}
          <Box className={styles.buttonBox}>
            {!editPassword && (
              <Button
                size="large"
                variant="contained"
                color="secondary"
                className={styles.editButton}
                onClick={() => toggleEditPassword(!editPassword)}>
                <h3 className={styles.buttonText}>Edit</h3>
              </Button>
            )}
          </Box>
        </div>
        <Grid
          style={{ width: "35%" }}
          container
          direction="column"
          justifyContent="center"
          alignItems="center">
          <img src="/images/isabelle.png" alt="isabelle" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
