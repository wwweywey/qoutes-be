const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// models
const User = require('../models/userModel');

// Fetch user profile
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: "Successfully fetched user",
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
