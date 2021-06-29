const app = require('./app.js');
const dotenv = require('dotenv');
const config = require('./utils/config');
const mongoose = require('mongoose');

dotenv.config();
const PORT = config.PORT || 3000;
mongoose.connect(config.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
}).then(() => {
    console.log('connected to database');
}).catch(() => {
    console.log(`couldn't connect to database`);
    process.exit(1);
})

app.listen(PORT, () => {
    console.log(`App Running on Port - ${PORT}`);
})