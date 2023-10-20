
require('dotenv').config();

const QuoteModel = require('../../models/quotesModel');
const CategoryModel = require('../../models/categoriesModel');
const { seedConnectToDatabase } = require('../db');

const dummyData = [
    { "description": "Love is composed of a single soul inhabiting two bodies.", "author": "Aristotle", "category_id": 1 },
    { "description": "The greatest happiness you can have is knowing that you do not necessarily require happiness.", "author": "William Saroyan", "category_id": 1 },
    { "description": "Love yourself first and everything else falls into line.", "author": "Lucille Ball", "category_id": 1 },
    { "description": "A successful marriage requires falling in love many times, always with the same person.", "author": "Mignon McLaughlin", "category_id": 1 },
    { "description": "Where there is love there is life.", "author": "Mahatma Gandhi", "category_id": 1 },
    { "description": "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", "author": "Dr. Seuss", "category_id": 1 },
    { "description": "Love is an irresistible desire to be irresistibly desired.", "author": "Robert Frost", "category_id": 1 },
    { "description": "The best thing to hold onto in life is each other.", "author": "Audrey Hepburn", "category_id": 1 },
    { "description": "Being deeply loved by someone gives you strength while loving someone deeply gives you courage.", "author": "Lao Tzu", "category_id": 1 },
    { "description": "You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.", "author": "Oscar Wilde", "category_id": 1 },
    { "description": "Success is not how high you have climbed, but how you make a positive difference to the world.", "author": "Roy T. Bennett", "category_id": 2 },
    { "description": "The best way to predict the future is to create it.", "author": "Peter Drucker", "category_id": 2 },
    { "description": "Believe you can and you're halfway there.", "author": "Theodore Roosevelt", "category_id": 2 },
    { "description": "Your time is limited, don't waste it living someone else's life.", "author": "Steve Jobs", "category_id": 2 },
    { "description": "Be yourself; everyone else is already taken.", "author": "Oscar Wilde", "category_id": 2 },
    { "description": "Dream big and dare to fail.", "author": "Norman Vaughan", "category_id": 2 },
    { "description": "If you can dream it, you can achieve it.", "author": "Zig Ziglar", "category_id": 2 },
    { "description": "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.", "author": "Langston Hughes", "category_id": 2 },
    { "description": "The journey of a thousand miles begins with a single step.", "author": "Lao Tzu", "category_id": 2 },
    { "description": "The best way to predict the future is to create it.", "author": "Peter Drucker", "category_id": 2 },
    { "description": "The best preparation for tomorrow is doing your best today.", "author": "H. Jackson Brown, Jr.", "category_id": 3 },
    { "description": "Don't watch the clock; do what it does. Keep going.", "author": "Sam Levenson", "category_id": 3 },
    { "description": "The only way to achieve the impossible is to believe it is possible.", "author": "Charles Kingsleigh (Alice in Wonderland)", "category_id": 3 },
    { "description": "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", "author": "Jordan Belfort", "category_id": 3 },
    { "description": "Your life does not get better by chance, it gets better by change.", "author": "Jim Rohn", "category_id": 3 },
    { "description": "The only place where success comes before work is in the dictionary.", "author": "Vidal Sassoon", "category_id": 3 },
    { "description": "The only person you are destined to become is the person you decide to be.", "author": "Ralph Waldo Emerson", "category_id": 3 },
    { "description": "Motivation comes from working on things we care about.", "author": "Sheryl Sandberg", "category_id": 3 },
    { "description": "If you can dream it, you can achieve it.", "author": "Zig Ziglar", "category_id": 3 },
    { "description": "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "author": "Christian D. Larson", "category_id": 3 },
    { "description": "Dreams are the touchstones of our character.", "author": "Henry David Thoreau", "category_id": 4 },
    { "description": "Dream big and dare to fail.", "author": "Norman Vaughan", "category_id": 4 },
    { "description": "The future belongs to those who believe in the beauty of their dreams.", "author": "Eleanor Roosevelt", "category_id": 4 },
    { "description": "All our dreams can come true if we have the courage to pursue them.", "author": "Walt Disney", "category_id": 4 },
    { "description": "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", "author": "Jordan Belfort", "category_id": 4 },
    { "description": "You see things and you say, 'Why?' But I dream things that never were, and I say, 'Why not?'", "author": "George Bernard Shaw", "category_id": 4 },
    { "description": "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly", "author": "Henry David Thoreau", "category_id": 4 },
    { "description": "A real friend is one who walks in when the rest of the world walks out.", "author": "Walter Winchell", "category_id": 5 },
    { "description": "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'", "author": "C.S. Lewis", "category_id": 5 },
    { "description": "A friend is someone who gives you total freedom to be yourself.", "author": "Jim Morrison", "category_id": 5 },
    { "description": "A friend is someone who knows all about you and still loves you.", "author": "Elbert Hubbard", "category_id": 5 },
    { "description": "A true friend is someone who is there for you when they would rather be anywhere else.", "author": "Len Wein", "category_id": 5 },
    { "description": "A single rose can be my garden... a single friend, my world.", "author": "Leo Buscaglia", "category_id": 5 },
    { "description": "Friendship is the only cement that will ever hold the world together.", "author": "Woodrow Wilson", "category_id": 5 },
    { "description": "A friend is one who believes in you when you have ceased to believe in yourself.", "author": "Unknown", "category_id": 5 },
    { "description": "A true friend never gets in your way unless you happen to be going down.", "author": "Arnold H. Glasow", "category_id": 5 },
    { "description": "A friend is someone who can see the truth and pain in you even when you are fooling everyone else.", "author": "Unknown", "category_id": 5 },
    { "description": "The only true wisdom is in knowing you know nothing.", "author": "Socrates", "category_id": 6 },
    { "description": "The only way to do great work is to love what you do.", "author": "Steve Jobs", "category_id": 6 },
    { "description": "The only thing we have to fear is fear itself.", "author": "Franklin D. Roosevelt", "category_id": 6 },
    { "description": "The only thing that interferes with my learning is my education.", "author": "Albert Einstein", "category_id": 6 },
    { "description": "The only limit to our realization of tomorrow will be our doubts of today.", "author": "Franklin D. Roosevelt", "category_id": 6 },
    { "description": "The only place where success comes before work is in the dictionary.", "author": "Vidal Sassoon", "category_id": 6 },
    { "description": "The only person you are destined to become is the person you decide to be.", "author": "Ralph Waldo Emerson", "category_id": 6 },
    { "description": "The only way to achieve the impossible is to believe it is possible.", "author": "Charles Kingsleigh (Alice in Wonderland)", "category_id": 6 },
    { "description": "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", "author": "Jordan Belfort", "category_id": 6 },
    { "description": "The only source of knowledge is experience.", "author": "Albert Einstein", "category_id": 6 },
    { "description": "Success is not how high you have climbed, but how you make a positive difference to the world.", "author": "Roy T. Bennett", "category_id": 7 },
    { "description": "Success is not final, failure is not fatal: It is the courage to continue that counts.", "author": "Winston Churchill", "category_id": 7 },
    { "description": "Success is stumbling from failure to failure with no loss of enthusiasm.", "author": "Winston Churchill", "category_id": 7 },
    { "description": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "author": "Albert Schweitzer", "category_id": 7 },
    { "description": "Success is walking from failure to failure with no loss of enthusiasm.", "author": "Winston Churchill", "category_id": 7 },
    { "description": "Success is not in what you have, but who you are.", "author": "Bo Bennett", "category_id": 7 },
    { "description": "Success is not the absence of failure; it's the persistence through failure.", "author": "Aisha Tyler", "category_id": 7 },
    { "description": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "author": "Albert Schweitzer", "category_id": 7 },
    { "description": "Success is not in what you have, but who you are.", "author": "Bo Bennett", "category_id": 7 },
    { "description": "Success is stumbling from failure to failure with no loss of enthusiasm.", "author": "Winston Churchill", "category_id": 7 },
    { "description": "Gratitude turns what we have into enough.", "author": "Unknown", "category_id": 11 },
    { "description": "Gratitude is not only the greatest of virtues but the parent of all others.", "author": "Cicero", "category_id": 11 },
    { "description": "Gratitude is the fairest blossom which springs from the soul.", "author": "Henry Ward Beecher", "category_id": 11 },
    { "description": "Gratitude is the sign of noble souls.", "author": "Aesop", "category_id": 11 },
    { "description": "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.", "author": "Melody Beattie", "category_id": 11 },
    { "description": "Gratitude is the healthiest of all human emotions. The more you express gratitude for what you have, the more likely you will have even more to express gratitude for.", "author": "Zig Ziglar", "category_id": 11 },
    { "description": "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.", "author": "Melody Beattie", "category_id": 11 },
    { "description": "Gratitude is the fairest blossom which springs from the soul.", "author": "Henry Ward Beecher", "category_id": 11 },
    { "description": "Gratitude is not only the greatest of virtues but the parent of all others.", "author": "Cicero", "category_id": 11 },
    { "description": "Gratitude turns what we have into enough.", "author": "Unknown", "category_id": 11 },
    { "description": "Family is not an important thing. It's everything.", "author": "Michael J. Fox", "category_id": 10 },
    { "description": "Rejoice with your family in the beautiful land of life.", "author": "Albert Einstein", "category_id": 10 },
    { "description": "The family is one of nature's masterpieces.", "author": "George Santayana", "category_id": 10 },
    { "description": "In family life, love is the oil that eases friction, the cement that binds closer together, and the music that brings harmony.", "author": "Friedrich Nietzsche", "category_id": 10 },
    { "description": "Family is not an important thing. It's everything.", "author": "Michael J. Fox", "category_id": 10 },
    { "description": "The family is the first essential cell of human society.", "author": "Pope John XXIII", "category_id": 10 },
    { "description": "The family is one of nature's masterpieces.", "author": "George Santayana", "category_id": 10 },
    { "description": "Family is where life begins and love never ends.", "author": "Unknown", "category_id": 10 },
    { "description": "Family is not an important thing. It's everything.", "author": "Michael J. Fox", "category_id": 10 },
    { "description": "Rejoice with your family in the beautiful land of life.", "author": "Albert Einstein", "category_id": 10 },
    { "description": "Happiness is not something ready-made. It comes from your own actions.", "author": "Dalai Lama", "category_id": 9 },
    { "description": "Happiness is a warm puppy.", "author": "Charles M. Schulz", "category_id": 9 },
    { "description": "Happiness is not in the mere possession of money; it lies in the joy of achievement, in the thrill of creative effort.", "author": "Franklin D. Roosevelt", "category_id": 9 },
    { "description": "Happiness is the art of never holding in your mind the memory of any unpleasant thing that has passed.", "author": "Unknown", "category_id": 9 },
    { "description": "Happiness is not by chance, but by choice.", "author": "Jim Rohn", "category_id": 9 },
    { "description": "Happiness is a state of mind. It's just according to the way you look at things.", "author": "Walt Disney", "category_id": 9 },
    { "description": "Happiness is not a goal; it is a by-product.", "author": "Eleanor Roosevelt", "category_id": 9 },
    { "description": "Happiness is when what you think, what you say, and what you do are in harmony.", "author": "Mahatma Gandhi", "category_id": 9 },
    { "description": "Happiness is not something you postpone for the future; it is something you design for the present.", "author": "Jim Rohn", "category_id": 9 },
    { "description": "Happiness is the highest level of success.", "author": "Unknown", "category_id": 9 }];

// Comman node 
(async () => {
    try {
        const db = await seedConnectToDatabase();

        const categories = await CategoryModel.find().select('_id');
        const categoryIds = categories.map(category => category._id);

        // Assign a random category_id to each quote
        const quotesWithCategory = dummyData.map(quote => ({
            ...quote,
            category_id: categoryIds[Math.floor(Math.random() * categoryIds.length)]
        }));

        try {
            // Insert dummy data using insertMany
            const result = await QuoteModel.insertMany(quotesWithCategory, { maxTimeMS: 60000 });
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
