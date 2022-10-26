const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination : 'profile_images',
    filename : (req, file, cb) => {

        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

var upload = multer({
    storage : storage,
    fileFilter :function(req,file,cb)
    {
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
          )
          {
            cb(null,true);
          }else 
          {
            console.log("File format not accepted.");
            cb(null,false);
          }
    }
});

module.exports = upload; 