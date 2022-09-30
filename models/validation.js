const joi = require('joi');

//REGISTER VALIDATION
const registerValidation = (regData) =>
{
    const joiSchema = joi.object({
        username: joi.string()
                     .min(6)
                     .required(),
    
        email : joi.string()
                .min(4)
                .max(100)
                .email()
                .required(),
    
        password : joi.string()
                      .min(8)
                      .max(1024)
                      .required()
    
    });

    return  joiSchema.validate(regData);
}

const loginValidation = (loginData) =>
{
    const joiSchema = joi.object({
        email : joi.string()
                .min(4)
                .max(100)
                .email()
                .required(),
    
        password : joi.string()
                      .min(8)
                      .max(1024)
                      .required()
    
    });

    return  joiSchema.validate(loginData);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;