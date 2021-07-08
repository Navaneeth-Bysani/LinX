const Link = require('./../models/linkModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createLink = catchAsync(async (req,res,next) => {
    const link = {
        url : req.body.url,
        title : req.body.title
    }
    

    const newLink = await Link.create(link);
    res.status(201).json({
        newLink,
        status : "success"
    })
})

exports.deleteLink = catchAsync(async (req,res,next) => {
    const linkId = req.params.id;
    const deletedLink = await Link.findByIdAndDelete(linkId);
    if(deletedLink == null) {
        return next(new AppError(`can't find link with that id`, 404));
    }
    
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