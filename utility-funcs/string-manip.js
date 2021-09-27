const snakeCase = (str) => {
  return str.trim().toLowerCase().replace(' ', '_');
}

const properCase = (str) => {
  return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

module.exports = {
  snakeCase,
  properCase
};