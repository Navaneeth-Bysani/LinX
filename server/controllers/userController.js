const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getUser = catchAsync(async(req,res,next) => {
    const username = req.params.username;
    const user = await User.findOne({username : username}).populate({
        path : 'links',
        model : 'Link',
        select : {'url' : 1, 'title' : 1}
    });
    
    if(!user) {
        return next(new AppError('There is no user with the specified user name', 404));
    }
    const responseUser = {
        name : user.name,
        photo : user.photo,
        links : user.links,
        bio : user.bio
    }
    
    res.status(200).json({
        status : "success",
        responseUser
    })
})