// Lecture 39 exporting the logic from anothrer  file
// by using "module.exports ="

const http = require('http');
const routes = require('./routes');




// Create a server that listens to requests and routes them
const server = http.createServer(routes);



// Start the server on port 3000
server.listen(3000);

