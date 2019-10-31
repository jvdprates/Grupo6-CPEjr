var express = require('express');
var router = express.Router();
const firebase = require('firebase');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks' });
});

router.post('/index', function(req, res, next) {
  const user = req.body.user;
  console.log(req.body);
  console.log("KKKKKK hello world");
  console.log(req.body.user);
  console.log("Alou alou");
  console.log(user.username);
  console.log(user.password);
  // firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((fIREBASE) => {
  // console.log("_________________________________________________________________________________________________");
  // console.log(fIREBASE);
  // console.log("_________________________________________________________________________________________________");
  // console.log(fIREBASE.user.uid);
  // console.log("_________________________________________________________________________________________________");
  res.redirect('/');
  // }).catch((error) => {
  // console.log(error);
  // res.redirect('/error');
  // });
});


router.get('/1aba', function(req, res, next) {
  res.render('1aba', { title: 'Stocks - Minha Carteira' });
});


router.get('/2aba', function(req, res, next) {
  res.render('2aba', { title: 'Stocks - Minha Rentabilidade' });
});

router.get('/3aba', function(req, res, next) {
  res.render('3aba', { title: 'Stocks - Pesquisa de papéis' });
});





module.exports = router;
