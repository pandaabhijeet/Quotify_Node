const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

username : {
    type : String,
    required : true,
    min : 6
},

email : {
    type: String,
    required : true,
    max : 100,
    min : 4
},

password : {
    type : String,
    required : true,
    max : 1024,
    min : 8
},

date : {
    type : Date,
    default : Date.now
},

profile_image : {
    type : String,
    default : ""
},

fav_quote : {
    type : String,
    default : ""
},

});

module.exports = mongoose.model('User', userSchema);