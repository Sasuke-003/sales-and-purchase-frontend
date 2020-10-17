import   axios      from 'axios';
import   moment     from 'moment';
import { request }  from './request';
import { Logger   } from './logger';

const log = new Logger();

axios.defaults.baseURL = 'http://localhost:9999';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = "";

axios.interceptors.request.use( async req => {
    log.request( req );
    return req;

    }, err => {
        console.warn( "Something went wrong in Req-Interceptor");
        console.log( err );
        return Promise.reject( err );
    }
)

axios.interceptors.response.use( 
    res => {
        log.response( res );
        return res?.data?.data;
    },

    async err =>  {
        
        const failedReq = err.config;

        log.response( err );
        const code = err?.response?.data?.code 

        // If Server isn't running code will be undefined 
        if( code === undefined ){
            console.warn( "FAILED:  Cannot reach the server or invalid URL" );
            return Promise.reject( err?.response?.data  );
        }
        else switch ( code ) {

            case 2 : // code(2) -> Token Invalid
            case 9 : // code(9) -> Refresh Token Expired

                // Force Sign Out
                return request.user.signOut();

            case 11 : // code(11) -> Access Token Not Found
                // Since this happens only once while reloading the page, a request to obtain new refTok is made.
                // And after successfully obtaining the new token, "failedReq" will be retried
                return await getNewRefreshToken(failedReq);

            case 8  : // code(8) -> Access Token Expired - Get new Access Token And Retry "failedReq" ( happens automatically )
                return await getNewAccessToken( failedReq );

            default : if ( err?.response?.data?.info ) alert( err.response.data.info );
        }
    }
);


async function retryReq( req ) {
    req.headers[ 'Authorization'] = axios.defaults.headers.common['Authorization'] ;
    // because the data part will be in string format which has to be converted to json obj before sending
    if( req.data ) req.data = JSON.parse( `${req.data}` ) ;
    return await axios.request( req ) ; 
}
    
async function getNewAccessToken( reqToBeRetried ) {
    const res = await axios.get( URL.token.newAccTok );
    axios.defaults.headers.common['Authorization'] = res.AccessToken ;
    if( reqToBeRetried ) return await retryReq( reqToBeRetried );
}
    
async function getNewRefreshToken( reqToBeRetried ) {

    // Next Refresh Time of Refresh Token
    const nextRefreshTime = localStorage.getItem( "nextRefreshTime" );

    try {

        if ( moment(nextRefreshTime) < moment() ) {
            localStorage.setItem( "nextRefreshTime" , moment().add(1,'days') )
            const res = await axios.get( URL.token.newRefTok );
            axios.defaults.headers.common['Authorization'] = res.AccessToken ;
        }

        if( reqToBeRetried ) return await retryReq( reqToBeRetried );

    } catch( err ) {
        await request.user.signOut();
        throw err;
    }
}
    
