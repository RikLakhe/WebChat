var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

let port = 3000;
let viewPath = path.join(__dirname, "views");

let users = [];
let connections = [];

server.listen(port, () => {
    console.log('server is running in ' + port);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(viewPath, "index.html"));
});

//connect
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected : %s sockets connected', connections.length);
    // socket.broadcast.emit('user connected');

    //disconnect
    socket.on('disconnect', (data) => {
        // if(!socket.username)return;
        users.splice(users.indexOf(socket.username), 1);
        updataUsername();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Connected : %s sockets connected', connections.length);
    });

    // send message
    socket.on('send message', (data) => {
        // checking the message being sent
        // console.log(data);
        io.sockets.emit('new message', { msg: data, user: socket.username });

    });

    // new user
    socket.on('new user', (data, callback) => {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updataUsername();
    })


    function updataUsername() {
        io.sockets.emit('get users', users);
    }
});