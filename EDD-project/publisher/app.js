const mqtt = require('mqtt')

const options = {
    host: 'rabbitmq',
    port: 1883,
    protocol: 'mqtt',
    username: 'admin',
    password: 'admin123'
}

const client = mqtt.connect(options)

const PRIORITIES = ['low', 'mid', 'high']

client.on('connect', () => {
    console.log('🤖 Connected to MQTT Broker')
    sendRndmMsg()
})

client.on('error', err => {
    console.error('🤖 Error:', err)
}
)




const sendRndmMsg = () => {
    const priority = PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)]
    
    const message = {
        timestamp: new Date().toISOString(),
        content: `Random Message with priority ${priority}`
    }

    client.publish(`Notification/${priority}`, JSON.stringify(message))
    console.log(`🤖[${priority.toUpperCase()}] Send: ${message.content}`)

    setTimeout(sendRndmMsg, Math.random() * 2000 + 1000)
}