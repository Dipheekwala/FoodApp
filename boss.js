const http = require('http');
const server = http.createServer((req,res) => {
    res.writeHead (200,{'content-type':'text/plain'});
    res.end('daniel sinjen, todays date is 26th january!');
});

const port = 7000;

server.listen(port,() => {
    console.log(`server running at http:localhost:${port}`);
});