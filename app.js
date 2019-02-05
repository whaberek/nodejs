const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
require('dotenv').config();
require('./lib/helpers/prototypeMutations');
const { requireHttps } = require('./requireHttps');

const db = require('./lib/dbConnection');
const { response } = require('./config/response');
const { userTokenInitialization } = require('./lib/authorization/userTokenInitialization');
const { populateUserInfo } = require('./lib/authorization/populateUserInfo');
const { errorHandler } = require('./lib/middleware/errorHandler');

const app = express();

// path to root of project
global.appRoot = path.resolve(__dirname);

/**
 * Initialize database connection
 */
db.initializeConnection();

/**
 * Cors on heroku
 */
const host = process.env.UI_HOST_ORIGIN;

app.use(requireHttps());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', host);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', host);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.status(200).end();
});

/**
 * Set login request in console
 * @param {dev} developemnt version
 */
app.use(morgan('dev'));

/**
 * Parse request and cookies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Set and configure Token
 * @param {COOKIES_TOKEN} secret in token
 * @prop {cookie} name of property in cookie for token
 * @prop {stales} time for sesion of cookie is valid now 30 min
 * @prop {refresh} cookie sesion refresh on every request
 */

app.use(userTokenInitialization());
app.use(populateUserInfo());

/**
 * Load all routes from /routes folder
 */
app.use('/api/v1', require('./modules/authorization/auth.route'));
app.use('/api/v1', require('./modules/users/users.route'));

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res) => {
  res.status(response.notFound.status).json({
    message: response.notFound.EN.message,
  });
});

/**
 * Error handler
 */
app.use(errorHandler());

/** Get ip */
app.use(requestIp.mw());

module.exports = app;
