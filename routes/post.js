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

router.patch('/profile_image/:id',async(req,res) => 
{
    if(req.params.id != null)
    {
        console.log(`Update: ${req.params.id}`);

        try
        {
             upload(async (req,res,err) =>{
                if(err)
                {
                    console.log(err);
                    return res.send(err);
                }else 
                {
                    const _id = req.params.id;
                    const user =  User.findById(_id);

                    const updatedUser = await user.update(profile_image,req.body.profile_image);
                    console.log(updateUser);
                    return res.send (updatedUser);
                }
            });
            

        } catch(err)
        {
            console.log(err);
            return res.send(err);
        }
    }
});

module.exports = router;