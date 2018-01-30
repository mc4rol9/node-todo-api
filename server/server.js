//
// TODO APP - ROOT FILE
//

// load in libraries
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

// import/load in project files
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// setup app
var app = express();
// setup port from server or local 3000
const port = process.env.PORT || 3000;

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
        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// export app for testing
module.exports = {app};