const http = require('http');
const fs = require('fs');
const qs =  require('querystring');


const users =['user1','user2','user3'];

function requestHadler2(req,res){
    const url = req.url;
    const method = req.method;

    if(url ==='/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(`
            <html>
                <head><title>Assignment 1</title></head>
                <body>
                    <h1>Welcome to the Homepage</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" placeholder="Enter username" required />
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
            `);
            res.end();
    }else if(url === '/users' && req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<html><head><title>Users</title></head><body><ul>');
        users.forEach(user => {
            res.write(`<li>${user}</li>`);
        });
        res.write('</ul></body></html>');
        res.end();

    }else if(url ==='/create-user' && req.method === 'POST'){
        const body =[];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end' ,() =>{
            const parsedBody = Buffer.concat(body).toString();
            const username = qs.parse(parsedBody).username;

            console.log("new User: "+ username);

            // redirect back to homePage
            res.writeHead(302,{'Location':'/'});
            res.end();
        })
        
    }else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write('<h1>Page Not Found</h1>');
        res.end();
    }
};

module.exports = requestHadler2;