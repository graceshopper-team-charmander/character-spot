/* eslint-disable react/prop-types */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 150,
    editable: true
  }
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
];

export default function AllUsers({ users }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
