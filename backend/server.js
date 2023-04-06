const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = [];

server.on('connection', (socket) => {
  console.log('Client connected');
  clients.push(socket);

  let connectionTime = 0;
  const timer = setInterval(() => {
    connectionTime++;
    const message = `Connected ${connectionTime} seconds.`;
    socket.send(message);
  }, 1000);

  socket.on('close', () => {
    console.log('Client disconnected');
    clearInterval(timer);
    clients.splice(clients.indexOf(socket), 1);
  });

  socket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('WebSocket server running on ws://localhost:8080');
