//
// TODO APP - ROOT FILE
//

// load in libraries
var express = require('express');
var bodyParser = require('body-parser');

// import/load in project files
var {mongoose} = require('../db/mongoose');
var {Todo} = require('../models/todo');
var {User} = require('../models/user');

// setup app
var app = express();

// middleware
app.use(bodyParser.json());

// routes/endpoint
// create todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started n port 3000');
});

// export app for testing
module.exports = {app};