const Joi = require( '@hapi/joi' ) ;

const { _validator } = require('../../validation.js' ) ;
const { _email, _pass, } = _validator.User ;

const signinSchema = Joi.object({
    Email    : Joi.string().trim().min(_email.min).max(_email.max).required(),
    Password : Joi.string().trim().min(_pass.min ).max(_pass.max ).required(),
}) ;

module.exports.signin = async ( data ) => {
    try           { return await signinSchema.validateAsync( data ) ; }
    catch ( err ) { throw err.details[0].message ;  }
} ;