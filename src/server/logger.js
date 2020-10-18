export class Logger {
    
    constructor() {
        this.reqID = 0;
    }

    request( req ){
        console.warn( `Request : ${( this.reqID )}, url : ${req.url}` ) ; 
        console.log( req.data ) ;
        req.reqID   = this.reqID ;
        this.reqID += 1 ;
    }

    response( res ){
        const resInfo = res?.config ;
        console.warn( `~Response : ${( resInfo?.reqID )}, url : ${resInfo?.url}` ) ;
        
        const okCode = res?.data?.code;
        const errCode = res?.response?.data?.code ;

        if( okCode !== undefined ){
            console.warn( `Code: ${okCode}`)
            console.log( res?.data ) ;
        } 
        else {
            console.warn( `Error code: ${errCode}`);
            console.log( res?.response?.data ); 
        }
    }
}
