const express = require('express');
const http = require('http');
const mysql = require('mysql');

const app = express();
const router = express.Router();
const server = http.createServer(app);

app.get('/', function handleHome(req, res){
    res.sendFile(
        __dirname + '/public/index.html'
    );
});

server.listen(3000, function() {
    console.log(' server listening on port 3000 ');
});

module.exports = router;