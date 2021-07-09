const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
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
        minlength : 8,
        select : false
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
    },
    passwordChangedAt : {
        type : Date
    },
    links : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Link"
        }
    ],
    passwordResetToken : String,
    passwordResetExpiresIn : String,
    emailVerificationCode : String,
    emailVerified : {
        type : Boolean,
        default : false
    }
})

//Schema MiddleWare
userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now()-1000;
    next();
})
userSchema.pre('save', async function(next) {
    //only run this function if password was modified
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

//schema methods
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return (await bcrypt.compare(candidatePassword, userPassword));
}
userSchema.methods.changedPasswordAfter = async function(JWTTimeStamp) {
    if(this.passwordChangedAt) {
        const changedTime = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        console.log(changedTime, JWTTimeStamp);
        return JWTTimeStamp < changedTime;
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpiresIn = Date.now() + 10*60*1000;
    return resetToken;
}

const generateRandomCode = () => {
    const alphaNumeric = "0123456789abcdefghijklmnopqrstuvwxyz";
    const alphaNumericLength = alphaNumeric.length;
    let generatedString = "";
    const stringLength = 4;
    for(let i = 0; i<stringLength; i++) {
        let idx = Math.floor(Math.random()*alphaNumericLength);
        generatedString += alphaNumeric[idx];
    }
    
    return generatedString;
}
userSchema.methods.createSignUpCode = function() {
    let code = generateRandomCode();
    this.emailVerificationCode = code;
    return code;
}
const User = mongoose.model('User', userSchema);
module.exports = User;