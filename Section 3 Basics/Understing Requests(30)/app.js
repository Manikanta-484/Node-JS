// Lecture 30 Understanding Request

const http = require('http');

function rqListner(request,respone){
    console.log(request.url, request.method ,request.headers);
    //process.exit();  to exit the event  loop
}

const Server = http.createServer(rqListner);
// http.createServer(function (req,res) => { }) --- anonaymous
// http.createServer((req,res)=> { }) -----next gen    
// above line make sures to run the rqListner function for every request it receives


Server.listen(3000);
