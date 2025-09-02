const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '';
    switch(req.url) {
        case '/':
            filePath = 'index.html';
            break;
        
        case '/about':
            filePath = 'about.html';
            break;

        case '/contact-me':
            filePath = 'contact-me.html';
            break;

        default:
            filePath = '404.html';
            break;
    }

    const absPath = path.join(__dirname, filePath);
    fs.readFile(absPath, (err, data) => {
        if(err) {
            res.writeHead(500, { 'Content-Type': 'text/html'});
            res.end('<h1>500 Internal Server Error</h1>');
        } else {
            res.writeHead(filePath === '404.html' ? 404 : 200, {'Content-type': 'text/html'});
            res.end(data);
        }
    });
}
);

server.listen(8080, () => {
    console.log('server is listening at http://localhost:8080/');
} );