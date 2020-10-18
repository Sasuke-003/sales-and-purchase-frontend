import axios from "axios";
import { validate, valid } from '../validator';

const validPurchase = valid.purchase;

const url = {
    list      : "/purchase/list"       ,
    create    : "/purchase/create"     ,
    update    : "/purchase/update"     ,
    delete    : "/purchase/delete"     ,
    detail    : "/purchase/detail"     ,
    listEdits : "/purchase/list-edits" ,
}

export const purchase = {

    create : async ( newPurchaseData ) => {
        await validate( validPurchase.create, newPurchaseData );
        return await axios.post( url.create, newPurchaseData );
    },

    update : async ( updatedPurchaseData ) => {
        await validate( validPurchase.update, updatedPurchaseData );
        return await axios.post( url.update, updatedPurchaseData );
    },

    list : async ( PageNo, UserID ) => {
        await validate( validPurchase.update, { PageNo, UserID } );
        const query = `?PageNo=${PageNo}`;
        if( UserID ) query.concat( `&UserID=${UserID}` );
        return await axios.get( url.list + query );
    },

    detail : async ( PurchaseID ) => {
        await validate( validPurchase.detail, { PurchaseID } );
        const query = `?PurchaseID=${PurchaseID}`;
        return await axios.get( url.detail + query );
    }, 
    
    delete : async ( PurchaseID ) => {
        await validate( validPurchase.delete, { PurchaseID } );
        return await axios.post( url.update, { PurchaseID } );
    },

    listEdits : async ( PurchaseID, EditIndex = 0 ) => {
        await validate( validPurchase.listEdits, { PurchaseID, EditIndex } );
        const query = `?PurchaseID=${PurchaseID}&EditIndex=${EditIndex}`;
        return await axios.get( url.listEdits + query );
    },

}
