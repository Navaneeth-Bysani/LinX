const {NODE_ENV} = require('./../utils/config');
const AppError = require('./../utils/appError');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        err : err,
        stack : err.stack
    })
}

const sendErrorProd = (err, res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        })
    } else {
        console.error('Error ======> ', err);
        res.status(500).json({
            status : 'error',
            message : 'something went wrong'
        })
    }
    
}

const handleCastErrorDB = error => {
    const message = `Invalid ${error.path} : ${error.value}`;
    return (new AppError(message, 400));
}

const handleDuplicateFieldsDB = error => {
    //mongoose is no longer returning errmsg property
    // const value = error.errmsg.match(/(["'](\\?.)*?\1)/)[0];
    const keys = (Object.keys(error.keyValue)).join(' ');
    const values = (Object.values(error.keyValue)).join(' ');

    const message = `Duplicate field value(s) : ${keys}. Have values ${values} respectively. Please use different value(s)`;
    return (new AppError(message, 400));
}

const handleValidationErrorDB = error => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Invalid input: ${errors.join('. ')}`;
    return (new AppError(message, 400));
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else {
        let error = { ...err };
        if(err.name === 'CastError') error = handleCastErrorDB(error);
        if(err.code === 11000) error = handleDuplicateFieldsDB(err);
        if(err.name === "ValidationError") error = handleValidationErrorDB(err);

        sendErrorProd(error, res);
    }
}