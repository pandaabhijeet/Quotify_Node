const express = require('express');
const User = require('../models/User');
const verify = require('./verifyToken');
const router = express.Router();
const upload = require('../middlewares/upload');
const imagemodel = require('../models/imagemodel');
router.get('/',async (req,res) => 
{
    try{

        const getUser = await User.find();
        return res.send(getUser);

    }catch(err)
    {
        console.log(err);
    }
});

router.post('/profile_image' , (req,res) =>
{
    console.log(req.body.file);
    upload(req,res,(err) => {
        if(err)
        {
            console.log(err);
            return res.send(err);
        }else 
        {
            const uploadImage = new imagemodel({
                image : {
                    data : req.file.filename,
                    contentType : 'image/png'
                }
            });
        }

        uploadImage.save()
        .then(() => res.send('Successfull'))
        .catch((err) => console.log(err));
    })
});


module.exports = router;