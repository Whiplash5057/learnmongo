const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User(
      {
        name: 'Joe',
      }
    );
    joe.save()
    .then(() => { done(); });
  });

  it('find all users with the name joe!', (done) => {
    User.find('Joe')
      .then((users) => {
        // console.log(users);
        assert(users[0]._id.toString() == joe._id.toString());
        done();
      });
  });

  it('find a user with a perticular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        // console.log(user.name);
        assert(user.name == 'Joe');
        done();
      });
  });
});
