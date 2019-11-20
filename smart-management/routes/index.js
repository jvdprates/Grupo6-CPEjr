var express = require('express');
var router = express.Router();
const firebase = require('firebase');
const Product = require('../models/product');
const notifier = require('node-notifier');
const path = require('path');
const request = require('request');

var userSession = {
  userEmail: "",
  userID: "",
  userAuthentication: false
};

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Stocks',
    layout: 'layout'
  });
  if (userSession.userAuthentication == true) {
    console.log("Usuário já está logado");
    userSession.userAuthentication = false;
    userSession.userEmail = "";
    userSession.userID = "";
    notifier.notify({
      title: 'Stocks',
      message: 'Usuário desconectado',
      sound: false,
      icon: path.join(__dirname, 'logo.png'),
    });
  }
});

router.get('/minha-carteira', function(req, res, next) {
  Product.getAllById(userSession.userID).then((products) => {
    if (userSession.userAuthentication == false) {
      console.log("Usuário não está autenticado");
      notifier.notify({
        title: 'Stocks',
        message: 'Usuário não está logado',
        sound: false,
        icon: path.join(__dirname, 'logo.png'),
      });
      res.redirect('./');
    } else {
      //res.render('1aba', { title: 'Stocks - Minha Carteira', layout: 'layout2', products});
      res.render('1aba', {
        title: 'Stocks - Minha Carteira',
        layout: 'layout2',
        products
      });
    }
  }).catch(err => {
    console.log(err);
    res.redirect('./');
  });

});


router.get('/minha-rentabilidade', function(req, res, next) {
  if (userSession.userAuthentication == false) {
    console.log("Usuário não está autenticado");
    notifier.notify({
      title: 'Stocks',
      message: 'Usuário não está logado',
      sound: false,
      icon: path.join(__dirname, 'logo.png'),
    });
    res.redirect('./');
  } else {
    res.render('2aba', {
      title: 'Stocks - Minha Rentabilidade',
      layout: 'layout2'
    });
  }
});


router.get('/pesquisa', function(req, res, next) {
  if (userSession.userAuthentication == false) {
    console.log("Usuário não está autenticado");
    notifier.notify({
      title: 'Stocks',
      message: 'Usuário não está logado',
      sound: false,
      icon: path.join(__dirname, 'logo.png'),
    });
    res.redirect('./');
  } else {
    res.render('3aba', {
      title: 'Stocks - Pesquisa de papéis',
      layout: 'layout2'
    });
  }
});


router.get('/esqueci-minha-senha', function(req, res, next) {
  res.render('esqueci-minha-senha', {
    title: 'Stocks - Esqueci minha senha',
    layout: 'layout'
  });
});


router.get('/registrar', function(req, res, next) {
  res.render('registrar', {
    title: 'Stocks - Registrar',
    layout: 'layout'
  });
});


router.get('/redefinir-senha', function(req, res, next) {
  res.render('redefinir-senha', {
    title: 'Stocks - Redefinir senha'
  });
});

router.post('/pesquisa-search', function(req, res, next) {
  const keywords = req.body.search;
  request('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keywords + '&apikey=5M98NU65NMZOASYR',
    (error, response, body) => {
      let results = JSON.parse(body).bestMatches;
      res.render('partials/card-box-search', {
        layout: '',
        results
      });
    });
});

router.get('/pesquisa-stock/:symbol', function(req, res, next) {
  const symbol = req.params.symbol;
  getValues(symbol, function(value) {
    res.send(value);
  });
});

function getValues(symbol, callback) {
  request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=5M98NU65NMZOASYR',
    (error, response, body) => {
      if (JSON.parse(body)['Note'] != null)
      {
        setTimeout(() => {getValues(symbol, callback)}, 60000);
      }
      else
      {
        let value = JSON.parse(body)['Global Quote'];
        callback(value);
      }
    });
}



