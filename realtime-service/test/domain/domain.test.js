const { startLogsNotificationService } = require('../../src/domain/logs/services');
const { handleNewLogNotification } = require('../../src/domain/logs/handlers');

const broadcast = (event, data) => {
    console.log(`Broadcasting ${event} with data:`, data);
}

startLogsNotificationService(logId => {
    handleNewLogNotification(logId, broadcast);
})