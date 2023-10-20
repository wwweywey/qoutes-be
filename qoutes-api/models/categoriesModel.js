const mongoose = require('mongoose');

// Define the schema
const categorySchema = new mongoose.Schema({
    name: String,
}, {
    timestamps: true
});

// Create the model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
