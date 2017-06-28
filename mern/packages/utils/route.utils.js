const { ERROR_MESSAGES } = require('resources/strings');
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
  const code = '403';
  const text = ERROR_MESSAGES[code];
  res.status(code).render(code, {
    title: text.title,
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
  const code = '404';
  const text = ERROR_MESSAGES[code];
  res.status(code).render(code, {
    title: text.title,
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
  const code = '500';
  const text = ERROR_MESSAGES[code];
  res.status(code).render(code, {
    title: text.title,
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
