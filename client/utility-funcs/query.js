import { snakeCase } from "../../utility-funcs/string-manip";
import queryString from "query-string";

export const getQueryParam = (location, key) => {
  const query = new URLSearchParams(location.search);
  return query.get(key);
};

export const hasQueryParam = (location, key) => {
  const query = new URLSearchParams(location.search);
  return query.has(key);
};

export const deleteFromQueryParamArr = (location, keyToModify, valueToRemove) => {
  const query = queryString.parse(location.search, {
    arrayFormat: "separator",
    arrayFormatSeparator: "|"
  });
  if (Array.isArray(query[keyToModify])) {
    query[keyToModify] = query[keyToModify].filter((value) => value !== valueToRemove);
  } else {
    if (query[keyToModify]) {
      delete query[keyToModify];
    }
  }
  return queryString.stringify(query);
};

export const setQueryParam = (location, key, val) => {
  const query = new URLSearchParams(location.search);
  if (query.has(key)) {
    query.delete(key);
    query.append(key, val);
  } else {
    query.append(key, val);
  }
  query.sort();
  return query.toString();
};
