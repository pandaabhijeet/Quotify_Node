const express = require('express');
const User = require('../models/User');
const verify = require('./verifyToken');
const router = express.Router();
const upload = require('../middlewares/upload');
const imagemodel = require('../models/imagemodel');
const buffer = require('buffer');
const path = require('path');

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

    upload(req,res,(err) => {

        if(!err)
        {
        if(req.file == null)
        {
            console.log('Undefined File');
            return res.send({
                success:false,
                error : `undefined file`
            });
        }else 
        {
            const user_id = req.body.userId;
            console.log(`User id: ${user_id}`);

            const uploadImage = new imagemodel({
                image : {
                    id : user_id,
                    data : req.file.path,
                    contentType : 'image/jpg'
                }
            });
            uploadImage.save()
            .then(async () => {
                console.log('Image Uploaded to Database Successfully');
                
                const user_exists = await User.findById(user_id)
                {
                    if(user_exists)
                    {
                        user_exists.updateOne({profile_image : req.file.path},
                            (err) =>
                            {
                                if(err)
                                {
                                    console.log(`error occured: ${err}`);
                                    return res.send({
                                        success:false,
                                        error : err
                                    })
                                }else 
                                {
                                    console.log(`Profile Image Updated: ${user_exists}`);
                                    return res.send({
                                        success :true,
                                    })
                                }
                            })
                    }else 
                    {
                        console.log('User does not exist, cannot update profile image');
                        return res.send ({
                            success : false,
                            error : 'User does not exist,cannot update profile image'
                        })
                    }
                }
                    
               
            })
        }
    }

       
    })
});

router.get('/profile_image/:id', async (req,res) => 
{
  
   try{
    const _id = req.params.id;
    const imageData =  await imagemodel.findById(_id);

    return res.json(imageData);

   } catch (err)
   {
    console.log(err);
    return res.send(err);
   }
   
}); 

router.get('/user', async (req,res) =>
{
    try{
        const _id = req.body.userId;

        const getUser = await User.findById(_id);

        if(getUser)
        {
            return res.send(
                {
                    id : getUser._id,
                    username : getUser.username,
                    password : getUser.password,
                    email : getUser.email,
                    profile_image : getUser.profile_image,
                    fav_quote : getUser.fav_quote,
                    success : true
                });
        }
    }catch(err)
    {
        console.log(err);
        return res.send (
            {
                success : false,
                error : err
            });
    }
});


module.exports = router;