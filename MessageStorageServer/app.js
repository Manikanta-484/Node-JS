// Lecture 33 Routing Requests
//routing defines how an application responds to client requests for different endpoints (URLs).
// It's the mechanism that directs incoming requests to the appropriate code to handle them.



// we want to load a page where the user can enter some data. and we store it in some file

const http = require('http');
const fs = require('fs');

function rqListener(request, response) {
    const url = request.url;
    const method = request.method;

    // When user navigates to '/', load a form page
    if (url === '/') {
        response.write('<html>');
        response.write('<head><title>My First Page</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end();
    }

    // Handle form submission when URL is '/message' and method is POST
    if (url === "/message" && method === "POST") {
        const body = [];

        // Collect the data sent by user
        request.on("data", (chunk) => {
            body.push(chunk);
            // console.log(chunk.toString());
        });

        request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1].replace(/\+/g,' ');
            console.log(parsedBody);
            
            // Save the message to a file
            fs.appendFileSync('message.txt', decodeURIComponent(message)+'\n');
            response.statusCode = 302;
            response.setHeader('Location', '/');
            return response.end();
        });

        return;
    }

    // Default response when URL is anything else
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>My First Page</title></head>');
    response.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    response.write('</html>');
    response.end();
};

// Create a server that listens to requests and routes them
const server = http.createServer(rqListener);

// Start the server on port 3000
server.listen(3000);

