// Load required modules
const http = require('http');
const config = require('./config');

// Create a server object
const server = http.createServer((req, res) => {
// Set the response headers
res.writeHead(200, { 'Content-Type': 'text/plain' });

// Send the response data
res.end('Hello World');
});

// Listen for incoming connections on a random port
server.listen(0, () => {
const port = server.address().port;

// Add the server to the target group for example.com in the config file
config.targetGroups['example.com'].push({ host: 'localhost', port: port });
});