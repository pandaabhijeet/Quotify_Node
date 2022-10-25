const express = require('express');
const User = require('../models/User');
const verify = require('./verifyToken');
const router = express.Router();

router.get('/:id',(req,res) => 
{
    const getUser = User.findById(req.params.id);
    return res.send(getUser);
});

router.patch('/:id',async (req,res) => 
{
    if(req.params.id != null)
    {
        console.log(`Update: ${req.params.id}`);

        try
        {
            const _id = req.params.id;
            const updateUser = await User.findByIdAndUpdate(_id,req.body);
            console.log(updateUser);

            return res.send(updateUser);

        } catch(err)
        {
            console.log(err);
            return res.send(err);
        }
    }
});

module.exports = router;