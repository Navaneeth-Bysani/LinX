const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const crypto = require('crypto');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError.js');
const sendEmail = require('./../utils/email.js');

const {JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN, NODE_ENV} = require('./../utils/config');

const signToken = id => {
    return jwt.sign({id : id}, JWT_SECRET, {
        expiresIn : JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires : new Date(Date.now() + JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly : true
    }
    if(NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status : "success",
        user,
        token
    })
}
exports.signUp = catchAsync(async(req, res, next) => {
    const user = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm
    };

    
    const newUser = await User.create(user);
    const signUpCode = newUser.createSignUpCode();
    await newUser.save({validateBeforeSave : false});
    const message = `Here is your confirmation code: please enter the code in the email confirm window : ${signUpCode}`;
    try {
        await sendEmail({
            email : newUser.email,
            subject : 'Email verification code',
            text : message
        });
    
        res.status(200).json({
            status : 'success',
            message : 'code is sent to your email'
        })
    } catch (err) {
        newUser.emailVerificationCode = undefined;
        await newUser.save({validateBeforeSave : false});
        console.log(err);
        return next(new AppError('Please try again', 500));
    }
})

exports.resendCode = catchAsync(async (req,res,next) => {
    const {email} = req.body;
    
    const user = await User.findOne({email : email});
    if(!user) {
        return next(new AppError('There is no user with that email id', 404));
    }
    
    if(user.emailVerified) {
        return next(new AppError('This email id is already verified'));
    }

    const signUpCode = user.createSignUpCode();
    await user.save({validateBeforeSave : false});
    const message = `Here is your confirmation code: please enter the code in the email confirm window : ${signUpCode}`;
    try {
        await sendEmail({
            email : user.email,
            subject : 'Email verification code',
            text : message
        });
    
        res.status(200).json({
            status : 'success',
            message : 'code is sent to your email'
        })
    } catch (err) {
        user.emailVerificationCode = undefined;
        await user.save({validateBeforeSave : false});
        console.log(err);
        return next(new AppError('Please try again', 500));
    }
})

exports.confirmSignUp = catchAsync(async(req,res,next) => {
    const {email, code} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        return next(new AppError('user does not exist with the given email', 404));
    }
    if(user.emailVerified) {
        return next(new AppError('user is already verified', 400));
    }

    if(user.emailVerificationCode !== code) {
        return next(new AppError('you have entered a wrong code, please try again', 400));
    }
    user.emailVerificationCode = undefined;
    user.emailVerified = true;
    await user.save({validateBeforeSave : false});
    createSendToken(user, 200, res);
})

exports.login = catchAsync(async(req,res,next) => {
    const {email, password} = req.body;

    //check for email and password
    if(!email || !password) {
        return next(new AppError('Please enter both userId, and password', 400));
    }

    
    //find if user exists && password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    if(!user.emailVerified) {
        res.status(200).json({
            status : "fail",
            message : "please confirm your email"
        })
    }
    //if everything is fine, we are sending token back to the client
    createSendToken(user, 200, res);
})

exports.protect = catchAsync(async(req,res,next) => {
    let token;
    
    //check if token exists in the header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        return next(new AppError('You are not logged In! Please login first', 401));
    }

    //verification of token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
    
    //check if user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser) {
        return next(new AppError('User no longer exists', 401));
    }
    //check if user changed password after the issue of JWT
    if(await freshUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User changed the password, please re-login', 401));
    };
    
    //Allow access to user
    req.user = freshUser;
    next();
})

exports.forgotPassword = catchAsync(async (req,res,next) => {
    const user = await User.findOne({email : req.body.email});

    if(!user) {
        return next(new AppError('User with that email id do not exist', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave : false});
    
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `${resetURL}`;
    try {
        await sendEmail({
            email : user.email,
            subject : 'Password reset url',
            text : message
        });
    
        res.status(200).json({
            status : 'success',
            message : 'reset token successfully sent to your email address'
        })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpiresIn = undefined;
        await user.save({validateBeforeSave : false});
        console.log(err);
        return next(new AppError('Please try again', 500));
    }
    
})

exports.resetPassword = catchAsync(async (req,res,next) => {
    const resetToken = req.params.token;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const user = await User.findOne({passwordResetToken : hashedToken, 
        passwordResetExpiresIn : {$gt : Date.now()}});
    if(!user) {
        return next(new AppError('Token is invalid or expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.paswordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;

    await user.save();
    createSendToken(user, 200, res);
}) 