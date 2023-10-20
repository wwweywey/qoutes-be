const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const express = require('express');

const router = express.Router();

// model
const User = require('../models/userModel');

// Generate a secret key
const generateSecretKey = () => {
    const length = 32; // 256 bits
    return crypto.randomBytes(length).toString('hex');
};

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by their username
        const user = await User.findOne({ username });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the passwords don't match, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const payload = { userId: user._id };
        const secretKey = generateSecretKey();
        const expiresIn = '15m';
        const token = jwt.sign(payload, secretKey, { expiresIn });

        // Set the token in a client cookie
        res.cookie('token', token, { httpOnly: true });

        // Set the token in the response header
        // res.set('Authorization', `Bearer ${token}`);

        // If the passwords match, return a success message
        res.status(200).json({ message: 'Login successful', token, id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;