const Link = require('./../models/linkModel');

exports.createLink  = async (req,res,next) => {
    const link = {
        url : req.body.url,
        title : req.body.title
    }
    

    const newLink = await Link.create(link);
    res.status(201).json({
        newLink,
        status : "success"
    })
    return next();
}

exports.deleteLink = async (req,res,next) => {
    const linkId = req.params.id;
    const deletedLink = await Link.findByIdAndDelete(linkId);
    if(deletedLink == null) {
        res.status(204).json({
            status : "failed",
            message : "specified linkID doesn't exist"
        })
        return next();
    }
    
    res.status(202).json({
        status : "success",
        message : `Link ${linkId} deleted successfully`
    })

    return next();
}

exports.linkClicked = async(req,res,next) => {
    const linkId = req.params.id;
    const updatedLink = await Link.findByIdAndUpdate(linkId, {$inc : {visits : 1}});
    if(updatedLink == null) {
        res.status(404).json({
            message : "The specified id doesn't exist"
        })
        return next();
    }
    res.status(200).json({
        status : "success"
    })
    return next();
}

exports.updateLink = async(req,res,next) => {
    const linkId = req.params.id;
    const LinkBody = {
        url : req.body.url,
        title : req.body.title
    }

    const updatedLink = await Link.findByIdAndUpdate(linkId, LinkBody);
    res.status(200).json({
        status : "success",
        updatedLink
    })
    return next();
}

exports.getLink = async(req,res,next) => {
    const linkId = req.params.id;
    const link = await Link.findById(linkId);
    
    res.status(200).json({
        status : "success",
        link
    })

    return next();
}