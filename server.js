/**
 * This File contains the creation of a simple server to load the system locally
 */

var express = require('express');
var app     = express();

/**
 * Static files
 */
app.use(express.static(__dirname + '/public'));

/**
 * Just serve the index.html
 */
app.get('/', function(req, res) {
	res.sendFile('/public/views/index.html');
});

/**
 * Listen on port 8080
 */
app.listen(8080);
console.log('Service started at http://localhost:8080/');