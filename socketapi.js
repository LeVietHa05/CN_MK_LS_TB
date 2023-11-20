const io = require("socket.io")();

const socketapi = {
    io: io
}

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

{
    co2: Math.floor(Math.random() * 1000),
        nh4: (Math.random() * 3),
        co: (Math.random() * 1),
        dust: (Math.random() * 5),
}

module.exports = socketapi;
