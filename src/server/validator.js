import { item }     from "./validations/item.val" ;
import { sale }     from "./validations/sale.val" ;
import { user }     from "./validations/user.val" ;
import { seller }   from "./validations/seller.val" ;
import { purchase } from "./validations/purchase.val" ;

export const valid = { item, sale, user, seller, purchase, };

export async function validate( validationSchema, dataToBeValidated ) {
    try { await validationSchema.validateAsync( dataToBeValidated ); }
    catch ( err ) {
        const msg = err?.details[0]?.message;

        if( msg ) alert ( msg );
        else { console.log( err ); alert( "Unknown Validation error"); }

        throw err  ;
    }
}
