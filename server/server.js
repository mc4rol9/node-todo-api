//
// TODO APP - ROOT FILE
//

// load config file
require('./config/config');

// load in libraries
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

// import/load in project files
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

// setup app
var app = express();
// setup port from server or local 3000
const port = process.env.PORT;

// middleware
app.use(bodyParser.json());

// routes/endpoint for todos
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

// list all the todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// get todo by id
// fetch variable passed from url with :id - dynamic
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// delete todos
app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// update todos
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // to get text and completed properties from body
    // that is what users can change
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    // check if completed is boolean and True
    if (_.isBoolean(body.completed) && body.completed) {
        // add time to completedAt
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // query to update the db
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// routes/endpoint for users
// create new user
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        // call the generate auth token method from user model
        return user.generateAuthToken();
    }).then((token) => {
        // customize a header with x-
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

// return specific user as a private route using authenticate middleware
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// login route
app.post('/users/login', (req,res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// export app for testing
module.exports = {app};