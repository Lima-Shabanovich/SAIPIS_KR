var express = require('express'); //для маршрутизации
var path = require('path');     // Модуль path предоставляет утилиты для работы с путями к файлам и директориям
var cookieParser = require('cookie-parser');   //
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');   // Механизм просмотра Handlebars для Express,
var expressValidator = require('express-validator');   //
var flash = require('connect-flash');   //
var session = require('express-session');    //
var passport = require('passport');   //
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kr');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();   // Init App

// View Engine
app.set('views', path.join(__dirname, 'views'));    // где лежат странички
app.engine('handlebars', exphbs({defaultLayout:'layout'}));    //Использование шаблонизаторов в Express
app.set('view engine', 'handlebars');      // тип шаблонов

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({       /////////?????????
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());   ////////????????
app.use(passport.session());

// Express Validator
app.use(expressValidator({     ///////////???????
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());   ////?????????

// Global Vars
app.use(function (req, res, next) {         /////?????
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);  //тут index.js
app.use('/users', users); // а тут user.js

// Set Port
app.set('port', (process.env.PORT || 1500));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});