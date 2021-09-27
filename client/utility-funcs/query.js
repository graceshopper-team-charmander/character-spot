export const getQueryParam = (location, key) => {
  const query = new URLSearchParams(location.search);
  return query.get(key);
};

export const hasQueryParam = (location, key) => {
  const query = new URLSearchParams(location.search);
  return query.has(key);
};

export const deleteFromQueryParamArr = (location, keyToModify, valueToRemove) => {
  const queryParams = decodeURI(
    location.search.startsWith("?") ? location.search.slice(1) : location.search
  ).split("&");
  const newQueryParams = new Map();
  queryParams.forEach((queryParam) => {
    const [key, valArr] = queryParam.split("=");
    if (key === keyToModify) {
      const values = valArr.split("|").filter((value) => value !== valueToRemove);
      newQueryParams.set(key, values.join("|"))
    } else newQueryParams.set(key, valArr);
  });
  return encodeURI(Array.from(newQueryParams).map(([key, val]) => key + '=' + val).join('&'));
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
