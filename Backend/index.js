require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
app.use(cors());

// new socket server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
})

const { dbConnection } = require("./config/db");
const { studentRoute } = require("./routes/student.route");
const { tutorRoute } = require("./routes/tutor.route");
const PORT = process.env.PORT || 3300;


app.use(express.json());

// Router Middleware
app.use("/", studentRoute);
app.use("/", tutorRoute)


app.get('/', (req, res) => {
    res.send("Hello Welcome to Hompage. This is help API.")
});


// io listening
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Ping the user
    socket.on("message", (data) => {
        console.log(data)

        // Broadcast to everyone 
        // socket.broadcast().emit("event", data) 
        // socket.to("room").emit("event", data)  // to room
    })

    socket.on("disconnect", () => {
        console.log("Disconenct")
    })

});

module.exports = { io }

server.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    try {
        await dbConnection;
        console.log("DB Connected")

    } catch (error) {
        console.error({ error: error.message })
    }
});
