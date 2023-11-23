const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = () => {
    // Connecting to MongoDB
    let dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54lfkap.mongodb.net/adsDB?retryWrites=true&w=majority`;

    mongoose.connect(dbUri);
    
    const db = mongoose.connection;

    // Event handlers for connecting to a database
    db.once('open', () => {
        console.log('Connected to the database');
    });

    db.on('error', (err) => {
        console.error('Error connecting to MongoDB:', err);
    });

    return dbUri;
};

module.exports = connectToDB;
