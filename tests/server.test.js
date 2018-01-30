//
// TODO APP - server test file
//

// load in modules
const expect = require('expect');
const request = require('supertest');

// load in project files
const {app} = require('../server');
const {Todo} = require('../models/todo');