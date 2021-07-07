const express =  require('express');
const socket = require('socket.io');
const cors = require('cors');
const path = require("path");

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
  }

app.use('/authentication', require('./routes/authentication'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/question', require('./routes/question'));
app.use('/answer', require('./routes/answer'));


const server = app.listen(port, () => {
    console.log(`listen to port ${port}`);
});

const io = socket(server);

io.sockets.on('connection', (socket) => {
    socket.on('join_room', room => {
        console.log(room);
        socket.join(room);
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

    require('./sockets/answer_question_socket')(socket, io);
})

