import axios from 'axios' ;
import { validate } from './validator.js' ;

let setToken = false ;

axios.defaults.baseURL = 'http://192.168.225.4:9999' ;

axios.interceptors.request.use( async req => {
        console.log( req )
        await validate( req ) ;
        if( req.url === '/user/login' ) setToken = true ;
        return req;
    }, err =>  {
        return Promise.reject( err );
    });

axios.interceptors.response.use( res => {
        console.log( res.data ) ;
        if( setToken ) setAccessToken( res.data.data.userToken ) ;
        return res.data.data ;
    }, err =>  {
        console.log( err.response.data ) ;
        alert( err.response.data.info ) ;
        return Promise.reject( err.response.data  );
    });

function setAccessToken( token ) {
    setToken = false ;
    axios.defaults.headers.common['Authorization'] = token ;
    console.log( 'token set')
}