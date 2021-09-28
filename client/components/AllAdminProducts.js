/* eslint-disable react/prop-types */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true
  },
  {
    field: "quantity",
    headerName: "Qty",
    width: 100,
    editable: true
  },
  {
    field: "price",
    headerName: "Price(¢)",
    width: 120,
    editable: true
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    editable: true
  },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 200,
    editable: true
  }
];

export default function AllAdminProducts({ products }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
