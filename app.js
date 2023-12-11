require('dotenv').config();
const express = require('express');
const path = require("path");
const connectToDB = require('./config/db');
const PORT = process.env.PORT || 8000;

const { errorHandler, notFound } = require('./Middlewares/errors');

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const passwordRouter = require('./routes/password');
const uploadRouter = require('./routes/upload');

const helmet = require("helmet");
const cors = require("cors");


// const { logger } = require('./Middlewares/logger');
// Connection to Database
connectToDB();

// Init App
const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, "images")));
// Apply Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(logger);

// Helmet
app.use(helmet());
// Cors Policy
app.use(cors());
// Set View Engine 
app.set('view engine', 'ejs');


// Routes
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/upload', uploadRouter)
app.use('/password', passwordRouter)

// Error Handling middleware
app.use(notFound)
app.use(errorHandler)


// Running Server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})