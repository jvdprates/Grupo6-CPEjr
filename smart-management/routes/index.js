var express = require('express');
var router = express.Router();
const firebase = require('firebase');
const Product = require('../models/product');

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stocks', layout: 'layout2' });
});

router.get('/adicionar', function(req, res, next) {
  res.render('product', { title: 'Adicionar à carteira', layout: 'layout2' });
});

router.post('/adicionar', function(req, res, next) {
  console.log("teste");
  const newProduct = {
    sigla: req.body.sigla,
    quantidade: req.body.quantidade,
    valor: req.body.valor,
    data: req.body.data
  }
  Product.createNew(newProduct).then((result)=>{
    console.log(result);
    res.redirect('/adicionar');
  }).catch(err=>{
    console.log(err);
    res.redirect('/adicionar');
  });
});

/*router.get('/allProducts', function(req, res, next) {
 Product.getAll().then((products) =>{
   res.render('allProducts', { title: 'product', products });
 }).catch(err =>{
   res.redirect('/product');
 });
});*/


router.get('/minha-carteira', function(req, res, next) {
   Product.getAll().then((products) =>{
     res.render('1aba', { title: 'Stocks - Minha Carteira', layout: 'layout', products});
  }).catch(err =>{
    res.redirect('/adicionar');
  });
});


router.get('/minha-rentabilidade', function(req, res, next) {
  res.render('2aba', { title: 'Stocks - Minha Rentabilidade', layout: 'layout' });
});

router.get('/pesquisa', function(req, res, next) {
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
       res.redirect('/minha-carteira');
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
