const { Client } = require('pg');
const { dbConfig } = require('../../config');

const createNotificationListener = (onNotification) => {
  const client = new Client(dbConfig);

  const connect = async () => {
    try {
      await client.connect();
      await client.query('LISTEN logs_channel');
      console.log('Connected to PostgreSQL notifications');

      client.on('notification', (msg) => {
        if (msg.channel === 'logs_channel') {
          onNotification(msg.payload);
        }
      });

      client.on('error', (err) => {
        console.error('Notification client error:', err);
        reconnect();
      });
    } catch (error) {
      console.error('Connection error:', error);
      reconnect();
    }
  };

  const reconnect = () => {
    setTimeout(() => {
      console.log('Reconnecting...');
      connect();
    }, 5000);
  };

  return { connect };
};

// Exportar la función directamente
module.exports = createNotificationListener;