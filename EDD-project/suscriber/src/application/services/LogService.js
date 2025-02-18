const LogRepository = require('../ports/LogRepository');

const PRIORITIES = ['low', 'mid', 'high']

class LogService {
    constructor(LogRepository){
        this.logRepository = LogRepository;
    }

    async saveLog(log){

        if(!PRIORITIES.includes(log.priority)){
            throw new Error('Invalid priority level')
        }
        await this.logRepository.save(log);
    }
}

module.exports = LogService;