const fs = require('fs');

let maxId; 

// Load products from JSON file and set initial maxId
function loadProducts() {
    const data = fs.readFileSync('products.json', 'utf8');
    const products = JSON.parse(data);
    // Find the highest ID initially
    maxId = products.reduce((max, product) => Math.max(max, product.id || 0), 0);
    return products;
}

// Initialize the database and maxId
let productsDB = loadProducts();

// Function to add a new product with an auto-incrementing unique ID
function addProduct(name, color, price) {
    const newProduct = {
        id: ++maxId, // Increment maxId for a unique ID
        name,
        color,
        price
    };
    productsDB.push(newProduct); 
    saveProducts(); 
    console.log(`Added product:`, newProduct);
}

// Function to save products to JSON file
function saveProducts() {
    fs.writeFileSync('products.json', JSON.stringify(productsDB, null, 2));
}

// Other functions: update, delete, and show
function updateProduct(index, updatedProduct) {
    if (index >= 0 && index < productsDB.length) {
        productsDB[index] = { ...productsDB[index], ...updatedProduct };
        saveProducts();
        console.log(`Updated product at index ${index}:`, productsDB[index]);
    } else {
        console.log("Invalid index.");
    }
}

function deleteProduct(index) {
    if (index >= 0 && index < productsDB.length) {
        const deleted = productsDB.splice(index, 1);
        saveProducts();
        console.log(`Deleted product:`, deleted[0]);
    } else {
        console.log("Invalid index.");
    }
}

function showProducts() {
    console.log(productsDB);
}

// Example (testing)
// addProduct("p5", "blue", 340);
// updateProduct(1, { price: 250 });
// deleteProduct(0);
showProducts();

// BONUS: npm explanations
// NPM is the Node Package Manager used to install and manage JavaScript packages.
// Example commands:
// - `npm install <package-name>` installs locally in your project
// - `npm install -g <package-name>` installs globally on your machine