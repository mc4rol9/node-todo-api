//
// TODO APP - mongoose db config
//

// load mongoose
var mongoose = require('mongoose');

// tell mongoose to use promise library
mongoose.Promise = global.Promise;
// connect to db on server or local
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

// export mongoose
module.exports = { mongoose };