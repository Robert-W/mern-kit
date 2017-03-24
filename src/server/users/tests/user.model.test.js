/* eslint no-unused-expressions:0 */
const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const mock = {
  john: {
    firstName: 'John',
    lastName: 'Doe',
    username: 'jdoe',
    password: 'JD0eP@ss',
    email: 'jdoe@gmail.com'
  },
  jane: {
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janey',
    password: '12JaneyP@ss',
    email: 'janey@gmail.com'
  }
};

let user1, user2, user3;

/**
* Create users for each describe block
* @param {Function} done
*/
const createUsers = done => {
  User.remove().exec(() => {
    user1 = new User(mock.john);
    user2 = new User(mock.jane);
    user3 = new User(mock.john);
    done();
  });
};

/**
* Remove all users after each describe block
*/
const removeUsers = () => {
  User.remove().exec();
};

// Mocha Tests
describe('User Model Unit Tests:', () => {

  describe('Method Save', () => {

    before(createUsers);

    it('should start with an empty collection', done => {
      User.find().exec((err, users) => {
        expect(users).to.have.length(0);
        done();
      });
    });

    it('should allow john to save without issues', done => {
      user1.save(err => {
        expect(err).to.not.exist;
        done();
      });
    });

    it('should now contain a single user', done => {
      User.find().exec((err, users) => {
        expect(users).to.have.length(1);
        done();
      });
    });

    it('should allow a different user to save without issues', done => {
      user2.save(err => {
        expect(err).to.not.exist;
        done();
      });
    });

    it('should now contain two users', done => {
      User.find().exec((err, users) => {
        expect(users).to.have.length(2);
        done();
      });
    });

    it('should prevent saving a user with the same username', done => {
      user3.save(err => {
        expect(err).to.exist;
        done();
      });
    });

    it('should prevent saving without a firstName', done => {
      user1.firstName = '';
      user1.save(err => {
        expect(err).to.exist;
        done();
      });
    });

    it('should prevent saving without a lastName', done => {
      user1.firstName = 'John';
      user1.lastName = '';
      user1.save(err => {
        expect(err).to.exist;
        done();
      });
    });

    it('should prevent saving without a valid password', done => {
      user1.lastName = 'Doe';
      user1.password = 'jdoepass';
      user1.save(err => {
        expect(err).to.exist;
        done();
      });
    });

    it('should prevent saving without a valid email', done => {
      user1.password = 'JD0eP@ss';
      user1.email = 'jdoe@gmail';
      user1.save(err => {
        expect(err).to.exist;
        done();
      });
    });

    after(removeUsers);

  });

  describe('Method Authenticate', () => {

    before(createUsers);

    it('should authenticate when given the correct password', done => {
      user1.save(err => {
        expect(err).to.not.exist;
        expect(user1.authenticate('JD0eP@ss')).to.be.true;
        done();
      });
    });

    it('should not authenticate when given an incorrect password', done => {
      user2.save(err => {
        expect(err).to.not.exist;
        expect(user2.authenticate('bogusPassword')).to.be.false;
        done();
      });
    });

    after(removeUsers);

  });

});
