//
// TODO APP - seed db with dummy documents
//

// load in modules
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

// load in project files
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

// dummy users array
// user 2 won't have the token
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'user1@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'user2@example.com',
    password: 'userTwoPass'
}];

// dummy todos for testing
const todos = [{
    _id: new ObjectID(),
    text: 'Test 1',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Test 2',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    // first, remove all from db
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

// export
module.exports = { todos, populateTodos, users, populateUsers};