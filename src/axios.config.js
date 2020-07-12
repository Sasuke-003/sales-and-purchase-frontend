import axios from 'axios' ;
import { validate } from './validator.js' ;

let myVar;
let interval = 50  // in sec

axios.defaults.baseURL = 'http://localhost:9999' ;

axios.interceptors.request.use( async req => {
        console.log( req )
        await validate( req ) ;
        return req;
    }, err =>  {
        return Promise.reject( err );
    });

axios.interceptors.response.use( res => {
        console.log( res.data ) ;
        return res.data.data ;
    }, err =>  {
        console.log( err.response.data ) ;
        alert( err.response.data.info ) ;
        return Promise.reject( err.response.data  );
    });

export const setToken = (token) => {
    myVar = setInterval(myTimer, interval*1000, token);
}

function myTimer(token) {
  axios.defaults.headers.common['Authorization'] = token;
  console.log('send')
}

export const myStopFunction = () => {
  clearInterval(myVar);
  console.log('done')
}



export default axios;