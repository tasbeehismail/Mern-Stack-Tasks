const express = require('express');

module.exports = (db) => {
    const router = express.Router();
    const ordersCollection = db.collection('orders');

    // Retrieve all documents
    router.get('/', async (req, res) => {
        try {
            const orders = await ordersCollection.find().toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve all documents, limit 5, skip first 3
    router.get('/limit-skip', async (req, res) => {
        try {
            const orders = await ordersCollection.find().skip(3).limit(5).toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve paid orders
    router.get('/paid', async (req, res) => {
        try {
            const orders = await ordersCollection.find({ paid: 'Y' }).toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve paid orders from 2019
    router.get('/paid-2019', async (req, res) => {
        try {
            const orders = await ordersCollection.find({ paid: 'Y', year: 2019 }).toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve unpaid orders or orders before 2019
    router.get('/unpaid-or-before-2019', async (req, res) => {
        try {
            const orders = await ordersCollection.find({
                $or: [{ paid: 'N' }, { year: { $lt: 2019 } }],
            }).toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve orders with price currency in NOK
    router.get('/currency-nok', async (req, res) => {
        try {
            const orders = await ordersCollection.find({ 'cost.currency': 'NOK' }).toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve orders with price 18 NOK
    router.get('/price-18-nok', async (req, res) => {
        try {
            const orders = await ordersCollection.find({
                'cost.currency': 'NOK',
                'cost.price': 18,
            }).toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Increment price by 7 for orders with product "p2"
    router.put('/increment-price-p2', async (req, res) => {
        try {
            const result = await ordersCollection.updateMany(
                { 'items.product': 'p2' },
                { $inc: { 'cost.price': 7 } }
            );
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete orders with products whose quantity is 4
    router.delete('/delete-quantity-4', async (req, res) => {
        try {
            const result = await ordersCollection.deleteMany({ 'items.quantity': 4 });
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Retrieve orders with products whose first color is blue
    router.get('/first-color-blue', async (req, res) => {
        try {
            const orders = await ordersCollection.find({ 'items.colors.0': 'blue' }).toArray();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};
