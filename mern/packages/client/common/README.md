## Adding Test's
The tests for the components in this module are in the tests directory. You can place a test directory in the root of any client folder and mern-kit will automatically find them and run them when you run `docker-compose run mern npm test`.


### Example tests
I have added two simple and testable components. They are not used outside of tests but are useful to help demonstrate how to write tests for your own components.

* `header.component.test.js` uses snapshot testing. Anytime you update components using snapshot testing, you need to update the snapshots by running `docker-compose run mern npm run jest -- -u`.

* `modalwrapper.component.test.js` uses Jest and Enzyme to shallow render your component, check it's contents, simulate events, and verify updates have been rendered. You can use this to get some ideas about how to do component testing with Jest and Enzyme.
