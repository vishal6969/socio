const io = require("socket.io")(8900, {
    cors: {
        origin:"http://localhost:3000"
    }
})

io.on("connection", () => {
    console.log("someone is there");
    io.emit("lomda", "lelo mera");
})