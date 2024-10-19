// Lecture 31 Sending Responses

const http = require('http');

function rqListner(request,response){
    console.log(request.url, request.method ,request.headers);
    //process.exit();  to exit the event  loop

    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>My First Page</title></head>');
    response.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    response.write('</html>');
    response.end();

};

const Server = http.createServer(rqListner);
// http.createServer(function (req,res) => { }) --- anonaymous
// http.createServer((req,res)=> { }) -----next gen    
// above line make sures to run the rqListner function for every request it receives


Server.listen(3000);
