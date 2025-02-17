const mqtt = require('mqtt');
const Log = require('../../domain/entities/Log');
const LogService = require('../../application/services/LogService');

class MqttAdapter {
    constructor(mqttOptions, logService){
        this.mqttOptions = mqttOptions;
        this.logService = logService;
        this.client = null;
    }

    async start(){
        return new Promise((resolve, reject) => {
            this.client = mqtt.connect(this.mqttOptions);

            this.client.on('connect', () => {
                console.log('Connected to MQTT broker');
                this.client.subscribe('Notification/#', err => {
                    if (err) reject(err);
                    else resolve();
                })
            })

            this.client.on('error', err => {
                console.error('MQTT error:', err);
                reject(err);
            })

            this.client.on('message', async (topic, message) => {
                try {
                    const [_, priority] = topic.split('/');
                    const data = JSON.parse(message.toString());
                    const log = new Log(priority, data.content, new Date(data.timestamp));
                    console.log(log)

                    await this.logService.saveLog(log);
                    console.log('Log saved successfully');
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            })
        })
    }

    async stop(){
        return new Promise((resolve) => {
            this.client?.end(resolve);
        })
    }
}

module.exports = MqttAdapter;
