Mern-Kit
========
mern-kit is designed to be a starter kit which provides everything needed in a full stack application using Mongoose (MongoDB), Express, React, and Node, all running inside a docker container.

## STATUS
* Documentation - In Progress
* MVP (Minimum Viable product) - In Progress
* Mocha Tests - In Progress
* Jest Tests - Coming soon

## Getting started
1. Make sure you have the latest version of [Docker](https://www.docker.com/products/docker) installed. Docker for Mac and Windows comes with the latest docker-compose. For linux, you may need to install it manually and you will need >= version 1.13.0.
2. Copy `secrets/local.secrets.example` to `secrets/local.secrets` and fill in the appropriate fields.
3. Run the start command, `docker-compose up`.
4. Open `localhost:3000`.

## Architecture

The architecture got it's inspiration from a project I worked on that is service oriented. Each folder in src contains all the routes, models, controllers, components, scripts, templates, and configurations necessary for it to integrate with the application. A 'service' folder structure looks like the following:

```
sample
  |- README.md
  |- client
    |- components
    |- css
    |- sample.js
    |- webpack.config.js
  |- server
    |- controllers
    |- routes
    |- models
  |- script
    |- sample.database.js
  |- tests
    |- mocha
    |- jest
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
docker-compose exec web npm test -- -u
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
This command can be used to drop your mongoose collections. It will iterate over all the scripts in the `<service>/script/` directories. If the scripts have a `dropCollection` export it will be invoked. You can see an example in the [src/app/users/script/users.database.js](./src/app/users/script/users.database.js) file.
```
docker-compose exec web npm run drop
```

### Populate collections
This command can be used to populate your mongoose collections. It will iterate over all the scripts in the `<service>/script/` directories. If the scripts have a `populateCollection` export it will be invoked. You can see an example in the [src/app/users/script/users.database.js](./src/app/users/script/users.database.js) file.
```
docker-compose exec web npm run populate
```

## Tooling

### CSS - SCSS
### ES6 - Babel
### Webpack
### Jest - Enzyme

## Example Service

## Contributing
Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) if interested in contributing.

## Troubleshooting
If you have questions specific to Docker, Mongo, Node, React, Webpack, or Redux. Check Stack Overflow or consider posting your question there since Stack Overflow has a lot of support already available for those topics. If you have questions on how any of those are used in this repo, don't hesitate to ask in the issues section. If you think you are experiencing a bug, please copy the [ISSUE_TEMPLATE.md](./ISSUE_TEMPLATE.md) and create an issue.

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

## License
Mern-Kit is [MIT licensed](./LICENSE)
