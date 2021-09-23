import React, { useEffect} from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import { updateQuantityThunk, deleteProductThunk } from "../store/cart";


const SingleCartProduct = (props) => {
  const dispatch = useDispatch();
  const product = props.product
  return (
    <Grid>
      <Card
        variant="outlined">
        <Box sx = {{display: "flex"}}>
          <CardMedia
            component="img"
            style= {{height: 100, width: "auto", margin: "10px"}}
            image={`${product.imageUrl}`}
          />
          <Box sx={{m: 2}}>
            <Typography
            style = {{fontWeight: 600, fontSize: 20}}>
              {product.name}
            </Typography>
            <Typography>
              {product.description}
            </Typography>
            <CardActions
              style = {{padding: "0px"}}>
              <div onClick = {() => dispatch(updateQuantityThunk(product, product.cart.quantity - 1))}>
                <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>-</Button>
              </div>
                {product.cart.quantity}
              <div onClick = {() => dispatch(updateQuantityThunk(product, product.cart.quantity+1))}>
              <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>+</Button>
              </div>
              <div onClick = { ()=> dispatch(deleteProductThunk(product))}>
              <Button size="small">Delete</Button>
              </div>
            </CardActions>
          </Box>
          <Box sx={{m: 2}}>
            <Typography>Price: {product.price}</Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}

export default SingleCartProduct;

