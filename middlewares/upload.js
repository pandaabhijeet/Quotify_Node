const path = require('path');
const multer = require('multer');

var disk_storage = multer.diskStorage({

    destination : function(req,file,cb){
        cb(null,'/profile_images')
    },
    filename : (req, file, cb) => {

        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

var upload = multer({
    storage : disk_storage,
    fileFilter : function(req,file,callback)
    {
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
          )
          {
            callback(null,true);
          }else 
          {
            console.log("File format not accepted.");
            callback(null,false);
          }
    }
}).single('profileImage');

module.exports = upload;