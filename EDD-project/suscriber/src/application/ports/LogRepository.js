class LogRepository {
    async save(log){
        throw new Error('Method "save" must be implemented.');
    }
}

module.exports = LogRepository;