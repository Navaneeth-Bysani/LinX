require('dotenv').config();

let PORT = process.env.PORT;
let MONGO_URL = process.env.MONGO_URL;
let NODE_ENV = process.env.NODE_ENV;
let JWT_SECRET = process.env.JWT_SECRET;
let JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
let JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;

module.exports = {PORT, MONGO_URL, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN};