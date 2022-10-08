
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
    return res.status(400).send("Req is null");
  } else 
  {
    return res.status(400).send(req.body);
  }
 

  const {error} = registerValidation(req.body);

   if(error)
   {
     return res.status(400).send(error.message);
   }
   
   //validate if user email alreqady exists, if yes send error
    const emailExists = await User.findOne({email:req.body.email});
     if(emailExists) 
     {
       return res.status(400).send('Email already exists !');
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
        res.send(savedUser);
        }catch(err){
        res.status(400).send(err);
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
    return res.status(400).send(error.message);
  }

 //check if user exists

 const user = await User.findOne({email:req.body.email});
 if(!user)
 {
  return res.status(400).send("User doesn't exist. Please register.");
 }
 //if user exists, check for correct password
 else
 {
   const validPassword = await bcrypt.compare(req.body.password,user.password); 
   if(!validPassword)
   {
     return res.status(400).send("Entered password is incorrect. Please check and enter again.");
   }

   //create and assina json web token

   const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
 }
}); 



module.exports = router;