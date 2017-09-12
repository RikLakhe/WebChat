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