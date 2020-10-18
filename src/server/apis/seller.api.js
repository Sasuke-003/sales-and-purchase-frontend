import axios from "axios";
import { validate, valid } from '../validator/validator';

const validSeller = valid.seller;

const url = {
    search : "/seller"     ,
    add    : "/seller/add" ,
}



export const seller = {

    search : async ( SellerName ) => {
        await validate( validSeller.search, { SellerName } );
        const query = `?SellerName=${SellerName}`
        return await axios.get( url.search + query );
    },

    add : async ( newSellerData ) => {
        await validate( validSeller.add, newSellerData );
        return await axios.post( url.add, newSellerData );
    },

}
