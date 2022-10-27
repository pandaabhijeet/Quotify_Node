const express = require('express');
const User = require('../models/User');
const verify = require('./verifyToken');
const router = express.Router();
const upload = require('../middlewares/upload');
const imagemodel = require('../models/imagemodel');
const { single } = require('../middlewares/upload');

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

router.post('/profile_image/:id',(req,res) => 
{
    if(req.params.id != null)
    {
        const id = req.params.id;
        console.log(`Update: ${req.params.id}`);

        // //const path = req.file.path.replace(/\\/g, "/");
        // const updatedUser = await User.findOneAndUpdate(id, req.body = {
        //     profile_image : "https://quotifyapplication.herokuapp.com/" + path
        // },
        // {new : true}
        // );
        upload(req,res,(err) => {
            if(err){
                console.log(err);
            }else {
                const prof_image = new imagemodel({
                    image : {
                        data : req.file.filename,
                        contentType : 'image/*'
                    }
                });
                prof_image.save()
                .then(() => res.send('Uploaded successfully')
                .catch(err => console.log(err)));

                try{
                    const updatedUser = User.findByIdAndUpdate(id, req.body = {
                        profile_image : prof_image
                    });
                    
                    console.log(updatedUser);
                    return res.send(updatedUser);
                } catch(err)
                {
                    console.log(err);
                    return res.send(err);
                }
               
                
            }
        });

    }else 
    {
        console.log('No user with given id');
    }
});

module.exports = router;