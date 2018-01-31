//
// TODO APP - users model
//

// load in mongoose
const mongoose = require('mongoose');
const validator = require('validator');

// user model
var User = mongoose.model('User', {
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

    // create new user for testing
    // var user = new User({
    //     email: 'carol@carol.com'
    // });

    // user.save().then((doc) => {
    //     console.log('User saved', doc);
    // }, (e) => {
    //     console.log('Unable to save the user', e);
    // });

// export model
module.exports = {User};