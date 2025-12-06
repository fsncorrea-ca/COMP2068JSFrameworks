// app.js

require('dotenv').config();                // Load environment variables from .env

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const session       = require('express-session');
const MongoStore    = require('connect-mongo');
const passport      = require('passport');
const hbs           = require('hbs');
// Database connection helper
const connectDB     = require('./config/db');

// Routers
const indexRouter        = require('./routes/index');
const usersRouter        = require('./routes/users');
const authRouter         = require('./routes/auth');
const adminServicesRouter= require('./routes/admin.services');
const adminTherapistsRouter = require('./routes/admin.therapists');

// Create express app
const app = express();

// Connect to MongoDB using the URI from .env
connectDB(process.env.MONGODB_URI);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
// Logger and parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration (required for Passport to store login state)
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// Passport configuration
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Make the logged user available in all views (optional but useful)
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', authRouter);           // /login, /register, /auth/github...
app.use('/admin', adminServicesRouter); // /admin/... (services CRUD)
app.use('/admin', adminTherapistsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
