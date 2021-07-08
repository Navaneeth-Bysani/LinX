const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signUp = catchAsync(async(req, res, next) => {
    const user = {
        name : req.body.name,
        email : req.body.email,
        photo : req.body.photo,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm
    };

    const newUser = await User.create(user);

    res.status(201).json({
        status : "success",
        newUser
    })
})