const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middlware', () => {
  let joe;
  let blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  // it('model instance remove', (done) => {
  //   joe.remove()
  //     .then(() => User.findOne({ name: 'Joe' }))
  //     .then((user) => {
  //       console.log(user);
  //       assert(user === null);
  //       done();
  //     });
  // });

  it('users clean up dangling blogposts on remove', (done) => {

    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        console.log(BlogPost);
        assert(count === 0);
        done();
      });
  });
});
