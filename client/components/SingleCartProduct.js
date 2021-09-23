import React, { useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { updateQuantityThunk, deleteProductThunk } from "../store/cart";


const SingleCartProduct = (props) => {
  const dispatch = useDispatch();
  const product = props.product
  return (
    <Card
      variant="outlined"
      style = {{margin: "5px"}}>
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
        <Box sx={{m: 2}}
          style = {{flexGrow: 1}}>
          <Typography
            style = {{textAlign: "right"}}>Price: {product.price}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default SingleCartProduct;
