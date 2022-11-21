const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    image : {
        data : ImageBitmap,
        contentType : String
    }
});

module.exports = mongoose.model('imagemodel',ImageSchema);