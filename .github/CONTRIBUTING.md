## Issues
Please copy the [ISSUE_TEMPLATE.md](ISSUE_TEMPLATE.md) and file an issue [here on github](https://github.com/Robert-W/mern-kit/issues).  Try to explain the current behavior, expected behavior, provide a reproducible case demonstrating your problem, and the versions of Docker, docker-compose, and your OS so I and/or others can provide assistance to you as best as possible.

## Pull Requests
If you would like to contribute, please try to adhere to the following guidelines.

1. Fork the repo and branch off of `master`.
2. Make sure you have [Docker and docker-compose](https://www.docker.com/products/docker) installed.
3. If your adding new code, add tests to cover them or at least demonstrate how to test the new feature.
4. Update documentation if applicable.
5. Ensure code passes tests (`docker-compose exec web npm test`).

## Coding style
Before you submit your pull request, please make sure the lint command passes (`docker-compose exec web npm run lint`). You can view the `.eslintrc` to see the enforced rules.
