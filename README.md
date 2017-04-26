Mern-kit [![Build Status](https://travis-ci.org/Robert-W/mern-kit.svg?branch=master)](https://travis-ci.org/Robert-W/mern-kit)
========
Mern-kit is designed to be a starter kit which provides everything needed in a full stack application using Mongoose (MongoDB), Express, React, and Node, all running inside a docker container. Having a basic understanding of each of these technologies is not a requirement, but would be very helpful.

## Getting started
1. Install the latest version of [Docker](https://www.docker.com/products/docker). Some systems may need to install docker-compose manually.
2. Copy `secrets/local.secrets.example` to `secrets/local.secrets` and fill in the appropriate fields.
3. Run `docker-compose up`.
4. Open `localhost:3000`.
5. (Optional) You can run `docker-compose exec mern npm run populate` to populate your mongoose collections with some defaults. Keep in mind, any users populated this way must meet the applications minimum password requirements which are defined in the [default environment file](./mern/packages/env/default.js).

## Production
Running this with NODE_ENV set to 'production' will enable a couple of optimizations for you. It enables the [criticalStyle](#criticalStyle) and [prerender](#prerender) options, and also runs without Nodemon. For the prerender, it compiles your components ahead of time and saves them in the `config.compiledAssets` object. This negates the need for babel-node or babel/register entirely. You still need to call `renderToString` in the server controller, but this allows you to add props to it before rendering and passing it to the client affording you some flexibility.

## Architecture
The `docker-compose.yml` will spin up two containers, one for mongo and one for mern. The mern service has the following architecture (sample client and server package included):
```shell
|- scripts # build scripts, database scripts, test scripts
|- packages
  |- __mocks__ # mock modules for jest
  |- strategies # passport strategies
  |- config # main configuration for build tools and server code
  |- utils # various utilities
  |- env # environment specific configurations
  |- lib # libraries for this app, including mongoose, express, winston, and passport wrappers
  |- server
    # Sample Users Module, if you need controllers, models, views for mongoose, use this architecture
    # If your making a GraphQL endpoint, you will still need routes and tests but may have other
    # folders such as schemas, resolvers, and queries
    |- users
      |- controllers
      |- models
      |- routes
      |- views
      |- tests
  |- client
    # Sample Login Module
    |- login
			# Add any other folders you need here, try to keep the nesting to a minimum
      |- css # For sass
      |- components # All React Components
      |- index.js # Optional entry for this particular module
      |- build.config.js # Optional configurations for this module
```
> See [Client Config](#client-config) for supported configurations

### Absolute Paths
This repo uses absolute paths for all modules in the `packages` folder. This is done by setting NODE_PATH to the `packages` directory inside the docker container. This negates the need to use relative path's throughout the project. For example, instead of using `require('../../utils/webpack.utils')`, you can just use `require('utils/webpack.utils')`.

## Commands
Docker commands generally follow this syntax:
```
docker-compose [options] [command] [args]
```
See [compose reference](https://docs.docker.com/compose/reference/overview/) for a complete list of available options and commands. You can specify which service and commands specific to the service in args. Something like `web npm start` would run `npm start` on the web service.

### Start
Start your container and all necessary services. If you modify the `package.json` or need to rebuild, run the Re-build command.
```
docker-compose up
```

### Re-build
Start and rebuild the containers, this will re-install all your node modules.
```
docker-compose up --build
```

### Test
You have multiple options for running your tests and the commands differ slightly based on the conditions.

If the container is running
```
docker-compose exec mern npm test
```

If the container is not running
```
docker-compose run mern npm test
```
> Note: `exec` in the previous commands runs the provided command in an already running container for the specified service. So `docker-compose exec mern npm test` runs `npm test` inside the 'mern' container. `run` is a one-off command.

If you need to regenerate jest snapshots
```
docker-compose run mern npm run jest -- -u
-- or --
docker-compose run mern npm test -- -- -u
```

If you want to run eslint
```
docker-compose exec mern npm run lint
```

If you want to run only Mocha
```
docker-compose run mern npm run mocha
```

### Connect to Mongo
Again, use `exec` if the mongo container is running and `run` if it's not. This will give you shell access to mongo and you can run all of your favorite [mongo shell commands](https://docs.mongodb.com/manual/reference/mongo-shell/).
```
docker-compose exec mongo mongo
```

### Drop collections
This command can be used to drop your mongoose collections. It will iterate over all the scripts in the `mern/packages/server/<service>/scripts/` directories. If the scripts have a `dropCollection` export it will be invoked. You can see an example in the [User database script](./mern/packages/server/users/script/users.database.js) file.
```
docker-compose exec mern npm run drop
```

### Populate collections
This command can be used to populate your mongoose collections. It will iterate over all the scripts in the `mern/packages/server/<service>/scripts/` directories. If the scripts have a `populateCollection` export it will be invoked. You can see an example in the [mern/packages/server/users/script/users.database.js](./mern/packages/server/users/script/users.database.js) file.
```
docker-compose exec mern npm run populate
```

## Customization
There are several configurations you can leverage to increase your productivity or the overall performance of the application. Each one is explained below.

### Environments
There are four different environment files setup under `packages/env`. The [config file](./mern/packages/config/config.js) loads the default env file and another that matches your NODE_ENV and merges them together. So if NODE_ENV is development, config will merge `mern/packages/env/default.js` and `mern/packages/env/development.js`. You can setup your own environments by adding an environment file and setting NODE_ENV to that environment (if you set your environment to `staging` and don't add a `staging.js` environment file, it will throw an error saying it could not find a configuration file matching your NODE_ENV. You **MUST** add an environment file to match your NODE_ENV). Environment configs contain the following:
* Mongo connection information
* Password requirements
* Webpack config
* Authentication strategies
* Default variables and locals
* anything else you want to add

### Client Config
> Performance should never be an after thought, it is recommended for every page to setup a `criticalStyle` for above the fold content and a `prerender` component.

Each client folder can contain a custom build configuration file for setting up webpack aliases, webpack entries, server rendering, and inlining css into html files. All are optional and are defined in a `build.config.js` with the following format:

```javascript
module.exports = {
  webpack: {
    alias: {
      [key:String]: String // Ex. login: 'packages/client/login'
    },
    entry: {
      [key:String]: String // Ex. login: 'packages/client/login/index.js'
    }
  },
  build: {
    criticalStyle: String, // Ex. login/css/critical.scss
    // prerender should use the same format as entry
    prerender: {
      [key:String]: String // Ex. 'login-component': 'login/components/Login.js'
    }
  }
};
```

#### alias
Configure an alias so you do not need to load modules with a relative path. This is expecially useful when sharing components across services.

#### entry
Add an entry for your webpack.config. The path to the compiled asset is stored in the [config file](./mern/packages/config/config.js) as `config.compiledAssets.js[name]`. You can add this to your server controllers so they get loaded in your pug templates. See the [login controller](./mern/packages/server/users/controllers/login.controller.js) for an example. Mern-kit does use the CommonsChunkPlugin so don't forgot to load the common chunk as well(config.compiledAssets.js.common).

#### criticalStyle
Add the path to a style sheet that contains your applications critical styles (css necessary to render above the fold content). The critical css needs to be imported into your JS code so ExtractTextPlugin can pull it out and apply all the transformations to it. It's also saved in the [config file](./mern/packages/config/config.js) as `config.compiledAssets.css[criticalStyle]`. You can then inject this into your pug template to prevent the flash of un-styled content when doing server rendering. Below is a walkthrough of how to set it up.
```javascript
// 1. Import the scss file you want in your component
// App.js
import 'path/to/critical.scss';
// 2. Add a build configuration that specifies the file you want to pull out of the JS bundle
// build.config.js
module.exports = {
  build: {
    criticalStyle: 'path/to/critical.scss'
  }
}
// 3. Add the compiled source to your locals in your router.
// config.compiledAssets.css['path/to/critical.scss'] is the actual compiled css as a string
// Route Controller for the html page that renders App.js
const { compiledAssets } = require('config/config');

exports.login = (req, res) => {
  res.render('index', {
    // This matches the criticalStyle value provided in Step 2
    criticalCSS: compiledAssets.css['path/to/critical.scss']
  });
};
// 4. Append the content to a style tag in your Pug template, if the value criticalCSS is empty
// then you just get an empty style tag on the page
// index.pug
extends ../../core/views/layout.pug
block head
  style.
    #{criticalCSS}
```

#### prerender
If you are going to use server rendering, it is recommended that you also inject some styles with the above `criticalStyle` configuration. The `prerender` option works by compiling the configured components ahead of time and saving the required component in `config.compiledAssets.js[prerender]`. You can then render it to a string and pass the markup to a pug template. Here is a walkthrough of how to set this up.
```javascript
// 1. In your build.config.js, add your component with a unique name (name must be unique)
module.exports = {
  build: {
    prerender: {
      'login-component': 'login/js/components/Login.js'
    }
  }
}
// 2. In your route controller on the server side render your component to a string and add it to your locals
const { renderToString } = require('react-dom/server');
const { compiledAssets } = require('config/config');
const { createElement } = require('react');
// At the login route
exports.login = (req, res) => {
  // Default is the default export and is a function, you can pass props in here
  // See mern/packages/server/users/controllers/login.controller.js for an example
  const markup = compiledAssets.js['login-component']
    ? renderToString(createElement(compiledAssets.js['login-component'].default))
    : '';

  res.render('login', {
    markup: markup,
  });
};
// 3. Let Pug render it for you, you can have this code in place
extends ../../core/views/layout.pug
block head
  script(src=common)
block content
  div#mount // Add the markup inside whichever component you are mounting to
    != markup
```

### Webpack Config
There are a couple different places to add webpack configurations. The [`mern/packages/config/webpack.config.js`](./mern/packages/config/webpack.config.js) exports a function that you can use to generate a webpack config. The config file will include whatever webpack config you specify in your environment file and then add any extras from all of the build.config.js files in the client folders.

### Testing Config
Server side testing uses Mocha while client side testing uses Jest + Enzyme. Testing will use globs configured in the assets.js file to find all tests to execute.

#### Mocha
Mocha does not have many configurations, but since testing is done in Docker you can test your mongoose models, your apis, controllers, etc. The configuration for Mocha is in the [mocha test script](./mern/scripts/mocha.js) which test's every file found by the following pattern, `packages/server/*/tests/**/*.js`. To run your Mocha tests, see [Test](#test).

#### Jest
There is a [`jest.config.json`](./mern/packages/config/jest.config.json) file you can use to add some Jest configurations. Since you have the option to configure aliases for webpack, the `mern/scripts/prepare-jest.js` will generate a moduleNameMapper based on those aliases and will generate the testMatch with the pattern `<rootDir>/packages/client/*/tests/**/*.js` for you automatically when you run Jest. To run your Jest tests or update the snapshots, see [Test](#test).

### Other
Mern-kit uses `.babelrc` and `.eslintrc` for those services.  Feel free to edit as you wish to add/remove features or change the linting rules.

## Docker Tips
Docker can take up some space quickly, and when errors happen, you sometimes get stuck with intermediate containers not being destroyed. Here are a couple of commands to help you see whats going on and clean up your machine.

### Inspecting
- **View running containers** - `docker ps` or `docker-compose ps`
- **View all containers** - `docker ps -a`
- **View all images** - `docker images`
- **View all volumes** - `docker volume ls`

### Cleanup
- **Remove a container** - `docker rm <CONTAINER_ID>`
- **Remove a image** - `docker rmi <IMAGE_ID>`
- **Remove a volume** - `docker volume rm <VOLUME>`
- **Remove all containers** - `docker rm $(docker ps -aq)`
- **Remove all hanging images** - `docker rmi $(docker images -q -f "dangling=true")`
- **Remove all hanging volumes** - `docker volume rm $(docker volume ls -qf "dangling=true")`

## Contributing
Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) if interested in contributing.

## Troubleshooting
If you have questions specific to Docker, Mongo, Node, React, Webpack, or Redux. Consider posting your question on Stack Overflow, they have a lot of support already available for those topics. If you have questions on how any of those are used in this repo, don't hesitate to ask in the issues section. If you think you are experiencing a bug, please copy the [ISSUE_TEMPLATE.md](./ISSUE_TEMPLATE.md) and create an issue.

## License
Mern-kit is [MIT licensed](./LICENSE)
