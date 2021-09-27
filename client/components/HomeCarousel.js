import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "solid 2px gray"
  },
  paper: {
    margin: "2em auto 1em auto",
    width: "100%"
  }
}));

const HomeCarousel = () => {
  const classes = useStyles();

  const images = [
    "/images/carousel/shows.jpeg",
    "/images/carousel/gohan.jpeg",
    "/images/carousel/dratini.jpeg"
  ];

  return (
    <Carousel
      Indicators={false}
      IndicatorIcon={false}
      interval={5000}
      autoPlay={true}
      stopAutoPlayOnHover={false}
      className={classes.root}>
      {images.map((image, i) => (
        <Paper key={i} className={classes.paper} elevation={3} square>
          <img src={image} className="carousel-img" />
        </Paper>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
