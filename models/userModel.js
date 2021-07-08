const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'user should have a name']
    },
    email : {
        type : String,
        required : [true, 'user should have an email'],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail, 'Please provide a valid email']
    },
    photo : {
        type : String
    },
    password : {
        type : String,
        required : [true, 'User must have a password'],
        minlength : 8
    },
    passwordConfirm : {
        type : String,
        required : [true, 'User must have a password'],
        validate : {
            //Works only on SAVE and CREATE (NOT UPDATE)
            validator : function(el) {
                return el === this.password;
            }

        }
    }
})

//Schema MiddleWare
UserSchema.pre('save', async function(next) {
    //only run this function if password was modified
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})
const User = mongoose.model('User', UserSchema);
module.exports = User;