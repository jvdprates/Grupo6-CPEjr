var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks' });
});

router.get('/1aba', function(req, res, next) {
  res.render('1aba', { title: 'Stocks-Minha Carteira' });
});

router.get('/2aba', function(req, res, next) {
  res.render('2aba', { title: 'Stocks-Minha Rentabilidade' });
});

router.get('/3aba', function(req, res, next) {
  res.render('3aba', { title: 'Terceira aba' });
});





module.exports = router;
