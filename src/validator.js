const { user, item, seller, sale, purchase, auth } = require( './validator.config.js' ) ;

const validator = {

    "/user/login"  : user.login,
    "/user/logout" : user.logout,
    "/user/signup" : user.signup,

    "/item"        : item.search,
    "/item/add"    : item.add, 
    "/item/detail" : item.detail,
    "/item/update" : item.update,

    "/seller"      : seller.search,
    "/seller/add"  : seller.add,

    "/sale/create"   : sale.create,
    "/sale/detail"   : sale.detail,
    "/sale/update"   : sale.update,
    "/sale/delete"   : sale.delete,
    "/sale/list-all" : sale.listAll,
    "/sale/list-my"  : sale.listMy,

    "/purchase/create"   : purchase.create,
    "/purchase/detail"   : purchase.detail,
    "/purchase/update"   : purchase.update,
    "/purchase/delete"   : purchase.delete,
    "/purchase/list-all" : purchase.listAll,
    "/purchase/list-my"  : purchase.listMy,

    "/auth/refresh-token" : auth.refreshToken,
    "/auth/access-token"  : auth.accessToken,
    
    } ;
    
    export const validate = async ( req ) => {
        try           { await validator[ req.url ].validateAsync( req.data ) ; return req ; }
        catch ( err ) { alert ( err.details[0].message ); throw err  ;       }
    }