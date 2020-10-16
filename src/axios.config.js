import   axios      from 'axios';
import { Logger   } from './logger';
import { req      } from './url/url';
import { validate } from './validator.js';

const log = new Logger();

axios.defaults.baseURL = 'http://localhost:9999';
axios.defaults.withCredentials = true;

axios.interceptors.request.use( async req => {
    log.request( req );
    await validate( req );
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
        log.response( err );
        const code = err?.response?.data?.code 
        if( code === undefined ){
            // If Server isn't running
            console.warn( "FAILED:  Cannot reach the server" );
            return Promise.reject( err?.response?.data  );
        }
        else switch ( code ) {

            case 2 : // code(2) -> Token Invalid
            case 4 : // code(4) -> Refresh Token Expired

                // Force Sign Out
                req.user.signOut(); break;

            case 3 : // code(4) -> Access Token Expired - Get new Access Token And Retry the Request
            
                const failedReq = err.config;

                // Gets the new Access Token, and retries failed request automatically
                return await req.auth.newAccessToken( failedReq );

            default : if ( err.response.data.info ) alert( err.response.data.info );
        }
    });

req.auth.newRefreshToken();
req.auth.newAccessToken();