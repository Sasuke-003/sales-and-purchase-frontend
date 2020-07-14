import axios from 'axios' ;
import { validate } from './validator.js' ;
import { store } from './redux/store'
import { setCurrentUser } from './redux/user/user.actions';

let ReqID = 0  // --Dev
axios.defaults.baseURL = 'http://localhost:9999' ;
axios.defaults.withCredentials = true

axios.interceptors.request.use( async req => {
    console.log( `ReqID : ${(++ReqID)}` ) ; //-Dev
    console.log( req.data ) ;    //-Dev
    req.ResID = ReqID ; //-Dev
        await validate( req ) ;
        return req;
    }, err =>  {
        return Promise.reject( err );
    });

axios.interceptors.response.use( 
    res => {
        console.log( `ResID : ${ res.config.ResID }` ) ; //-Dev
        console.log( res.data ) ; //-Dev
        return res.data.data ;
    },
    async err =>  {
        console.log( `ResErr : ${err.config.ResID}` ) ; //-Dev
        console.log( err.response.data ) ; //-Dev
        switch ( err.response.data.code ) {
            case 2 :    // Token Invalid
            case 9 : {  // Refresh Token Expired
                // Code to Log out 
                // ...
                store.dispatch(setCurrentUser(null));
                console.log( 'Logging Out') ; //-Dev
                return Promise.reject( err ) ;
            }
            case 8 : { // Access Token Expired - Get new Access Token And Retry
                return await newAccessTokenAndRetry( err.config ) ;
            }
            default : {
                if ( err.response.data.info )alert( err.response.data.info ) ;
                return Promise.reject( err.response.data  ) ;
            }
        }
    });
const newAccessToken = async () => {
    const res = await axios.post( '/auth/access-token' ) ;
    axios.defaults.headers.common['Authorization'] = res.AccessToken ;
    return res.AccessToken ;
}
const newAccessTokenAndRetry = async prevReq => {
    try {
        prevReq.headers[ 'Authorization']  = await newAccessToken() ;
        return await axios.request( prevReq ) ;
    } catch ( err ) {
        console.log( 'caught ') //-Dev
        throw err ;
    }
}

// New Token On Refresh
console.log( 'sending ')
axios.post( '/auth/refresh-token', {} )
    .then( res => { 
        console.log( 'Token Verified - Logging In User' ) ;
        axios.defaults.headers.common['Authorization'] = res.AccessToken ;
        // Code Redirecting To Home Page 
        // ..
    })
    .catch( err => {
        console.log( 'Token Error - Redirecting To Login Page' ) ;
        // Code to Log out 
        // ...
        store.dispatch(setCurrentUser(null));
    }) ;