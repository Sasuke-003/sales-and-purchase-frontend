import axios from "axios";
import moment from "moment";

import { validate, valid } from '../validator/validator';
import { store } from '../../redux/store' ;
import { setCurrentUser } from '../../redux/user/user.actions' ;

const validUser = valid.user;

const url = {
    signUp  : "/user/sign-up" ,
    signIn  : "/user/sign-in" ,
    signOut : "/user/sign-out",
};

export const user = {
        
    signUp  : async ( signUpData ) => {
        await validate( validUser.signUp, signUpData );
        return await axios.post( url.signUp, signUpData );
    },

    signIn : async ( signInData ) => {
        
        await validate( validUser.signIn, signInData );
        const res =  await axios.post( url.signIn, signInData );
        
        axios.defaults.headers.common["Authorization"] = res.AccessToken;       
        localStorage.setItem( "nextRefreshTime" , moment().add(1,'days') );

        return res;
    },

    signOut : async () => { clearAllData(); return await axios.get( url.signOut ); }

}

// Executed During signOut ( found in request.user.signOut )
function clearAllData(){
    localStorage.clear();
    // Clears all Cookie  ( From : https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript )
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    store.dispatch(setCurrentUser(null));
}
