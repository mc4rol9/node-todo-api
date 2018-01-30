//
// TODO APP - ROOT FILE
//

// load libraries
var mongoose = require('mongoose');

// tell mongoose to use promise library
mongoose.Promise = global.Promise;
// connect to db
mongoose.connect('mongodb://localhost:27017/TodoApp');