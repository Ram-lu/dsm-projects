const mqtt = require('mqtt');
const fs = require('fs')
const path = require('path')

const options = {
    host: 'localhost',
    port: 1883,
    protocol: 'mqtt',
    username: 'admin',
    password: 'admin123'
}

const client = mqtt.connect(options)   

const PATH_FILES = {
    low: path.join(__dirname, '/logs/low-priority.txt'),
    mid: path.join(__dirname, '/logs/mid-priority.txt'),
    high: path.join(__dirname, '/logs/high-priority.txt')
}

client.on('connect', () => {
    console.log('🤖 Connected to MQTT Broker')
    client.subscribe('Notification/#', err => {
        if (err) console.error('🤖 Error:', err)
    })
})

client.on('message', (topic, message) => {

    try {
        const priority = topic.split('/')[1]
        const data = JSON.parse(message)

        const logEntry = `[${data.timestamp}] : ${data.content}\n`

        fs.appendFile(PATH_FILES[priority], logEntry, err => {
            if  (err) {console.error('🤖 Error:', err)}
            else (console.log(`🤖[${priority.toUpperCase()}] Log Registered: ${data.content}`))
        })
    } catch (error) {
        console.error('🤖 Error:', error)
    }

})

client.on('error', err => {
    console.error('🤖 Error:', err)
})