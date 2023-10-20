const mongoose = require('mongoose');

// Define the schema
const favoriteSchema = new mongoose.Schema({
    quote_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote' // Reference the 'Quote' model
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference the 'User' model
    }
}, {
    timestamps: true
});

// Create the model
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
