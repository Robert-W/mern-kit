/**
* @name exports
* @static
* @summary Build configurations for user modules
*/
module.exports = {
  webpack: {
    alias: {
      status: 'packages/client/status'
    },
    entry: {
      status: 'packages/client/status/index.js'
    }
  },
  build: {
    criticalStyle: 'status/css/status.scss',
    prerender: {
      'status-component': 'status/components/StatusPage.js'
    }
  }
};
