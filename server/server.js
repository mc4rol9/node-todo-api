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
app.post('/todos', authenticate, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id // authenticate
    });

    try {
        const doc = await todo.save();
        res.send(doc);
    } catch(e) {
        res.status(400).send(e);
    }
});

// list all the todos
app.get('/todos', authenticate, async (req, res) => {
    try {
        const todos = await Todo.find({
            // only fetch todo for specific user
            _creator: req.user._id
        });

        res.send({todos});
    } catch(e) {
        res.status(400).send(e);
    }
});

// get todo by id
// fetch variable passed from url with :id - dynamic
app.get('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    try{
        const todo = await Todo.findOne({
            _id: id,
            _creator: req.user._id
        });

        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    } catch(e) {
        res.status(400).send();
    }
});

// delete todos
app.delete('/todos/:id', authenticate, async (req,res) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
        
    try {
        // await promise
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        });

        if (!todo) {
            return res.status(404).send();
        }
        // send todo
        res.send({todo});
    } catch(e) {
        res.status(400).send();
    }
});

// update todos
app.patch('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    // to get text and completed properties from body
    // that is what users can change
    const body = _.pick(req.body, ['text', 'completed']);

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

    try {
        // query to update the db
        const todo = await Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, {$set: body}, {new: true});

        if(!todo) {
            return res.status(404).send();
        }
    
        res.send({todo});
    } catch(e) {
        res.status(400).send();
    }
});

// routes/endpoint for users
// create new user
app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        // await promises
        await user.save();
        const token = await user.generateAuthToken();
        // send user returned with token
        res.header('x-auth', token).send(user); 
    } catch(e) {
        res.status(400).send(e);
    }
});

// return specific user as a private route using authenticate middleware
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// login route
app.post('/users/login', async (req,res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        // await promises
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        // send user returned with token
        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send();
    }
});

// logout private route
app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch(e) {
        res.status(400).send();
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// export app for testing
module.exports = {app};