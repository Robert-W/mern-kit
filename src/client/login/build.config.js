/**
* @name exports
* @static
* @summary Build configurations for user modules
*/
module.exports = {
  webpack: {
    alias: {
      login: 'client/login'
    },
    entry: {
      login: 'client/login/index.js'
    }
  },
  build: {
    criticalStyle: 'login/css/login.scss',
    prerender: {
      'login-component': 'login/js/components/Login.js'
    }
  }
};
