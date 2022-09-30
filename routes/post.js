const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();

router.get('/',verify,(req,res) => 
{
    res.json(
        {
            post : 
            {
                title : 'Hey ! How is it',
                description : 'Working great!'
            }
        });
});

module.exports = router;