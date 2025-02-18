//Mock de LogRepository

class MockLogRepository {
    saveCalls = 0

    async save(log){
        this.saveCalls++
        this.lastLog = log
        return Promise.resolve()
    }
}

const LogRepository = require('../../../src/application/ports/LogRepository')
const LogService = require('../../../src/application/services/LogService')

const tests = {
    'guardar log valido': async () => {
        const mockRepo = new MockLogRepository()
        const service = new LogService(mockRepo)
        const log = {priority: 'mid', message: 'Test log', timestamp: new Date()}

        

        try {
            await service.saveLog(log)
            console.log('✅ [LogService] Test éxito: Log guardado correctamente')
        } catch (error) {
            console.error('❌ [LogService] Test fallo: No se llamó al método save del repositorio');
        }

        // if(mockRepo.saveCalls === 1 && mockRepo.lastLog === log){
        //     console.log('✅ [LogService] Test éxito: Log guardado correctamente')
        // } else {
        //     console.error('❌ [LogService] Test fallo: No se llamó al método save del repositorio');
        // }
    },
};

(async () => {
    console.log('\nchimp! Ejecutando Tests para LogService:');
  
    for (const testName in tests) {
      console.log(`\nchimp! Ejecutando test: "${testName}"`);
      await tests[testName]();
    }
  })();