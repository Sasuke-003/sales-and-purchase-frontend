export const valid = require('./validator.config');

export async function validate( validator, data ) {
    try { await validator.validateAsync( data ); }
    catch ( err ) {
        const msg = err?.details[0]?.message;

        if( msg ) alert ( msg );
        else { console.log( err ); alert( "Unknown Validation error"); }

        throw err  ;
        }
}