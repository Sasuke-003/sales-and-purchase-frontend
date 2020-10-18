import axios from "axios";
import { validate, valid } from '../validator/validator';

const validSale = valid.sale;

const url = {
    list      : "/sale/list"       ,
    create    : "/sale/create"     ,
    update    : "/sale/update"     ,
    delete    : "/sale/delete"     ,
    detail    : "/sale/detail"     ,
    listEdits : "/sale/list-edits" ,
}

export const sale = {

    create : async ( newSaleData ) => {
        await validate( validSale.create, newSaleData );
        return await axios.post( url.create, newSaleData );
    },

    update : async ( updatedSaleData ) => {
        await validate( validSale.update, updatedSaleData );
        return await axios.post( url.update, updatedSaleData );
    },

    list : async ( PageNo, UserID ) => {
        await validate( validSale.update, { PageNo, UserID } );
        const query = `?PageNo=${PageNo}`;
        if( UserID ) query.concat( `&UserID=${UserID}` );
        return await axios.get( url.list + query );
    },

    detail : async ( SaleID ) => {
        await validate( validSale.detail, { SaleID } );
        const query = `?SaleID=${SaleID}`;
        return await axios.get( url.detail + query );
    }, 
    
    delete : async ( SaleID ) => {
        await validate( validSale.delete, { SaleID } );
        return await axios.post( url.update, { SaleID } );
    },

    listEdits : async ( SaleID, EditIndex = 0 ) => {
        await validate( validSale.listEdits, { SaleID, EditIndex } );
        const query = `?SaleID=${SaleID}&EditIndex=${EditIndex}`;
        return await axios.get( url.listEdits + query );
    },

}