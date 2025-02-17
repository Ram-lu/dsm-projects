class Log {
    constructor(priority, message, timestamp) {
        this.priority = priority;
        this.message = message;
        this.timestamp = timestamp;
    }
}

module.exports = Log;