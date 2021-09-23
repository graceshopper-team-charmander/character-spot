/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../store/cart";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "10px",
    marginBottom: "40px",
    height: "280px",
    width: "200px",
    border: "8px solid #fcd000",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "0 0 10px 5px #cccccc",
      transition: "all .4s ease"
    }
  },
  cardContent: {
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingBottom: "20px"
  },
  cardImage: {
    borderRadius: "2px",
    border: "3px solid #fcd000"
  },
  button: {
    backgroundColor: "#fcd000",
    color: "white",
    "&:hover": {
      backgroundColor: "#e71e07",
      transition: "all .4s ease"
    },
    marginTop: "auto"
  },
  cardBody: {
    display: "flex",
    flexGrow: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  }
}));

const ProductRow = (props) => {
  const { product } = props;
  const { id, name, description, price, imageUrl } = product;

  const styles = useStyles();

  const dispatch = useDispatch();

  const handleClick = (evt) => {
    const productId = evt.target.value;
    dispatch(addToCartThunk(productId));
  };
  return (
    <Card className={styles.card}>
      <Link to={`/products/${id}`}>
        <CardContent className={styles.cardContent}>
          <Typography sx={{ fontSize: 10 }}>{name}</Typography>
          <div className={styles.cardBody}>
            <CardMedia
              className={styles.cardImage}
              component="img"
              height="120"
              image={imageUrl}
              alt={name}
            />
            <Typography sx={{ mb: 1.5 }}>${price}</Typography>
            <Button variant="contained" value={id} onClick={handleClick} className={styles.button}>
              ADD TO CART
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>

    // <div>
    //   <div>
    //     <Link className="product-link" to={`/products/${id}`}>
    //       <h5 className="">{name}</h5>
    //     </Link>
    //     <img className="card-img" src={imageUrl} alt="Card image cap" />

    //     <div className="">
    //       <p className="">$ {price}</p>

    //       <button value={id} onClick={handleClick} className="add-to-cart">
    //         ADD TO CART
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductRow;
