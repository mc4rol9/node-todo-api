//
// TODO APP - users model
//

// load in mongoose
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

// method to define what exactly to send back when a mongoose model is converted to a JSON value
UserSchema.methods.toJSON = function () {
    var user = this;
    // take mongoose variable user and convert to Object
    var userObject = user.toObject();
    // return only the id and email properties
    return _.pick(userObject, ['_id', 'email']);
};

// add instance method to generate auth token
UserSchema.methods.generateAuthToken = function () {
    // user = document
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    // update token in user model
    user.tokens.push({access, token});
    // save the update
    return user.save().then(() => {
        return token;
    });
};

// add model method to find specific user by token
UserSchema.statics.findByToken = function (token) {
    // User = model
    var User = this;
    var decoded;

    // decode the token - authentication
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }
    // find user from that token
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

// user model
var User = mongoose.model('User', UserSchema);

// export model
module.exports = {User};