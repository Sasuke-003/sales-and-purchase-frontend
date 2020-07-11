const Joi = require( '@hapi/joi' ) ;
const v = {
    User : {
        email    : [ 1, 10 ],
        pass     : [ 1, 10 ],
        fullName : [ 1, 10 ],
        type     : [ 1, 1  ],
    },
    Item : {
        name : [ 1, 10 ],
        unit : [ 1, 10 ],
    },
    Seller : {
        name : [ 1, 10 ],
    }
}

const login = Joi.object({
    Email    : Joi.string().trim().min( v.User.email[0] ).max( v.User.email[1] ).required(),
    Password : Joi.string().trim().min( v.User.pass[0]  ).max( v.User.pass[1]  ).required(),
}) ;

const signup = Joi.object({
    FullName : Joi.string().trim().min( v.User.fullName[0] ).max( v.User.fullName[1] ).required(),
    Email    : Joi.string().trim().min( v.User.email[0] ).max( v.User.email[1] ).required(),
    Password : Joi.string().trim().min( v.User.pass[0]  ).max( v.User.pass[1]  ).required(),
    Type     : Joi.string().trim().min( v.User.type[0]  ).max( v.User.type[1]  ).required(),
}) ;

const validator = {
    "/user/login"  : login,
    "/user/signup" : signup
}
export const validate = async ( { url, data } ) => {
    try           { return await validator[ url ].validateAsync( data ) ; }
    catch ( err ) { alert ( err.details[0].message ); throw err  ;       }
}