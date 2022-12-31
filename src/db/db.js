const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'master',
  host: 'localhost',
  port: 5432,
  database: 'termpaper',
});

module.exports = pool;
