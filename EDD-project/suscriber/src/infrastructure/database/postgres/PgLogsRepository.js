const { Pool } = require('pg');
const LogRepository = require('../../../application/ports/LogRepository');
const Log = require('../../../domain/entities/Log');

class PgLogsRepository extends LogRepository {
    constructor(pool){
        super()
        this.pool = pool;
    }

    async save(log){
        const query = {
            text: 'INSERT INTO logs (priority, content, timestamp) VALUES ($1, $2, $3)',
            values: [log.priority, log.message, log.timestamp]
        }

        try {
            await this.pool.query(query);
        } catch (error) {
            console.error('Error saving log:', error);
            throw error;
        }
    }
}

module.exports = PgLogsRepository;
