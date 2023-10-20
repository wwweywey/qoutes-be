const mongoose = require('mongoose');

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USER;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
const url = `mongodb+srv://${dbUsername}:${dbPassword}@cluster1.vshtvss.mongodb.net/${dbName}?retryWrites=true&w=majority`

const printDB = async () => {
    //   Uncomment to debug
    console.log(`DB_NAME: ${dbName}`);
    console.log(`DB_USER: ${dbUsername}`);
    console.log(`DB_PASSWORD: ${dbPassword}`);
    console.log(`URL: ${url}`);

}
async function connectToDatabase() {
    printDB();
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB database!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}



async function seedConnectToDatabase() {
    mongoose.set('strictQuery', false);

    console.log(`DB_NAME: ${process.env.DB_NAME}`);
    console.log(`DB_USER: ${dbUsername}`);
    console.log(`DB_PASSWORD: ${dbPassword}`);
    console.log(`URL: ${url}`);
    console.log(url);

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        });

        const db = mongoose.connection;

        db.once('open', () => {
            console.log('Connected to MongoDB database!');
        });

        db.on('error', (err) => {
            console.error('Error connecting to MongoDB:', err);
        });

        return db; // Return the Mongoose connection directly.
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Rethrow the error to be caught by the caller.
    }
}



module.exports = { connectToDatabase, seedConnectToDatabase };
