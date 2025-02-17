const LogRepository = require('../ports/LogRepository');

class LogService {
    constructor(LogRepository){
        this.logRepository = LogRepository;
    }

    async saveLog(log){
        await this.logRepository.save(log);
    }
}

module.exports = LogService;