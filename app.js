const express = require('express');

const LinkRouter = require('./routes/linkRoutes');
const UserRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
app.use(express.json());

app.use("/api/v1/links", LinkRouter);
app.use("/api/v1/users", UserRouter);

app.all("*", (req,res,next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler);

module.exports = app;