const pg = require("pg");
const pkg = require("../../package.json");
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

module.exports = new pg.Client({
  database: process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`
});


