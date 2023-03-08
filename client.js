const WebSocket = require("ws");
const { exec } = require("child_process");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected to server");

  ws.send("Hello from client");
});

ws.on("message", (message) => {
  const messageUTF = message.toString("utf-8");
  const cmd = extractCommand(messageUTF);
  if (cmd !== undefined) {
    if (!isSafeCommand(cmd)) {
      console.info(`Unsafe command: ${cmd}. Not executing.`);
      return;
    }
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      console.log(`stdout:\n ${stdout}`);
      console.error(`stderr:\n ${stderr}`);
    });
  } else {
    console.info("MESSAGE: " + messageUTF);
  }
});

ws.on("close", function close() {
  console.log("Disconnected from server");
});

const extractCommand = (message) => {
  if (!message.startsWith("cmd:")) return undefined;
  return message.split(":")[1].trim();
};
const isSafeCommand = (cmd) => {
  return safeCommands.includes(cmd);
};

const safeCommands = ["ls"];
