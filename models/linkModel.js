const mongoose = require('mongoose');

const linkModel = new mongoose.Schema({
    url : {
        type : String,
        required : [true, 'A Link should have an URL']
    },
    title: {
        type : String,
        required : [true, 'A link should have a display Name']
    },
    visits : {
        type : Number,
        default : 0
    }
});

const Link = mongoose.model("Link", linkModel);
module.exports = Link;