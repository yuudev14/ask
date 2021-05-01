const express =  require('express');
const socket = require('socket.io');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

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

