const mongoose = require('mongoose');
const config = require('config');
const connectionString = config.get('mongoURI');

const connectDB = () => {

    try {
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB started');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;