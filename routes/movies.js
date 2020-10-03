const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const data = req.body;
  res.send(data);
});

module.exports = router;
