// const startLogsNotificationService = (onNotification) => {
//     setInterval(() => {
//         const logId = `log-${Date.now()}`;
//         onNotification(logId);
//     }, 3000)
// }

const createNotificationListener = require('../../infrastructure/notifications/listener');

const startLogsNotificationService = (onNotification) => {
  const notificationListener = createNotificationListener(onNotification);
  notificationListener.connect();
};

module.exports = { startLogsNotificationService };