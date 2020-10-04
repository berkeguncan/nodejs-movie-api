const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
  const {title, imdb_score, category, country, year} = req.body;

  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });

  // movie.save((err, data) => {
  //   if (err) {
  //     res.json(err);
  //   }
  //   res.json(data);
  // });

  movie.save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    })
});

router.get('/', (req, res) => {
  Movie.find({ })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/top10', (req, res, next) => {
  Movie.find({}).limit(10).sort({ imdb_score: -1 })
    .then((data) => {
      if (!data) {
        next({ message: 'Sıralama Gerçekleştirilemiyor', code: 2 })
      }else{
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/between/:start_year/:end_year', (req, res, next) => {
  Movie.find(
  {
    year: { '$gte': req.params.start_year, '$lte':req.params.end_year }
  })
    .then((data) => {
      if (!data) {
        next({ message:'Film Bulunamadı', code:1 })
      }else{
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/:movie_id', (req, res, next) => {
  Movie.findById(req.params.movie_id)
    .then((data) => {
      if(!data) {
        next({ message: 'Film Bulunamadı', code: 1 });
      }else{
        res.json(data);
      }
    }).catch((err) => {
      res.json(err);
    });
}); 

router.put('/:movie_id', (req, res, next) => {
  // { new:true } demek güncellenmiş datayı istediğimiz anlamına geliyor.
  Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        next({message: 'Film Bulunamadı', code: 1});
      }else{
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/:movie_id', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movie_id)
    .then((data) => {
      if (!data) {
        next({ message: 'Film Bulunamadı', code: 1 });
      }else{
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});



module.exports = router;
