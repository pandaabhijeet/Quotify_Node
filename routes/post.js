const express = require('express');
const User = require('../models/User');
const verify = require('./verifyToken');
const router = express.Router();
const upload = require('../middlewares/upload');

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

router.post('/profile_image/:id',upload.single('profileImage'),async(req,res) => 
{
    if(req.params.id != null)
    {
        const id = req.params.id;
        console.log(`Update: ${req.params.id}`);
        const path = req.file.path.replace(/\\/g, "/");
        const updatedUser = await User.findOneAndUpdate(id, req.body = {
            profile_image : "https://quotifyapplication.herokuapp.com/" + path
        },
        {new : true}
        );

        updatedUser.save();
        console.log(updatedUser);
        return res.send(updatedUser);


    }else 
    {
        console.log('No user with given id');
    }
});

module.exports = router;