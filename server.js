const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const config = require("config");
const cors = require("cors");
const bodyParser = require("body-parser");
const WebSocketServer = new require("ws");
const { User } = require("./models/User");
const { Test, Question, Answer } = require("./models/Test");

connectDB();
app.use(cors());
app.use(bodyParser());
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/quest", require("./routes/api/quest"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/test", require("./routes/api/test"));

// Serve static assets in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`),
);

var clients = {};

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

var wss = new WebSocketServer.Server({
  server: server,
});
wss.on("connection", async function (ws, req, kek) {
  ws.isAlive = true;
  console.log("Trying to open Socket");
  ws.on("pong", heartbeat);
  let testId = req.url.split("=")[1];
  console.log(req.headers.cookie);
  console.log(req.headers.cookie.split("token=")[1]);
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

wss.on("close", function () {
  clearInterval(interval);
  delete clients[id];
});
app.wss = wss;
app.wssUsers = clients;

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);
