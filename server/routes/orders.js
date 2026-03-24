const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, adminAuth } = require('../middleware/auth');

// POST /api/orders - Place an order
router.post('/', async (req, res) => {
    try {
        const { items, shippingAddress, totalAmount, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            items,
            shippingAddress,
            totalAmount,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            user: req.body.userId || null
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /api/orders - Admin: Get all orders
router.get('/', adminAuth, async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const total = await Order.countDocuments();
        const orders = await Order.find()
            .sort('-createdAt')
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .populate('user', 'name email');

        res.json({
            orders,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalOrders: total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT /api/orders/:id/status - Admin: Update order status
router.put('/:id/status', adminAuth, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
