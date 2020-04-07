const jwt = require("jsonwebtoken");
const config = require("config");
const WebSocketServer = new require("ws");
const { User } = require("./models/User");
const { Test, Question, Answer } = require("./models/Test");
// подключённые клиенты
var clients = {};

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

// WebSocket-сервер на порту 3090
var wss = new WebSocketServer.Server({
  port: 3090,
});
wss.on("connection", async function(ws, req, kek) {
  ws.isAlive = true;
  console.log('Trying to open Socket')
  ws.on("pong", heartbeat);
  let testId = req.url.split("=")[1];
  let token = req.headers.cookie.split("token=")[1].split(";")[0];
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    let user = await User.findById(req.user.id);
    let test = await Test.findById(testId);

    ws.user = user;

    clients[testId] === undefined
      ? (clients[testId] = [ws])
      : clients[testId].push(ws);
    console.log("новое соединение " + user.id);
  } catch (err) {}
});



wss.on("close", function() {
  clearInterval(interval);
  delete clients[id];
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

module.exports = { wss, clients };
