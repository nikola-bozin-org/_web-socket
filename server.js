const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 }, () => {
  console.info(`Listening on: localhost:8080.`);
});

server.on("connection", (ws) => {
  console.log("Client connected");

  ws.send("cmd: ls");

  ws.on("message", (message) => {
    console.log("Received message:", message.toString("utf8"));
  });
});


//https://www.youtube.com/watch?v=ArOIBlgARtk