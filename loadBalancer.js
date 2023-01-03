const http = require('http');
const config = require('./config');

// Create a server object
const server = http.createServer((req, res) => {
    // Get the target group for the incoming request
    const targetGroup = config.targetGroups[req.headers.host];

    // If no target group is found, return a 404 error
    if (!targetGroup) {
        res.writeHead(404);
        res.end('404: Target group not found');
        return;
    }

    // Select a target from the target group using round-robin rule
    const target = targetGroup[Math.floor(Math.random() * targetGroup.length)];

    // Forward the request to the selected target
    const proxy = http.request(target, (proxyRes) => {
        // Set the response headers
        res.writeHead(proxyRes.statusCode, proxyRes.headers);

    });

    // Pipe the request data to the target
    req.pipe(proxy);
});

// Listen for incoming connections on port 80
server.listen(80);