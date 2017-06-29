const { ERROR_MESSAGES } = require('resources/strings');
const { renderToString } = require('react-dom/server');
const { compiledAssets } = require('config/config');
const { createElement } = require('react');

const renderStatusPage = (res, code) => {
  const text = ERROR_MESSAGES[code];
  const markup = compiledAssets.js['status-component']
    ? renderToString(createElement(compiledAssets.js['status-component'].default))
    : '';

  res.status(code).render(code, {
    title: text.title,
    critical: compiledAssets.css['status/css/status.scss'],
    common: compiledAssets.js.common,
    statusjs: compiledAssets.js.status,
    markup: markup
  });
};

/**
* @function render403Error
* @summary Render the 403 Error status page
* @param {Response} res - Express response object
*/
function render403Error (res) {
  renderStatusPage(res, '403');
}

/**
* @function render404Error
* @summary Render the 404 Error status page
* @param {Response} res - Express response object
*/
function render404Error (res) {
  renderStatusPage(res, '404');
}

/**
* @function render500Error
* @summary Render the 500 Error status page
* @param {Response} res - Express response object
*/
function render500Error (res) {
  renderStatusPage(res, '500');
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
