const express = require('express');
const User = require('../models/User');
const verify = require('./verifyToken');
const router = express.Router();
const upload = require('../middlewares/upload');
const imagemodel = require('../models/imagemodel');
const buffer = require('buffer');
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

            uploadImage.save()
            .then(() => {
                console.log('Successfull');
                return res.send('Successfully Uploaded');
            }).catch(err)
            {
                console.log(err);
            }
        }

       
    })
});

router.get('/profile_image/:id', async (req,res) => 
{
  
   try{
    const _id = req.params.id;
    const imageData =  await imagemodel.findById(_id);

    //const base64Data = Buffer.from(imageData.image.data,'binary').toString('base64url');
    return res.json(imageData);

   } catch (err)
   {
    console.log(err);
    return res.send(err);
   }
   
}); 


module.exports = router;