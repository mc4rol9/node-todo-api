// 
// TODO APP - todo model
//

// load in mongoose
var mongoose = require('mongoose');

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
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }
});

    // // create a new instance for testing
    // var otherTodo = new Todo({
    //     text: 'Feed the cat',
    //     completed: true,
    //     completedAt: 123
    // });

    // otherTodo.save().then((doc) => {
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }, (e) => {
    //     console.log('Unable to save', e);
    // });

// export model
module.exports = {Todo};