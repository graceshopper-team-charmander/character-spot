import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orders";

import OrderTable from "./OrderTable";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  formControlRoot: {
    width: "100%"
  }
}));

const Orders = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders) || [];

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <Grid item xs={12} className="page">
      <Paper elevation={1} className={styles.paperRoot}>
        <div className="all-products-header">
          <h4 className="all-products-title">Order History</h4>
        </div>
        <OrderTable orders={orders} />
      </Paper>
    </Grid>
  );
};

export default Orders;
