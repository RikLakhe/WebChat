var express = require('express'),
    path = require('path');

var app = express();
var server = require('http');
var io = require('socket.io');


let viewPath = path.join(__dirname, "views");
let port = 3000;

users = [];
connections = [];


app.get('/', (req, res) => {
    res.sendFile(viewPath + "/index.html");
});

app.listen(port, () => {
    console.log("server is running...");
});