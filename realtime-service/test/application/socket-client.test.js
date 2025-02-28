const io = require('socket.io-client');

const socket = io('http://localhost:3011')

socket.on('connect', () => {
    console.log('connected to Websocket server')
})

socket.on('NEW_LOG', (log) => {
    console.log('New log received:', log)
})

socket.on('disconnect', () => {
    console.log('Disconnected from Websocket server')
})

socket.on('error', (error) => {
    console.error('Websocket error:', error)
})
