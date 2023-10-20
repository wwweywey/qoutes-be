const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    password: {
        type: String,
        required: true
    },
    image: String, // Optional image field
    about_me: String // Optional about_me field
}, {
    timestamps: true
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
