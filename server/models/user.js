//
// TODO APP - users model
//

// load in mongoose
var mongoose = require('mongoose');

// user model
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
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