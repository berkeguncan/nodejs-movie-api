const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const { userName, password } = req.body;

    User.findOne({
        userName: userName
    }).then((data) => {
        if(!data){
            res.json({
                status: false,
                message: 'Auth failed'
            })
        }else{
            bc.compare(password, data.password).then((result) => {
                if (!result) {
                    res.json({
                        status: false,
                        message: 'Wrong Password'
                    });
                } else {
                    const payload = {
                        userName: userName
                    };
                    const token = jwt.sign(payload, req.app.get('api_key'), {
                        expiresIn: 720
                    });
                    res.json({
                        status: true,
                        token: token
                    });
                }
            });
        }
    }).catch((err) => {
        res.json({
            message: 'hata'
        });
    });
});

module.exports = router;
