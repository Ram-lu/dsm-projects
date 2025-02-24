const { Pool } = require('pg');
const { dbConfig } = require('../../config');

const pool = new Pool(dbConfig);

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})

module.exports = pool;