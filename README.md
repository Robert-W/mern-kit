Mern-Kit [![Build Status](https://travis-ci.org/Robert-W/mern-kit.svg?branch=master)](https://travis-ci.org/Robert-W/mern-kit)
========
mern-kit is designed to be a starter kit which provides everything needed in a full stack application using Mongoose (MongoDB), Express, React, and Node, all running inside a docker container.

## Getting started
1. Make sure you have the latest version of [Docker](https://www.docker.com/products/docker) installed. Docker for Mac and Windows comes with the latest docker-compose. For linux, you may need to install docker-compose manually.
2. Copy `secrets/local.secrets.example` to `secrets/local.secrets` and fill in the appropriate fields.
3. Run the start command, `docker-compose up`.
4. Open `localhost:3000`.
5. (Optional) You can run `docker-compose exec web npm run populate` to populate your mongoose collections with some defaults. Keep in mind, any users populated this way must meet the applications minimum password requirements which are defined in the default environment file, [`src/config/env/default.js`](./src/config/env/default.js).

## Architecture
The architecture should be fairly straight-forward. There are three main folders, `client`, `server`, and `config`. `config` contains all the main configurations, scripts, environment settings, strategies, and some utilities. `client` contains components, css, tests, webpack.config.js, and a root index.js entry file. `server` contains any server related code and test, such as models, routes, controllers, views, scripts, tests, schemas (for graphql), and anything else needed.  Below is an example of what the base architecture with a `sample` service looks like.

```
config
  |- env
  |- lib
  |- scripts
  |- strategies
  |- assets.js
  |- config.js
  |- utilities.js
  |- jest.config.js
  |- webpack.config.js
client
  |- sample
    |- components
    |- css
    |- index.js
    |- build.config.js
server
  |- sample
    |- controllers
    |- models
    |- routes
    |- scripts
    |- tests
    |- views
      |- index.pug
```

## Commands
Docker commands generally follow this syntax:
```
docker-compose [options] [command] [args]
```
See [compose reference](https://docs.docker.com/compose/reference/overview/) for a complete list of available options and commands. You can specify which service and commands specific to the service in args. Something like `web npm start` would run `npm start` on the web service.

### Start
Start your container and all necessary services. This will install everything it needs the first time but on subsequent builds will just start the services/containers. If you modify the `package.json` or need to rebuild, see 'Re-build' below.
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
docker-compose exec web npm test
```

If the container is not running
```
docker-compose run web npm test
```
> Note: `exec` in the previous commands runs the provided command in an already running container for the specified service. Example, `docker-compose exec web npm test` runs `npm test` inside the 'web' container. `run` is a one-off command.

If you need to regenerate jest snapshots
```
docker-compose run web npm run jest -- -u
```

If you want to run eslint
```
docker-compose exec web npm run lint
```

### Connect to Mongo
Again, use `exec` if the mongo container is running and `run` if it's not. This will give you shell access to mongo and you can run all of your favorite [mongo shell commands](https://docs.mongodb.com/manual/reference/mongo-shell/).
```
docker-compose exec mongo mongo
```

### Drop collections
This command can be used to drop your mongoose collections. It will iterate over all the scripts in the `server/<service>/scripts/` directories. If the scripts have a `dropCollection` export it will be invoked. You can see an example in the [src/server/users/scripts/users.database.js](./src/app/users/script/users.database.js) file.
```
docker-compose exec web npm run drop
```

### Populate collections
This command can be used to populate your mongoose collections. It will iterate over all the scripts in the `server/<service>/scripts/` directories. If the scripts have a `populateCollection` export it will be invoked. You can see an example in the [src/app/users/script/users.database.js](./src/app/users/script/users.database.js) file.
```
docker-compose exec web npm run populate
```

## Tooling
mern-kit has several tools already setup for your convenience. If you would like to change their default configurations, see the sections below.

### Webpack
mern-kit is using Webpack 2 for bundling, asset loading, and hot module replacement (coming soon) in development. Configurations are located in the various environment files.  Common config is in the `src/config/env/default.js` environment file, while development and production configs are in the `src/config/env/development.js` and `src/config/env/production.js` file, respectively. You can also configure aliases and entries inside your service folder.  For example, if you add a service called `sample`, you can add a `build.config.js` file in the client folder and add these options like so:
```
//- src/client/sample/build.config.js
module.exports = {
	// Add Webpack Config in here
	webpack: {
		alias: {
	    sample: 'client/sample'
	  },
	  entry: {
	    sample: 'client/sample/index.js'
	  }
	}
};
```

View the user's service for an example or see Client Build Config below.

### CSS - SCSS
mern-kit uses a scss loader so you can import scss files. It also has postcss loader setup with a loader options plugin that adds the autoprefixer. Feel free to add more configurations as necessary to the webpack config in the environment files (`src/config/env`). You can import a scss file like so:
```
//- This assumes you configured a 'users' alias
import 'users/css/app.scss';

//- You could also use relative paths
import '../css/app.scss';
```

### ES6 - Babel
mern-kit uses babel with the following presets and plugins, but you can always add more to the `.babelrc` if wanted.
```
{
  "presets": ["react", "es2015", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

It is set to apply this loader to all `.js` files, but if you would like to support `.jsx` files as well, just update the loader configuration for the webpack settings in `src/config/env/default.js`.

### Jest(with Enzyme) and Mocha
mern-kit will use globs to find all test files in each service directory. This way you can write tests for your specific service and let mern-kit worry about finding them and running them. For example, if you have a service called `sample`, you could add tests like so:
```
|- client
  |- sample
    |- tests // For component testing
      |- sample.component.test.js
|- server
  |- sample
    |- tests
      |- sample.model.test.js
      |- sample.controller.test.js
```

### Client Build Config
In each client service folder, you can provide some custom build configurations via a `build.config.js`. All are optional and they have the following format:
```javascript
module.exports = {
	webpack: {
		alias: {
			[key:String]: String // Ex. login: 'client/login'
		},
		entry: {
			[key:String]: String // Ex. login: 'client/login/index.js'
		}
	},
	build: {
		criticalStyle: String, // Ex. login/css/critical.scss
		rootComponent: String  // Ex. login/components/Login.js
	}
};
```

#### alias
Configure an alias so you do not need to load modules with a relative path. This is expecially useful when sharing components across services.

#### entry
Add an entry to webpack config. This will save the file path of the asset with the hash to `config.compiledAssets.js.[name].[hash].js`. You can add this to your server controllers so they get loaded in your pug templates. See [`src/server/users/controllers/login.controller.js`](./src/server/users/controllers/login.controller.js) for an example. You should also load the common module as well.

#### criticalStyle
Add path to critical style. You need to also import this style in one of your components. This will allow ExtractTextPlugin to pull it from the JS bundle and save it to `config.compiledAssets.css.[name]`. So `criticalStyle: 'login/css/login.scss'` would be save the source in `config.compiledAssets.css.login`. You can then inject this into your pug template to have critical css injected in the head to prevent the flash of unstyled content.

#### rootComponent
Coming Soon

## Contributing
Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) if interested in contributing.

## Troubleshooting
If you have questions specific to Docker, Mongo, Node, React, Webpack, or Redux. Consider posting your question on Stack Overflow, they have a lot of support already available for those topics. If you have questions on how any of those are used in this repo, don't hesitate to ask in the issues section. If you think you are experiencing a bug, please copy the [ISSUE_TEMPLATE.md](./ISSUE_TEMPLATE.md) and create an issue.

## Docker Tips
Docker can take up some space quickly, and when errors happen, you sometimes get stuck with intermediate containers not being destroyed. Here are a couple of commands to help you see whats going on and clean up your local machine.

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

## Outstanding Items
- Create/test some production deployment scripts
- See Open Issues, there are a few there that need to be completed (most are for production benefits)
- Add resources list to README

## License
Mern-Kit is [MIT licensed](./LICENSE)