router.post('/pesquisa-add', function(req, res, next) {
  const newProduct = {
    code: req.body.code,
    user_id: userSession.userID,
    quantity: req.body.quantity,
    investedAmount: req.body.investedAmount,
    date: req.body.date,
    absolutRevenue: 100,
    totalinvestedAmount: req.body.quantity * req.body.investedAmount
  }
  console.log(newProduct.date);
  Product.createNew(newProduct).then((result) => {
    if (userSession.userAuthentication == false) {
      console.log("Usuário não está autenticado");
      notifier.notify({
        title: 'Stocks',
        message: 'Usuário não está logado',
        sound: false,
        icon: path.join(__dirname, 'logo.png'),
      });
      res.redirect('./');
    } else {
      console.log(result);
      res.redirect('/pesquisa');
    }
  }).catch(err => {
    console.log(err);
    res.redirect('./');
  });
});

router.post('/esqueci-minha-senha', function(req, res, next) {
  const user = req.body.user;
  console.log(user.email);
  firebase.auth().sendPasswordResetEmail(user.email).then((fIREBASE) => {
    res.redirect('./');
    notifier.notify({
      title: 'Stocks',
      message: 'Email de redefinição enviado para: ' + user.email,
      icon: path.join(__dirname, 'logo.png'),
    });

  }).catch((error) => {
    console.log("Email inserido não está no banco de dados")
    res.redirect('/esqueci-minha-senha');
    notifier.notify({
      title: 'Stocks',
      message: 'Email inserido não está cadastrado: ' + user.email,
      icon: path.join(__dirname, 'logo.png'),
    });
  })
});

router.post('/index', function(req, res, next) {
  const user = req.body.user;
  console.log(user.email);
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((fIREBASE) => {
    userSession.userEmail = user.email;
    userSession.userAuthentication = true;
    userSession.userID = fIREBASE.user.uid;
    res.redirect('/minha-carteira');
    notifier.notify({
      title: 'Stocks',
      message: user.email + ', seja bem vindo!',
      sound: false,
      icon: path.join(__dirname, 'logo.png'),
    });
  }).catch((error) => {
    switch (error.code) {
      case 'auth/wrong-password':
        req.flash('danger', 'Senha incorreta');
        break;
      case 'auth/user-not-found':
        req.flash('danger', 'Email não registrado');
        break;
    }
    console.log(error);
    res.redirect('./');
  });
});


router.post('/registrar', function(req, res, next) {
  const user = req.body.user;
  console.log("----------------------------------------------------------------------------");
  console.log(user.email);
  if (!(user.password.localeCompare(user.confirmPassword))) {
    console.log("Entrou no IF corretamente");
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((fIREBASE) => {
      console.log("Usuario registrado");
      res.redirect('./');
      notifier.notify({
        title: 'Stocks',
        message: 'Usuário registrado: ' + user.email,
        icon: path.join(__dirname, 'logo.png'),
      });
    }).catch((error) => {
      console.log(error.code);
      if (error.code == "auth/email-already-in-use") {
        notifier.notify({
          title: 'Stocks',
          message: 'Email já está em uso',
          icon: path.join(__dirname, 'logo.png'),
        });
        res.redirect('/registrar')
      } else {
        res.redirect('/registrar');
        notifier.notify({
          title: 'Stocks',
          message: 'Insira um endereço de email válido',
          icon: path.join(__dirname, 'logo.png'),
        });
      }
    });
  } else {
    console.log("Senha não bateu com a confirmacao de senha.");
    notifier.notify({
      title: 'Stocks',
      message: 'Senha não bateu com a confirmacao de senha',
      icon: path.join(__dirname, 'logo.png'),
    });
    res.redirect('/registrar');
  }
});

router.post('/deletar', function (req, res, next) {
  const id = req.body._id;
  Product.removeById(id);
  res.redirect('/minha-carteira');
});


module.exports = router;
