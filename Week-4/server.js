const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
        const db = client.db('orderDB');
        const orderRoutes = require('./routes/orderRoutes')(db);
        app.use('/api/orders', orderRoutes);
    })
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
