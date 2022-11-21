const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    image : {
        id : String,
        data : String,
        contentType : String
    }
});

module.exports = mongoose.model('imagemodel',ImageSchema);