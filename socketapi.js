const io = require("socket.io")();

const socketapi = {
    io: io
}
let khoangcach = 0;
let lastKhoangcach = 0;
io.on("connection", (socket) => {
    console.log("[INFO] new connection: [" + socket.id + "]",
        socket.request.connection.remoteAddress);
    socket.on("message", (data) => {
        console.log(`message from ${data.clientID} via socket id: ${socket.id}`);
        if (data.khoangcach > 0 && lastKhoangcach != data.khoangcach)  {
            khoangcach += 60 * 3.14;
            lastKhoangcach = data.khoangcach;
            data.khoangcach = khoangcach;
        }
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

module.exports = socketapi;
