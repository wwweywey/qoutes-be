
require('dotenv').config();

const Favorite = require('../../models/favoritesModel');
const User = require('../../models/userModel');
const Quote = require('../../models/quotesModel');

const { seedConnectToDatabase } = require('../db');


// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function insertRandomFavorites(numFavoritesPerUser) {
    const users = await User.find().select('_id');
    const quoteIds = await Quote.find().select('_id');

    const favorites = [];

    for (const user of users) {
        for (let i = 0; i < numFavoritesPerUser; i++) {
            const randomIndex = getRandomInt(0, quoteIds.length - 1);
            const randomQuoteId = quoteIds[randomIndex]._id;
            favorites.push({ user_id: user._id, quote_id: randomQuoteId });
        }
    }

    await Favorite.insertMany(favorites);
    console.log(`Inserted ${favorites.length} favorites.`);
}

(async () => {
    try {

        const db = await seedConnectToDatabase();

        // Add more dummy data as needed.

        try {
            // Insert dummy data using insertMany
            const numFavoritesPerUser = 5;
            await insertRandomFavorites(numFavoritesPerUser);
            // console.log(`${result.length} documents inserted into the database.`);
        } catch (err) {
            // Handle insertMany errors
            console.error('Error inserting data:', err);
        } finally {
            // Close the database connection
            db.close();
        }
    } catch (err) {
        // Handle connection errors here.
        console.error('Failed to connect to the database:', err);
    }
})();
