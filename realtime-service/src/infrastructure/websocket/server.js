const socketIO = require('socket.io');

const createWebSocketServer = (httpServer) => {
    const io = socketIO(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    const broadcast = (event, data) => {
        io.emit(event, data);
    }

    return { io, broadcast };
}

module.exports = createWebSocketServer;
