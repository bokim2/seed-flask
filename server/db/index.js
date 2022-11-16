const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'flasks',
  password: 'Clover33@',
  port: 5432,
})
module.exports = {
  query: (text, params) => pool.query(text, params),
}