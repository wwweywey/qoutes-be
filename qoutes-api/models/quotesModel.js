const mongoose = require('mongoose');

// Define the schema
const quoteSchema = new mongoose.Schema({
    description: String,
    author: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null // Default value is null for system-generated quotes
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null // Default value is null for system-generated quotes
    }
}, {
    timestamps: true
});

// Create the model
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
