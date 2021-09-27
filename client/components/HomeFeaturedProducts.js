import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "200px",
    height: "250px",
    "&:hover": {
      transition: "all .4s ease",
      boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
      transform: "translate3d(0px, -10px, 0px)"
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  grid: {
    height: "350px",
    borderBottom: "solid 2px gray",
    backgroundColor: "#e71e07",
    marginBottom: "2rem"
  }
}));

const HomeFeaturedProducts = () => {
  const classes = useStyles();

  const featuredProducts = [
    { name: "Daisy", img: "/images/daisy.png" },
    { name: "Peach", img: "/images/peach.png" },
    { name: "Mario", img: "/images/mario.png" },
    { name: "Luigi", img: "/images/luigi.png" }
  ];

  return (
    <Grid
      container
      className={classes.grid}
      direction="row"
      justifyContent="space-around"
      alignItems="center">
      {featuredProducts.map((product, i) => (
        <Card key={i} className={classes.card}>
          <CardContent>
            <img src={product.img} className="featured-img"></img>
            {/* <div>{product.name}</div> */}
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default HomeFeaturedProducts;
