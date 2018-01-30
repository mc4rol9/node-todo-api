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
        type: String,
        required: true,
        minlength: 1,
        trim: true //remove blank space
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// // create a new instance
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// // add a new model instance to db
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });

var otherTodo = new Todo({
    text: 'Feed the cat',
    completed: true,
    completedAt: 123
});

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to save', e);
});