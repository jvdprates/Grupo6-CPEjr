var express = require('express');
var router = express.Router();
const firebase = require('firebase');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks', layout: 'layout2' });
});


router.get('/1aba', function(req, res, next) {
  res.render('1aba', { title: 'Stocks - Minha Carteira', layout: 'layout'});
});


router.get('/2aba', function(req, res, next) {
  res.render('2aba', { title: 'Stocks - Minha Rentabilidade', layout: 'layout' });
});

router.get('/3aba', function(req, res, next) {
  res.render('3aba', { title: 'Stocks - Pesquisa de papéis', layout: 'layout' });
});

router.get('/esqueci-minha-senha', function(req, res, next) {
  res.render('esqueci-minha-senha', { title: 'Stocks - Esqueci minha senha', layout: 'layout2' });
});

router.get('/registrar', function(req, res, next) {
  res.render('registrar', { title: 'Stocks - Registrar', layout: 'layout2' });
});


router.post('/registrar', function(req, res, next) {
  const user = req.body.user;
  console.log("----------------------------------------------------------------------------");
  console.log(user.email);
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((fIREBASE) => {
      console.log("Usuario registrado");
     res.redirect('/');
    }).catch((error) => {
    console.log(error);
    res.redirect('/error');
});
});

router.post('/index', function(req, res, next) {
  const user = req.body.user;
  console.log("auauauauauuauauau");
    console.log(user.email);
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((fIREBASE) => {
       res.redirect('/1aba');
      }).catch((error) => {
      console.log(error);
      res.redirect('/error');
// ...
});
});


router.get('/redefinir-senha', function(req, res, next) {
  res.render('redefinir-senha', { title: 'Stocks - Redefinir senha' });
});


module.exports = router;
