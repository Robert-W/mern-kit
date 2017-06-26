const { renderToString } = require('react-dom/server');
const { compiledAssets } = require('config/config');
const { createElement } = require('react');

const getComponentMarkup = name => {
  // Get the markup from our component
  return compiledAssets.js[name]
    ? renderToString(createElement(compiledAssets.js[name].default))
    : '';
};

/**
* @function render403Error
* @summary Render the 403 Error status page
* @param {Response} res - Express response object
*/
function render403Error (res) {
  res.status(403).render('403', {
    status: 404,
    type: 'not-found',
    title: 'Forbidden',
    message: 'Ah ah ah! You didn\'t say the magic word.',
    // Assets
    critical: compiledAssets.css['status/css/status.scss'],
    common: compiledAssets.js.common,
    statusjs: compiledAssets.js.status,
    markup: getComponentMarkup('status-component')
  });
}

/**
* @function render404Error
* @summary Render the 404 Error status page
* @param {Response} res - Express response object
*/
function render404Error (res) {
  res.status(404).render('404', {
    status: 404,
    type: 'not-found',
    title: 'Page not found',
    message: 'We\'re sorry, the page you are looking for was not found.  Please check the url is correct.',
    // Assets
    critical: compiledAssets.css['status/css/status.scss'],
    common: compiledAssets.js.common,
    statusjs: compiledAssets.js.status,
    markup: getComponentMarkup('status-component')
  });
}

/**
* @function render500Error
* @summary Render the 500 Error status page
* @param {Response} res - Express response object
*/
function render500Error (res) {
  res.status(500).render('500', {
    status: 500,
    type: 'server-error',
    title: 'Internal Server Error',
    message: 'We\'re sorry, there was an unexpected server error, please contact customer support.',
    // Assets
    critical: compiledAssets.css['status/css/status.scss'],
    common: compiledAssets.js.common,
    statusjs: compiledAssets.js.status,
    markup: getComponentMarkup('status-component')
  });
}

/**
* @function ensureAuthenticated
* @summary middleware to ensure the user is authenticated
* @param {Request} req - Express request object
* @param {Response} res - Express response object
* @param {Function} next - Next middleware
*/
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  render403Error(res);
}

module.exports = {
  ensureAuthenticated,
  render404Error,
  render403Error,
  render500Error
};
