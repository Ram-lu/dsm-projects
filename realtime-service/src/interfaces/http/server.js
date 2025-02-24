const express = require('express');

const createHttpServer = () => {
    const app = express();

    app.use(express.json());

    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK', message: 'Server is running' });
    })

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
    })

    return app;
}

module.exports = {createHttpServer};
