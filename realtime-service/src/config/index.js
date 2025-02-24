require('dotenv').config();

module.exports = {
    dbConfig: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD, // Asegúrate de que esto sea una cadena.
      port: parseInt(process.env.DB_PORT, 10),
    },
    serverPort: parseInt(process.env.SERVER_PORT, 10),
  };
