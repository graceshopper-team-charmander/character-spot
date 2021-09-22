import React, { useEffect} from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { updateQuantityThunk, deleteProductThunk } from "../store/cart";

const SingleCartProduct = (props) => {
  const dispatch = useDispatch();

  return (
    <Card
      variant="outlined"
      sx={{display: 'flex'}}>
      <Box
        sx={{display: 'flex', flexDirection: 'row'}}>
        <CardMedia
          component="img"
          width = "1"
          image={`${props.product.imageUrl}`}
        />
        <CardHeader
        title = {props.product.name}/>
      </Box>
      <CardActions>
        <Button size="small">-</Button>
        {props.product.cart.quantity}
        <Button size="small">+</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}

export default SingleCartProduct;

