//
// TODO APP - seed db with dummy documents
//

// load in modules
const {ObjectID} = require('mongodb');

// load in project files
const {Todo} = require('./../../models/todo');

// dummy todos for testing
const todos = [{
    _id: new ObjectID(),
    text: 'Test 1'
}, {
    _id: new ObjectID(),
    text: 'Test 2',
    completed: true,
    completedAt: 333
}];

const populateTodos = ((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

// export
module.exports = { todos, populateTodos};