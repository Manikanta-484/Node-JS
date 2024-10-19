// Lecture 27 Creating a server 

const http = require('http');

function rqListner(request,respone){
    console.log(request);
    //process.exit();  to exit the event  loop
}

const Server = http.createServer(rqListner);
// http.createServer(function (req,res) => { }) --- anonaymous
// http.createServer((req,res)=> { }) -----next gen    
// above line make sures to run the rqListner function for every request it receives


Server.listen(3000);


// go to terminal and type "node app.js"
// then it goes to next line now open browser and enter "http://localhost:3000/"
// now see your terminal you can see some code lines 
// now this is some basic creation of the server.

   // To quit the server
//Want to quit your running Node.js server?
//You can always do that by pressing CTRL + C in the terminal