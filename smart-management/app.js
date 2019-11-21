require('dotenv').config();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const firebase = require('firebase');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://izabelabrant:cpejr123@cluster0-sy1bz.mongodb.net/test?retryWrites=true&w=majority', {
 useNewUrlParser: true,
 useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', () => {
 console.log('database connect!');
});

/**
 * firebase setup
 */
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
 defaultLayout: 'layout',
 extname: '.hbs',
 partialsDir: 'views/partials',
 helpers: {
   // Here we're declaring the #section that appears in layout/layout.hbs
   section(name, options) {
     if (!this._sections) this._sections = {};
     this._sections[name] = options.fn(this);
     return null;
   },

   formatTime(date, format){
     var day = date.getDate() + 1;
     var month = date.getMonth() + 1;
     var year = date.getFullYear();

     if (day==32) {
       day=01;
       month=month+1;
     }

     if (day==31 && month==3) {
       day=01;
       month=month+1;
     }

     if (day==31 && month==4) {
       day=01;
       month=month+1;
     }

     if (day==31 && month==6) {
       day=01;
       month=month+1;
     }

     if (day==31 && month==9) {
       day=01;
       month=month+1;
     }

     if(day==31 && month==11){
       day=01;
       month=month+1;
     }

     if(day==29 && month==2 && year%4==0){
       day=29;
       month=2;
     }

     if(day==29 && month==2 && year%4!=0){
       day=1;
       month=3;
     }

     if(day==30 && month==2 && year%4==0){
       day=1;
       month=month+1;
     }

     return day + '/' + month + '/' + year;
    },

    formatMoney(value){
      var value = value.toFixed(2);
      return value.replace(".", ",");
     },

     ifEquals(arg1, arg2, options){
       return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
     },

     removeEnd(value){
       return (value.replace(".SAO", ""));
     },

   // Compare logic
   compare(lvalue, rvalue, options) {
     if (arguments.length < 3) {
       throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
     }
     const operator = options.hash.operator || '==';
     const operators = {
       '==': function(l, r) { return l == r; },
       '===': function(l, r) { return l === r; },
       '!=': function(l, r) { return l != r; },
       '<': function(l, r) { return l < r; },
       '>': function(l, r) { return l > r; },
       '<=': function(l, r) { return l <= r; },
       '>=': function(l, r) { return l >= r; },
       'typeof': function(l, r) { return typeof l == r; }
     }
     if (!operators[operator]) {
       throw new Error(`Handlerbars Helper 'compare' doesn't know the operator ${operator}`);
     }
     const result = operators[operator](lvalue, rvalue);
     if (result) {
       return options.fn(this);
     }
     return options.inverse(this);
   }
 }
}));


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(session({
 secret: 'some-private-cpe-key',
 resave: true,
 saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Codigo copiado
app.use(cookieParser());
app.use(session({
  secret: 'some-private-cpe-key',
  key: 'cpe'
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
