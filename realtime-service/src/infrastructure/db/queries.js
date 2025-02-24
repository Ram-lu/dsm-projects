const pool = require('./pool');

const getLogsById = async (logId) => {
    const result = await pool.query('SELECT * FROM logs WHERE id = $1', [logId]);
    return result.rows[0];
}

module.exports = { getLogsById };
