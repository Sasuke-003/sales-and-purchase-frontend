const { user, item, seller, sale, purchase } = require( './validator.config.js' ) ;

const validator = {

    "/user/login"  : user.login ,
    "/user/logout" : user.logout,
    "/user/signup" : user.signup,

    "/item/add"    : item.add   , 
    "/item/search" : item.search,
    "/item/detail" : item.detail,
    "/item/update" : item.update,

    "/seller/add"  : seller.add ,

    "/sale/create"     : sale.create,
    // "/sale/list-all" : sale.listAll,
    // "/sale/list-my"  : sale.listMy,

    "/purchase/create"     : purchase.create,
    // "/purchase/list-all" : purchase.listAll,
    // "/purchase/list-my"  : purchase.listMy,

    } ;
    
    export const validate = async ( { url, data } ) => {
        try           { return await validator[ url ].validateAsync( data ) ; }
        catch ( err ) { alert ( err.details[0].message ); throw err  ;       }
    }