const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/movies', {  useFindAndModify: true});
    mongoose.connection.on('open', () => {
        console.log('Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Not Connected');
        console.log(err);
    });

    mongoose.Promise = global.Promise;
};