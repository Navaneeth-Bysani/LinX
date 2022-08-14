const Link = require('./../models/linkModel');
const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const findLinkBelongsToUser = (user, linkId) => {
    return user.links.includes(linkId);
}

exports.createLink = catchAsync(async (req,res,next) => {
    const link = {
        url : req.body.url,
        title : req.body.title
    }
    const newLink = await Link.create(link);
    let currentUser = await User.findById(req.user._id);
    currentUser.links.push(newLink);
    await currentUser.save({validateBeforeSave : false});
    res.status(201).json({
        newLink,
        status : "success"
    })
})

exports.deleteLink = catchAsync(async (req,res,next) => {
    const linkId = req.params.id;
    if(!findLinkBelongsToUser(req.user, linkId)) {
        return next(new AppError('You cannot delete this link', 403));
    }
    const deletedLink = await Link.findByIdAndDelete(linkId);
    if(deletedLink == null) {
        return next(new AppError(`can't find link with that id`, 404));
    }
    let currentUser = await User.findById(req.user._id);
    const index = currentUser.links.indexOf(linkId);
    currentUser.links.splice(index, 1);
    await currentUser.save({validateBeforeSave : false});

    res.status(202).json({
        status : "success",
        message : `Link ${linkId} deleted successfully`
    })
})

exports.linkClicked = catchAsync(async(req,res,next) => {
    const linkId = req.params.id;
    
    const updatedLink = await Link.findByIdAndUpdate(linkId, {$inc : {visits : 1}});
    if(updatedLink == null) {
        return next(new AppError(`can't find link with that id`, 404));
    }
    res.status(200).json({
        status : "success"
    })
})

exports.updateLink = catchAsync(async(req,res,next) => {
    const linkId = req.params.id;
    const LinkBody = {
        url : req.body.url,
        title : req.body.title
    }
    if(!findLinkBelongsToUser(req.user, linkId)) {
        return next(new AppError('You cannot edit this link', 403));
    }
    const updatedLink = await Link.findByIdAndUpdate(linkId, LinkBody, {new : true});
    if(updatedLink == null) {
        return next(new AppError(`can't find link with that id`, 404));
    }
    res.status(200).json({
        status : "success",
        updatedLink
    })
})

exports.getLink = catchAsync(async(req,res,next) => {
    const linkId = req.params.id;
    const link = await Link.findById(linkId);
    if(link == null) {
        return next(new AppError(`can't find link with that id`, 404));
    }
    res.status(200).json({
        status : "success",
        link
    })
})