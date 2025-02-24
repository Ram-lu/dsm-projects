// const handleNewLogNotification = async (logId, broadcast) => {
//     try {
//         broadcast('NEW_LOG', {id: logId});
//     } catch (err) {
//         console.error('Error handling new log notification:', err);
//         throw err;
//     }
// }

const { getLogsById } = require('../../infrastructure/db/queries');

const handleNewLogNotification = async (logId, broadcast) => {
    try {
        const log = await getLogsById(logId);
        if(log){
            broadcast('NEW_LOG', log);
        }
    } catch(err) {
        console.error('Error handling new log notification:', err);
        throw err;
    }
}

module.exports = { handleNewLogNotification };