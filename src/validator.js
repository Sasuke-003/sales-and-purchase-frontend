const { user, item, seller, sale, purchase, auth } = require( './validator.config.js' ) ;
const validator = {

    "/user/sign-up"  : user.signUp,
    "/user/sign-in"  : user.signIn,
    "/user/sign-out" : user.signOut,

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

    "/token/ref-tok" : auth.refreshToken,
    "/token/acc-tok" : auth.accessToken,
    
    } ;
    
    export const validate = async ( req ) => {
        try { 
            if( req.method === 'post' ) await validator[ req.url ].validateAsync( req.data );
            console.log("VALIDATED"); // -deb
        }
        catch ( err ) {
            const msg = err?.details[0]?.message;

            if( msg ) alert ( msg );
            else { console.log( err ); alert( "Unknown Validation error"); }

            throw err  ;
            }
    }