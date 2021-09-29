import React from "react";
import { Route } from "react-router-dom";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { getQueryParam, setQueryParam } from "../utility-funcs/query";
import { DEFAULT_PAGESIZE } from "../../constants";

const ListPagination = (props) => {
  const {items, totalItems} = props;
  const totalPages =
    Math.floor(totalItems / DEFAULT_PAGESIZE) + (totalItems % DEFAULT_PAGESIZE > 0 ? 1 : 0);
  return (
    <Route>
      {({ location }) => {
        const page = parseInt(getQueryParam(location, "page")) || 1;
        return (
          <Pagination
            page={page}
            count={totalPages}
            renderItem={(item) => {
              const newQuery = setQueryParam(location, "page", item.page);
              return (
                <PaginationItem
                  component={Link}
                  to={`${location.pathname}?${newQuery}`}
                  {...item}
                />
              );
            }}
          />
        );
      }}
    </Route>
  );
};

export default ListPagination;
