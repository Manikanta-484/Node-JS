const fs = require('fs');

const requestHandler = (request , response) =>{
    const url = request.url;
    const method = request.method;
    
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
            fs.appendFileSync('message.txt', decodeURIComponent(message)+'\n' ,(err)=>{
             response.statusCode = 302;
            response.setHeader('Location', '/');
            return response.end();
            });
            
        });
    }
    return;


// Default response when URL is anything else
response.setHeader('Content-Type', 'text/html');
response.write('<html>');
response.write('<head><title>My First Page</title></head>');
response.write('<body><h1>Hello from my Node.js Server!</h1></body>');
response.write('</html>');
response.end();
};

module.exports = requestHandler;


// to export multiple things 
/* 
    module.export = {
        handler: requestHadler,
        someText: 'some hard coded text bla bla'
    }
        or

    exports = requestHandler;
*/

