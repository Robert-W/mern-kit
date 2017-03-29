const webpackUtils = require('../utils/webpack.utils');
const methodOverride = require('method-override');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const passport = require('passport');
const logger = require('./winston');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const config = require(path.resolve('./config/config'));
const MongoStore = require('connect-mongo')(session);

/**
* @function configureMiddleware
* @summary Configure express middleware
* @param {Express.app} app
*/
const configureMiddleware = app => {
  // Enable stack traces
  app.set('showStackError', true);
  // Enable jsonp via res.jsonp
  app.enable('jsonp callback');
  // Use before static routes applied
  app.use(compression({ level: 9 }));
  // Setup favicon
  app.use(favicon('./server/core/favicon.ico'));
  // Setup body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Setup methodOverride so I can use put and delete
  app.use(methodOverride());
  // If were in development mode, add some webpack middleware
  if (process.env.NODE_ENV === 'development') {
    const middleware = webpackUtils.middleware();
    app.use(middleware.dev);
    app.use(middleware.hot);
  }
};

/**
* @function configureLocalVariables
* @summary Configure local variables
* @param {Express.app} app
*/
const configureLocalVariables = app => {
  app.locals.title = config.app.title;
  app.locals.author = config.app.author;
  app.locals.keywords = config.app.keywords;
  app.locals.description = config.app.description;
};

/**
* @function configureViewEngine
* @summary Configure view engine
* @param {Express.app} app
*/
const configureViewEngine = app => {
  // Set the engine and the view paths
  app.set('view engine', 'pug');
  app.set('views', config.files.views);
};

/**
* @function configureSession
* @summary Configure express session
* @param {Express.app} app
*/
const configureSession = (app, connection) => {
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.auth.secret,
    cookie: config.auth.cookie,
    store: new MongoStore({
      mongooseConnection: connection,
      collection: config.auth.collection
    })
  }));
};

/**
* @function configurePassport
* @summary Configure passport authentication
* @param {Express.app} app
*/
const configurePassport = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Init my passport lib
  require(path.resolve('./config/lib/passport')).initialize();
};

/**
* @function setHelmetHeaders
* @summary Configure hemlet to secure express headers
* @param {Express.app} app
*/
const configureHelmetHeaders = app => {
  /**
  * Default middleware used is:
  * dnsPrefetchControl - controls browser DNS prefetching
  * frameguard - to prevent clickjacking
  * hidePoweredBy - to remove the X-Powered-By header
  * hsts - for HTTP Strict Transport Security
  * ieNoOpen - sets X-Download-Options for IE8+
  * noSniff - to keep clients from sniffing the MIME type
  * xssFilter - adds some small XSS protections
  */
  app.use(helmet({
    hsts: false // off until https us working
  }));
  /**
  * TODO: Add content security policy configuration via helmet.contentSecurityPolicy({ ... })
  * @see https://github.com/helmetjs/helmet
  */
};

/**
* @function configureStaticAssetPath
* @summary Configure static assets
* @param {Express.app} app
*/
const configureStaticAssetPath = app => {
  app.use(express.static('public'));
};

/**
* @function configureServerRoutes
* @summary Configure valid express server routes
* @param {Express.app} app
*/
const configureServerRoutes = app => {
  config.files.routes.forEach(route => require(path.resolve(route))(app));
};

/**
* @function configureErrorRoutes
* @summary Configure 500 and 404 error routes
* @param {Express.app} app
*/
const configureErrorRoutes = app => {
  app.use((err, req, res, next) => {
    if (!err) { return next(); }
    // Log the error and respond with 500
    logger.error('Unexpected server error', err.stack);
    res.status(500).render('500', { status: 500, type: 'server-error', message: 'Unexpected server error' });
  });
  // Nothing has responded so this is assumed to be a 404 error
  app.use((req, res) => {
    logger.error('The requested resource was not found', req.path);
    res.status(404).render('404', { status: 404, type: 'not-found', message: 'The requested resource was not found' });
  });
};

/**
* @function generateProductionAssets
* @summary Generate production assets that routes will need to know about to serve js, and css
* @return {Promise}
*/
const generateProductionAssets = () => new Promise((resolve, reject) => {
  // Middleware takes care of this in development, only need to run this for production
  if (process.env.NODE_ENV !== 'production') {
    resolve();
  } else {
    webpackUtils.compileProductionAssets().then(resolve, reject);
  }
});

/**
* @name initialize
* @static
* @summary Initialize express
* @param {Object} connection - Mongoose connection
* @return {Promise}
*/
module.exports.initialize = connection => new Promise((resolve, reject) => {
  logger.info('Initializing express');
  try {
    const app = express();
    // Configure middleware
    configureMiddleware(app);
    // Configure locals
    configureLocalVariables(app);
    // Configure view engine (pug)
    configureViewEngine(app);
    // Configure sessions with MongoStore
    configureSession(app, connection);
    // Configure passport
    configurePassport(app);
    // Configure Hemlet security headers
    configureHelmetHeaders(app);
    // Set path for static assets
    configureStaticAssetPath(app);
    // Configure the server routes
    configureServerRoutes(app);
    // Configure the error routes
    configureErrorRoutes(app);
    // Generate production assets if necessary
    generateProductionAssets().then(() => {
      resolve(app);
    }, err => {
      logger.error('Error compiling production assets', err);
      reject(err);
    });
  } catch (err) {
    logger.error('Error initializing express', err);
    reject(err);
  }
});
