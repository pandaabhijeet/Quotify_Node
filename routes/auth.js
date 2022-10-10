
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../models/validation');
const jwt = require('jsonwebtoken');


router.post('/register', async (req,res) => {
  //Validate userdata before inserting into DB
  console.log(req.body);
  if(req.body == null){
    console.log('Req is null');
    return res.send("Req is null");
  }

  const {error} = registerValidation(req.body);

   if(error)
   {
     console.log(error.message);
      res.send({
      error : error.message,
      success : false
    });
    return;
   }
   
   //validate if user email alreqady exists, if yes send error
    const emailExists = await User.findOne({email:req.body.email});
     if(emailExists) 
     {
      console.log('Email already exists !');
        res.send(
        {
          error:'Email already exists !',
          success: false
        });
        return;
     }
     //if not proceed register the user
     //encrypt the password
     else 
     {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = new userModel({
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword,
        date : req.body.date
    });

    try{
        const savedUser = await user.save();
        console.log(savedUser);
        res.send(
          {
            id : savedUser._id,
            username : savedUser.username,
            email : savedUser.email,
            password : savedUser.password,
            success : true
          });

        }catch(err){
        res.send({
          error : err,
          success : false
        });
        console.log(err);
        }
     }
});

router.post('/login', async(req,res) => 
{
  //validate user login data
  const {error} = loginValidation(req.body);
  if(error)
  {
    return res.send(
      {
        error : error.message,
        success : false
      });
  }

 //check if user exists

 const user = await User.findOne({email:req.body.email});
 if(!user)
 {
  return res.send(
    {
     error : "User doesn't exist. Please register.",
     success : false
  });
 }
 //if user exists, check for correct password
 else
 {
   const validPassword = await bcrypt.compare(req.body.password,user.password); 
   if(!validPassword)
   {
     return res.send(
      {
        error : "Entered password is incorrect. Please check and enter again.",
        success : false
      });
   }

   //create and assina json web token

   const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);

   res.send(
    {
      email : req.body.email,
      success : true,
      token : token
    });
   res.header('auth-token', token).send(token);
 }
}); 



module.exports = router;