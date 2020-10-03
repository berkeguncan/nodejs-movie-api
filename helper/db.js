const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/movies');
    mongoose.connection.on('open', () => {
        console.log('Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Not Connected');
        console.log(err);
    });
};