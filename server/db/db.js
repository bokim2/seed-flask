const { Pool } = require('pg')
require('dotenv').config()

// create a new pool here using the connection string above
const pool = new Pool({ connectionString: process.env.PG_URI })

module.exports = {
  query: (text, params, callback) => {
    // console.log('connected to db');
    return pool.query(text, params, callback)
  },
}
