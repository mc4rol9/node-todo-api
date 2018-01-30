//
// TODO APP - mongoose db config
//

// load mongoose
var mongoose = require('mongoose');

// tell mongoose to use promise library
mongoose.Promise = global.Promise;
// connect to db on server
mongoose.connect(process.env.MONGODB_URI);

// export mongoose
module.exports = { mongoose };