//
// TODO APP - mongoose db config
//

// load mongoose
var mongoose = require('mongoose');

// tell mongoose to use promise library
mongoose.Promise = global.Promise;
// connect to db
mongoose.connect('mongodb://localhost:27017/TodoApp');

// export mongoose
module.exports = { mongoose };