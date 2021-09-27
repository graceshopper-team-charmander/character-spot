const snakeCase = (str) => {
  return str.trim().toLowerCase().replace(/\s+/g, '_');
}

const properCase = (str) => {
  return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

const unSnakeCase = (str) => {
  return str.trim().toLowerCase().replace(/_+/g, ' ');
}

module.exports = {
  snakeCase,
  properCase,
  unSnakeCase
};