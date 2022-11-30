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
    const _id = req.body.userId;
    console.log(_id);
    
    upload(req,res,(err) => {
        if(req.file == null)
        {
            console.log('Undefined File');
            return res.send('Undefined File');
        }else 
        {
            const uploadImage = new imagemodel({
                image : {
                    id : _id,
                    data : req.file.path,
                    contentType : 'image/jpg'
                }
            });
            uploadImage.save()
            .then(() => {
                console.log('Image Uploaded to Database Successfull');
                User.findByIdAndUpdate(_id, {profile_image : req.file.path}, (err,docs) => 
                {
                    if (err)
                    {
                        console.log(`Error Occured: ${err}`);
                        return res.send({
                            success : false,
                            error : err
                        });
                    }else 
                    {
                        console.log('Profile Image Updated for user : ', docs);
                        return res.send({
                            success : true
                        });
                    }
                });
            }).catch(err)
            {
                console.log(err);
                return res.send({
                    success : false,
                    error : err
                });
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


module.exports = router;