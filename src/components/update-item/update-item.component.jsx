import React, { Component } from 'react';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


import ItemPopup from '../popup/popup.component';
import AddItemTable from '../add-item-input/add-iten-input.component';
import MyFloatingButton from '../my-floating-button/my-floating-button';


import { req } from '../../url/url'


let timerID ;
const timeOutValue = 100 ;
let dataSet = new Set();
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.Name === val ? a + 1 : a), 0);


class AddItem extends Component {

    constructor() {
        super();
        
        this.state={

            data           : [ ],
            cart           : [ ],
            popperStatus   : false,
            submitDisabled : false,

        }

    }


    handleOpen = () => {

        this.setState( { popperStatus: true } );

        const { data, cart } = this.state;
        let disabled = false;

        for ( let i=0; i<cart.length; i++ ){

            if ( data.indexOf(cart[i].Name) === -1 || cart[i].Name === '' || cart[i].Qty === '' || cart[i].Unit === '' || countOccurrences(cart, cart[i].Name) > 1  ){
                
                disabled = true;
                break;

            }

        }

        this.setState( { submitDisabled: disabled } )

    }
    
    handleClose = (event) => {

        this.setState( { popperStatus: false } );

    }
    
    
    componentDidMount(){

        this.addItem();
        dataSet.clear();

    }


    addItem = () => {

        this.setState({

            cart:   [...this.state.cart, 

                        {
                            Name : '',
                            Qty  : '',
                            Unit : '',
                            id   : Date.now()
                        }

                    ]

        });

    }


    deleteItem = ( id ) => {

        this.setState( { cart: this.state.cart.filter( ( c ) => c.id !== id ), } );

    }


    handleOtherChange = (event, id) => {

        const { name, value } = event.target;

        this.setState({

            cart: this.state.cart.map( ( c ) => {

                if (c.id !== id) return c;
                return { ...c, [name]: value }

            })

        });

    }


    handleChange = (event, id) => {

        const { name, value } = event.target;

        this.setState({

            cart: this.state.cart.map( ( c ) => {

                if (c.id !== id) return c;
                return {...c, [event.target.name]: value }

            })

        });

        if ( name === 'Name' ){

            if ( timerID ) clearTimeout( timerID ) ;

            timerID = setTimeout( async () =>{

                timerID = undefined ;
                const searchData = { S: value };

                if (  searchData.S !== ''){
                    
                    const res = await req.item.autoCompleteData( searchData );

                        for( let i=0; i<res.length; i++ ){

                            if( !dataSet.has( res[i].Name ) ){
 
                                this.setState( { data: this.state.data.concat( res[i].Name ) } );
 
                                dataSet.add(res[i].Name);
                            }
                        }

                        if ( this.state.data.indexOf( value ) !== -1 ){

                            const itemDetailData = { Name: value } 
                            const res = await req.item.detail( itemDetailData );

                            this.setState({

                                cart: this.state.cart.map((c) => {

                                    if (c.id !== id) return c;
                                    return {...c, 'Qty':res.Qty, 'Unit': res.Unit }

                                })

                            });

                        }

                }

                
            } , timeOutValue ) ;

        }
       
        
    }


    submitItem = () => {
        
        this.state.cart.map(async ( c ) => (
            
            await req.item.update( {

                Name : c.Name,
                Unit : c.Unit,
                Qty  : c.Qty,

            } )
          
        ));

        this.setState( { cart: [] } );
        this.handleClose();

    }


    render() {

        const { data, cart, popperStatus, submitDisabled } = this.state;

        return (

            <div>

                {
                    cart.map((item, index) => (

                        <div key={item.id} className='item-container'>

                            <AddItemTable 
                                data={data} 
                                item={item} 
                                deleteItem={this.deleteItem} 
                                index={index} 
                                handleChange={this.handleChange}
                                handleOtherChange={this.handleOtherChange}
                            /> 
                            <Divider /> 

                        </div>

                    ))

                }

                <MyFloatingButton onClick={this.addItem} />
                <MyFloatingButton onClick={this.handleOpen} done  disabled={cart.length ? false : true }   />

                <Dialog
                    open={popperStatus}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth='md'
                >

                    <DialogTitle id="alert-dialog-title">{"Confirm Items"}</DialogTitle>

                    <DialogContent>

                        <ItemPopup data={data} cart={cart} />

                    </DialogContent>

                    <DialogActions>

                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={this.submitItem} color="primary" autoFocus disabled={submitDisabled} >
                        Submit
                    </Button>

                    </DialogActions>

                </Dialog>

            </div>

        );

    }

}


export default AddItem;


