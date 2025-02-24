const { createHttpServer } = require('../interfaces/http/server');
const createWebSocketServer = require('../infrastructure/websocket/server');
const { startLogsNotificationService } = require('../domain/logs/services');
const { handleNewLogNotification } = require('../domain/logs/handlers');
const { serverPort } = require('../config');

const initializeServer = () => {
    const app = createHttpServer();
    const httpServer = app.listen(serverPort, () => {
        console.log(`Server is running on port ${serverPort}`);
    })

    const { io, broadcast } = createWebSocketServer(httpServer);

    startLogsNotificationService(logId => {
        handleNewLogNotification(logId, broadcast);
    })

    const shutdown = () => {
        console.log('Shutting down server...');
        httpServer.close()
        process.exit(0)
    }

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    return { httpServer, io };


}

module.exports = { initializeServer };
