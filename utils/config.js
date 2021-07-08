require('dotenv').config();

let PORT = process.env.PORT;
let MONGO_URL = process.env.MONGO_URL;
let NODE_ENV = process.env.NODE_ENV;

module.exports = {PORT, MONGO_URL, NODE_ENV}