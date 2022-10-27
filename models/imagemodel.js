const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    image : {
        data : Buffer,
        contentType :String
    }
});

module.exports = mongoose.model('imagemodel',ImageSchema);