const Pool = require('pg').Pool;

require('dotenv').config()

const devConfig = {
    connectionString :`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
}

const pool = new Pool(devConfig);

module.exports = pool;