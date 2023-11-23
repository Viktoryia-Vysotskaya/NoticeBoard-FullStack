const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');
const connectToDB = require('./db');

// Setting environment variables from a .env file
dotenv.config();

// Creating an Express Instance
const app = express();
app.use(helmet());

// Middleware for processing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "img-src 'self' data: blob:");
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Middleware to add Cross-Origin-Resource-Policy header for static files
app.use('/uploads', (req, res, next) => {
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// Middleware for CORS processing (If not in production, setup CORS)
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://noticeboard-fullstack.viktoryiavysots.repl.co',
        ],
        credentials: true,
    })
);

const dbUri = connectToDB(); // Get dbUri from connectToDB function

// Middleware for sessions
app.set('trust proxy', 1);
app.use(
    session({
        secret: process.env.SECRET,
        store: new MongoStore({
            mongoUrl: dbUri,
            collection: 'sessions',
            cookie: {
                secure: process.env.NODE_ENV === 'production',
            },
        }),
        resave: false,
        saveUninitialized: false,
    })
);

// Middleware for processing static files
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

// Starting the server
const server = app.listen(process.env.PORT || 8000, () => {
    console.info('Server is running...');
});

// Processing all other requests
app.get('*', (req, res) => {
    res.sendFile((path.join(__dirname, '/client/build/index.html')));
});

// Middleware for handling 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', message: '404 not found...' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error processing request:', err);
    res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong on the server.' });
});

module.exports = server;