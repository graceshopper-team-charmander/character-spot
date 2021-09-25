export const getQueryParam = (location, key) => {
  const query = new URLSearchParams(location.search);
  return query.get(key);
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
