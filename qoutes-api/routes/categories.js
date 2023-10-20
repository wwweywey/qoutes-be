const express = require('express');
const mongoose = require('mongoose');


const router = express.Router();

// models
const Categories = require('../models/categoriesModel');
const Quote = require('../models/quotesModel');

// Get all quotes categories
router.get('/', async (req, res) => {
    try {
        const allCategories = await Categories.find();
        const categories = allCategories.map(item => ({ id: item._id, name: item.name }));

        res.status(200).json({
            message: "Successfully fetched all categories",
            data: categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Get qoutes by categories
router.get('/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Check if categoryId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const quotes = await Quote.find({ category_id: categoryId })
            .populate({
                path: 'category_id',
                select: 'name'
            })
            .lean(); // Use the lean() method to return plain JavaScript objects

        // Transform the data to replace 'category_id' with 'name' directly in the quote objects
        const transformedQuotes = quotes.map((quote) => ({
            ...quote,
            category_id: quote.category_id._id, // Replace 'category_id' with '_id'
            category: quote.category_id.name // Add 'name'
        }));

        res.status(200).json({
            message: "Successfully fetched all quotes",
            data: transformedQuotes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
