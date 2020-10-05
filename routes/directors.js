const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Director = require('../models/Directors');

router.post('/', (req, res, next) => {
    const { name, surname, bio, createdAt } = req.body;

    const director = new Director({
        name: name,
        surname: surname,
        bio: bio,
        createdAt: createdAt
    });

    director.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/', (req, res) => {
    Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.get('/:director_id', (req, res) => {
    Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('Error');
        throw err
    });
});

router.put('/:director_id', (req, res, next) => {
    Director.findByIdAndUpdate(req.params.director_id, req.body, { new: true })
        .then((data) => {
            if(!data){
                next({ message: 'Film Bulunamadı', code: 0 });
            }else{
                res.json(data);
            }
        })
        .catch((err) => {
            res.json(err);
        });
});

router.delete('/:director_id', (req, res, next) => {
    Director.findByIdAndRemove(req.params.director_id)
        .then((data) => {
            if (!data) {
                next({ message: 'Yönetmen Bulunamadı', code: 1 });
            }else{
                res.json(data);
            }
        })
        .catch((err) => {
            res.json(err);
        });
});


module.exports = router 