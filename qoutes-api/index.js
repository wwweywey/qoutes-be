// Import and configure dotenv to load environment variables
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { connectToDatabase } = require('./config/db');
const startServer = require('./config/server');

const app = express();
connectToDatabase();
startServer(app);

// Routes
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user')
const categoriesRouter = require('./routes/categories');
const quotesRouter = require('./routes/quotes')

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // replace with the origin you want to allow
}));

//   Routes
app.get('/', async (req, res) => {
    res.status(200).send('Hello, Welcome to Qoutes API v1!');
});

app.use(registerRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/quote', quotesRouter);

