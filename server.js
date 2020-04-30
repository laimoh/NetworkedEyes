let express = require('express');

// create an app object with express
const app = express();
const port = process.env.PORT || 4000
let server = app.listen(port, () => {
  console.log(`Starting server at ${port}`)
});

app.use(express.static('public'));

console.log("server is all g") // test



///// socket time - opening for connection

let socket = require('socket.io');
let io = socket(server); // creating a socket (multi connection port) for server

io.sockets.on('connection', newConnection); // an event 'connection' and a callback function

function newConnection(socket) {
    console.log('New Connection: ' + socket.id);

    // every new connection to the server gets an id which is usueful for keeping track of clients
    // console.log(socket.id);

   socket.on('eye', eyePos);

   function eyePos(data) {
    socket.broadcast.emit('eye', data);
       console.log(data);
   }
    
   
}