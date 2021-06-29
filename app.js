const express = require('express');

const LinkRouter = require('./routes/linkRoutes');

const app = express();
app.use(express.json());
app.use("/api/v1/links", LinkRouter);

module.exports = app;