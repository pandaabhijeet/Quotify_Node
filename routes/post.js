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

router.post('/profile_image', upload.single('profileImage') , (req,res) =>
{
    console.log(req.body.file);
});


module.exports = router;