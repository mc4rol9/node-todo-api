//
// TODO APP - ROOT FILE
//

// load in libraries
var express = require('express');
var bodyParser = require('body-parser');

// import/load in project files
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// setup app
var app = express();

app.listen(3000, () => {
    console.log('Started n port 3000');
});