const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
        
    }
}

module.exports = { connect };