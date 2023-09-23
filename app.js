var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var http = require("http");
var server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("[INFO] new connection: [" + socket.id + "]",
    socket.request.connection.remoteAddress);
  socket.on("message", (data) => {
    console.log(`message from ${data.clientID} via socket id: ${socket.id}`);
    socket.broadcast.emit("message", data);
  });
  /**************************** */
  //xu ly chung
  socket.on("reconnect", function () {
    console.log("[" + socket.id + "] reconnect.");
  });
  socket.on("disconnect", () => {
    console.log("[" + socket.id + "] disconnect.");
  });
  socket.on("connect_error", (err) => {
    console.log(err.stack);
  });
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = server;
