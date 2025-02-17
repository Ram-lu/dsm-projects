const { Pool } = require('pg');
const MqttAdapter = require('../infrastructure/messaging/MqttAdapter');
const PgLogsRepository = require('../infrastructure/database/postgres/PgLogsRepository');
const LogService = require('../application/services/LogService');

const dbConfig = {
    user: 'admin',
    host: 'localhost',
    database: 'event_db',
    password: 'admin123',
    port: 5432
}

const mqttOptions = {
    host: 'localhost',
    port: 1883,
    protocol: 'mqtt',
    username: 'admin',
    password: 'admin123'
}

async function startApp(){
    let pool, mqttAdapter

    try {
        pool = new Pool(dbConfig);
        console.log('Connected to PostgreSQL');

        const logsRepository = new PgLogsRepository(pool);
        const logService = new LogService(logsRepository);
        mqttAdapter = new MqttAdapter(mqttOptions, logService);
        
        await mqttAdapter.start();
        console.log('MQTT subscriber started');
    } catch (err) {
        console.error('Error starting application:', err);
        process.exit(1);
    }
}

startApp();

process.on('SIGINT', async () => {
    console.log('Turning down...');
    await mqttAdapter?.stop();
    await pool?.end();
    console.log('Application turned down');
    process.exit(0);
})
