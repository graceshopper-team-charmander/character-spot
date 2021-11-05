import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "200px",
    height: "200px",
    boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
    "&:hover": {
      transition: "all .4s ease",
      boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
      transform: "translate3d(0px, -10px, 0px)"
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem"
  },
  grid: {
    height: "500px",
    borderBottom: "solid 2px gray",
    backgroundColor: "ghostwhite",
    marginBottom: "2rem",
    paddingTop: "2rem"
  },
  avatars: {
    width: "200px"
  },
  name: {
    fontFamily: "mario",
    fontSize: "2rem",
    color: "#e71e07"
  }
}));

const HomeCreators = () => {
  const classes = useStyles();

  const creators = [
    {
      name: "Alexandra",
      imageUrl: "https://ca.slack-edge.com/T024FPYBQ-U029NF4D8LD-4ef038e02b60-512",
      link: "https://www.linkedin.com/in/alexandravmarks"
    },
    {
      name: "Amaya",
      imageUrl: "https://ca.slack-edge.com/T024FPYBQ-U029RG52CRG-73c1288bddba-512",
      link: "https://www.linkedin.com/in/amaya-agha/"
    },
    {
      name: "Nicole",
      imageUrl: "https://ca.slack-edge.com/T024FPYBQ-U029RMVNK1R-c994e254b6d0-512",
      link: "https://www.linkedin.com/in/nicole-pan1/"
    }
  ];

  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start">
      <div className="creator-header">
        <div className="creator-title">Meet the Charmander Cluster!</div>
        <div className="creator-subtitle">
          We are software engineers from the Grace Hopper Program at Fullstack Academy. We hope you
          enjoy the shop as much as we loved making it!
        </div>
      </div>
      {creators.map((creator, i) => (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          key={i}
          className={classes.avatars}>
          <a href={creator.link} target="_blank" rel="noreferrer noopener">
            <Avatar className={classes.avatar}>
              <img src={creator.imageUrl} className="avatar-img"></img>
            </Avatar>
          </a>
          <Grid className={classes.name}>{creator.name}</Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeCreators;
