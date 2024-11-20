const fs = require('fs');
const http = require('http');
const path = require('path');

// Load products from JSON file and set initial maxId
function loadProducts() {
    const data = fs.readFileSync('products.json', 'utf8');
    const products = JSON.parse(data);
    return products;
}

// Initialize the database and maxId
let productsDB = loadProducts();

// Create the HTTP server
const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/home') {
        const homePath = path.join(__dirname, 'public', 'home.html');
        fs.readFile(homePath, 'utf-8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (url === '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(productsDB));
    } else if (url.startsWith('/products/')) {
        const index = parseInt(url.split('/')[2]) - 1;
        if (index >= 0 && index < productsDB.length) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(productsDB[index]));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Product not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

// Start the server
server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
