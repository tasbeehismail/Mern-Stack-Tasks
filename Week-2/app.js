const fs = require('fs');
const http = require('http');

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
    res.setHeader('Content-Type', 'application/json');

    if (url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
                        img { width: 200px; height: auto; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <h1>Welcome to the Products API</h1>
                    <p>Explore our products below:</p>
                    <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" alt="Camera" />
                </body>
            </html>
        `);
    } else if (url === '/products') {
        res.writeHead(200);
        res.end(JSON.stringify(productsDB));
    } else if (url.startsWith('/products/')) {
        const index = parseInt(url.split('/')[2]) - 1;
        if (index >= 0 && index < productsDB.length) {
            res.writeHead(200);
            res.end(JSON.stringify(productsDB[index]));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Product not found' }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

// Start the server
server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});

