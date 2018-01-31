//
// TODO APP - users model
//

// load in mongoose
const mongoose = require('mongoose');
const validator = require('validator');

// implement user schema to be able to use methods on models
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// user model
var User = mongoose.model('User', UserSchema);

// export model
module.exports = {User};