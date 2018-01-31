let express = require('express');
let parser = require('body-parser');
let app = express();

var host = "127.0.0.1";
var port = 1337;

app.use('/', express.static(__dirname + '/'));

app.listen(port, host);

console.log('Running server at http://localhost:' + port + '/');