//
// TODO APP - ROOT FILE
//

// load libraries
var mongoose = require('mongoose');

// tell mongoose to use promise library
mongoose.Promise = global.Promise;
// connect to db
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create model
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// create a new instance
var newTodo = new Todo({
    text: 'Cook dinner'
});

// add a new model instance to db
newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log('Unable to save todo')
});