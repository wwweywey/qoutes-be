
require('dotenv').config();

const categoryModel = require('../../models/categoriesModel');
const { seedConnectToDatabase } = require('../db');


(async () => {
    try {

        const db = await seedConnectToDatabase();

        const dummyData = [
            {
                "name": "Love",
                // "id": 1,
            },
            {
                "name": "Inspirational",
                // "id": 2,
            },
            {
                "name": "Motivation",
                // "id": 3,
            },
            {
                "name": "Dreams",
                // "id": 4,
            },
            {
                "name": "Friendship",
                // "id": 5,
            },
            {
                "name": "Wisdom",
                // "id": 6,
            },
            {
                "name": "Success",
                // "id": 7,
            },
            {
                "name": "Gratitude",
                // "id": 11,
            },
            {
                "name": "Family",
                // "id": 10,
            },
            {
                "name": "Happiness",
                // "id": 9,
            }


            // Add more dummy data as needed.
        ];

        try {
            // Insert dummy data using insertMany
            const result = await categoryModel.insertMany(dummyData, { maxTimeMS: 60000 });
            console.log(`${result.length} documents inserted into the database.`);
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
