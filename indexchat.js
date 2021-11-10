const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  // DEBUG: console.log('a user connected');
  socket.on('chat message', (msg) => {
    // DEBUG: console.log(msg);
    socket.broadcast.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    // DEBUG: console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
