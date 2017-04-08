/**
* @name exports
* @static
* @summary Build configurations for user modules
*/
module.exports = {
  webpack: {
    alias: {
      login: 'packages/client/login'
    },
    entry: {
      login: 'packages/client/login/index.js'
    }
  },
  build: {
    criticalStyle: 'login/css/login.scss',
    prerender: {
      'login-component': 'login/components/Login.js'
    }
  }
};
