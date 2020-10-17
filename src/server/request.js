import axios from "axios";
import { validate, valid } from './validator/validator';
import { store } from '../../redux/store' ;
import { setCurrentUser } from '../../redux/user/user.actions' ;

const URL = {

    user : {
        signUp  : "/user/sign-up" ,
        signIn  : "/user/sign-in" ,
        signOut : "/user/sign-out",
    },

    item : {
        add    : "/item/add"             ,  
        update : "/item/update"          ,
        search : "/item?ItemName="       ,
        detail : "/item/detail?ItemName=",
    },

    seller : {
        add    : "/seller/add"        ,
        search : "/seller?SellerName=",
    },

    purchase : {
        create : "/purchase/create"            ,
        update : "/purchase/update"            ,
        delete : "/purchase/delete"            ,
        list   : "/purchase/list?PageNo="      ,
        detail : "/purchase/detail?PurchaseID=",
    },

    sale : {
        create : "/sale/create"        ,
        update : "/sale/update"        ,
        delete : "/sale/delete"        ,
        list   : "/sale/list?PageNo="  ,
        detail : "/sale/detail?SaleID=",
    },
  
    token : {
        newRefTok : "/token/ref-tok",
        newAccTok : "/token/acc-tok",
    },
}

export const request = {

    user : {
        
        signUp  : async ( data ) => {
            await validate( valid.user.signUp, data );
            return await axios.post( URL.user.signUp );
        },

        signIn : async ( data ) => {
            await validate( valid.user.signIn, data );
            return await axios.post( URL.user.signIn );
        },

        signOut : async () => { clearAllData(); return await axios.get( URL.user.signOut ); }

    },

}


// Executed During signOut ( found in request.user.signOut )
function clearAllData(){
    localStorage.clear();
    // Clears all Cookie  ( From : https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript )
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    store.dispatch(setCurrentUser(null));
}
    
