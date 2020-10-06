const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bc = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('Register Page');
});

router.post('/', (req, res) => {
    const { userName, password } = req.body;
    bc.hash(password, 10).then((hash) => {

        const user = new User({
            userName: userName,
            password: hash
        });
    
        user.save()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err);
            });
    });
});

module.exports = router;