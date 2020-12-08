import axios  from "axios";
import moment from 'moment';
import { user } from './user.api';


const url = {
    newAccTok : "/token/acc-tok",
    newRefTok : "/token/ref-tok",
}

export const token = {

    newAccessToken : async ( reqToBeRetried ) => {
        const res = await axios.get( url.newAccTok );
        try {
            axios.defaults.headers.common['Authorization'] = res.AccessToken ;
            if( reqToBeRetried ) return await retryReq( reqToBeRetried );
        } catch (err) { throw res; }
        return res;
    },

    newRefreshToken : async () => {

        // Next Refresh Time of Refresh Token
        const nextRefreshTime = localStorage.getItem( "nextRefreshTime" );
    
        try {
    
            if ( moment(nextRefreshTime) < moment() ) {
                localStorage.setItem( "nextRefreshTime" , moment().add(1,'days') )
                const res = await axios.get( url.newRefTok );
                axios.defaults.headers.common['Authorization'] = res.AccessToken ;
                return res;
            }

        } catch( err ) {
            await user.signOut();
            throw err;
        }
    }
}

async function retryReq( req ) {
    req.headers[ 'Authorization' ] = axios.defaults.headers.common['Authorization'] ;
    // because the data part will be in string format which has to be converted to json obj before sending
    if( req.data ) req.data = JSON.parse( `${req.data}` ) ;
    return await axios.request( req ) ; 
}
