const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const LinkRouter = require('./routes/linkRoutes');
const UserRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
app.use(helmet());

const cors = require('cors');

app.use(cors());
const limiter = rateLimit({
    max : 100,
    windowMs : 60*60*1000,
    message : 'Too many requests from your machine! Please try after an hour'
});

//http parameter pollution
app.use(hpp());

//rate limiter
app.use('/api', limiter);
app.use(express.json({limit : '10kb'}));

//sanitise mongo db data
app.use(mongoSanitize());

//preventing xss attacks
app.use(xss());

app.use("/api/v1/links", LinkRouter);
app.use("/api/v1/users", UserRouter);

app.all("*", (req,res,next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler);

module.exports = app;