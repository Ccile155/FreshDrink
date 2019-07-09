var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express '}); // la réponse. tu la rends. (dans le template index), {avec la variable title})
});

module.exports = router;
