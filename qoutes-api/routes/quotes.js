const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// models
const Categories = require('../models/categoriesModel');
const Quote = require('../models/quotesModel');
const Favorite = require('../models/favoritesModel');

// Get all quotes categories
router.get('/list', async (req, res) => {
    try {
        const allQuotes = await Quote.find().populate({
            path: 'category_id',
            select: 'name'
        }).lean(); // Use the lean() method to return plain JavaScript objects

        // Transform the data to replace 'category_id' with 'name' directly in the quote objects
        const transformedQuotes = allQuotes.map((quote) => ({
            ...quote,
            category_id: quote.category_id._id, // Replace 'category_id' with '_id'
            category: quote.category_id.name // Add 'name'
        }));

        res.status(200).json({
            message: "Successfully fetched all quotes",
            data: transformedQuotes
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Fetch specific quote
router.get('/:id', async (req, res) => {
    try {
        const quoteId = req.params.id;
        const quote = await Quote.findById(quoteId);

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        res.status(200).json({
            message: "Successfully fetched quote",
            data: quote
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user quotes
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // const quotes = await Quote.find({ user_id: userId });
        const quotes = await Quote.find({ user_id: userId })
            .populate({
                path: 'category_id',
                select: 'name'
            }).lean();

        const transformedQuotes = quotes.map((quote) => ({
            ...quote,
            category_id: quote.category_id._id, // Replace 'category_id' with '_id'
            category: quote.category_id.name // Add 'name'
        }));

        res.status(200).json({
            message: "Successfully fetched user quotes",
            data: transformedQuotes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get user's favorite quotes
router.get('/favorites/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userFavorites = await Favorite.find({ user_id: userId })
            .populate({
                path: 'quote_id',
                populate: {
                    path: 'category_id',
                    select: 'name',
                },
            })
            .lean();


        // Extract the quotes from the user's favorites
        const quotes = userFavorites.map((favorite) => favorite.quote_id);

        // res.json(quotes);
        res.status(200).json({
            message: "Successfully fetched the user's favorite quotes",
            data: quotes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Create quote
router.post('/', async (req, res) => {
    try {
        const newQuote = await Quote.create(req.body)
        res.status(200).json(newQuote)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Edit quote
router.put('/:quoteId', async (req, res) => {
    try {
        const quoteId = req.params.quoteId;
        const { description, author, category_id } = req.body;

        // Find the quote by its ID
        const quote = await Quote.findById(quoteId);

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        // Check if the user ID in the quote matches the currently authenticated user
        // You might need to implement authentication and ensure the user making the request is the owner of the quote
        // For demonstration purposes, we'll assume you have a 'req.user' object with the user's ID
        if (quote.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to update this quote'
            });
        }

        // Update the quote fields
        quote.description = description;
        quote.author = author;
        quote.category_id = category_id;

        // Save the updated quote
        await quote.save();

        res.status(200).json({
            message: 'Quote updated successfully',
            data: quote
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete quote
router.delete('/:quoteId', async (req, res) => {
    try {
        const quoteId = req.params.quoteId;

        // Find the quote by its ID
        const quote = await Quote.findById(quoteId);

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        // Check if the user ID in the quote matches the currently authenticated user
        // You might need to implement authentication and ensure the user making the request is the owner of the quote
        // For demonstration purposes, we'll assume you have a 'req.user' object with the user's ID
        if (quote.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to delete this quote'
            });
        }

        // Delete the quote
        await Quote.findByIdAndRemove(quoteId);

        res.status(200).json({
            message: 'Quote deleted successfully',
            data: quote
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
