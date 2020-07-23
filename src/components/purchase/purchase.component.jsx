import React, { Component } from 'react';
import ItemTable from '../item-input/item-input.component';
import Divider from '@material-ui/core/Divider';
import MyFloatingButton from '../my-floating-button/my-floating-button'
import axios from 'axios';
import { connect } from 'react-redux'
import './purchase.styles.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ItemPopup from '../popup/popup.component';
import MyTextField from '../my-text-field/my-text-field'

let timerID ;
const timeOutValue = 500 ;
let s = new Set();
let sd = new Set();

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.Name === val ? a + 1 : a), 0);


class Purchase extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            sellerName: '',
            data : [ ],
            cart : [ ],
            Error: true,
            sellerData: [],
            helperText: 'Seller name cannot be empty!',

            popperStatus : false,

            submitDisabled : false
        }
    }
    
    handleOpen = (event) => {
        this.setState({
            popperStatus: true
        })
        const { data, cart } = this.state;
        let disabled = false;
        for ( let i=0; i<cart.length; i++ ){
            if ( data.indexOf(cart[i].Name) === -1 || cart[i].Name === '' || cart[i].Qty === '' || cart[i].Unit === '' || countOccurrences(cart, cart[i].Name) > 1  ){
                disabled = true;
                break;
            }
        }
        this.setState({
            submitDisabled: disabled
        })

      }
    
     handleClose = (event) => {
        this.setState({
            popperStatus: false
        })
     }
    

    componentDidMount(){
        this.addItem();
        s.clear();
        sd.clear();
    }


    addItem = () => {
        this.setState({
            cart: [...this.state.cart, {
                            Name: '',
                            Qty: '',
                            Unit: '',
                            AQty: '',
                            id: Date.now()
                    }]
        });
    }

    deleteItem = (id, i) => {
        this.setState({
            cart: this.state.cart.filter((c) => c.id !== id ),
        })
    }

    handleOtherChange = (event, index, id) => {
        const { value } = event.target;
        this.setState({
            cart: this.state.cart.map((c) => {
                if (c.id !== id) return c;
                return {...c, [event.target.name]: value }
            })
        });
    }

    handleSellerChange = event => {
        let error = false;
        let helperText = '';
        const { name, value } = event.target;
        this.setState({
                [name]: value
        });
        if ( timerID ) clearTimeout( timerID ) ;
        timerID = setTimeout( async () =>{
            timerID = undefined ;
            const searchword = value;
            if (  searchword !== ''){
                const res = await axios.post('/seller', {"S":searchword})
                for(let i=0; i<res.length; i++){
                    if(!sd.has(res[i].Name)){
                        this.setState({
                            sellerData: this.state.sellerData.concat(res[i].Name)
                        });
                        sd.add(res[i].Name);
                    }
                }
                if (this.state.sellerData.indexOf(value) === -1) {
                    error = true;
                    helperText = 'This seller is not Available!';
                }
            }else {
                error = true;
                helperText = 'Seller name cannot be empty!';
            }

            this.setState({
                Error: error,
                helperText: helperText
            })
        } , timeOutValue ) ;
    }

    handleChange = (event, index, id) => {
        const { value } = event.target;
        this.setState({
            cart: this.state.cart.map((c) => {
                if (c.id !== id) return c;
                return {...c, [event.target.name]: value }
            })
        });
        if (event.target.name === 'Name'){
            if ( timerID ) clearTimeout( timerID ) ;
            timerID = setTimeout( async () =>{
                timerID = undefined ;
                const searchword = value;
                if (  searchword !== ''){
                    const res = await axios.post('/item', {"S":searchword})
                            for(let i=0; i<res.length; i++){
                                if(!s.has(res[i].Name)){
                                    this.setState({
                                        data: this.state.data.concat(res[i].Name)
                                    });
                                    s.add(res[i].Name);
                                }
                            }
                            if (this.state.data.indexOf(value) !== -1){
                                axios.post('/item/detail', {Name: value}).then((res) => {
                                    this.setState({
                                        cart: this.state.cart.map((c) => {
                                                if (c.id !== id) return c;
                                        return {...c, 'AQty': res.Qty,'Unit': res.Unit }
                                    })});
                                })
                            }
                }
                
            } , timeOutValue ) ;
        }
    }

    submitItem = async () => {
        let newCart = [];
        this.state.cart.map((c) => (
            newCart.push({Name: c.Name, Qty: c.Qty})
         ));
        const PurchaseData = {
            SellerName: this.state.sellerName,
            Items: newCart
        }
        await axios.post('/purchase/create', PurchaseData);
        this.setState({cart: [], sellerName: ''})
        this.handleClose();
        alert("Successfully Purchased") 
    }


       

    render() {
        const { Name, data, cart, popperStatus, submitDisabled, helperText, sellerData, Error } = this.state;
        return (
            <div>
            <MyTextField 
                key={0}
                className='col-4 col-s-4'
                name='sellerName'
                value={Name}
                onChange={this.handleSellerChange}
                type='text'
                label='SELLER NAME'
                error={Error}
                helperText={helperText}
                datalist={sellerData}
                />
            {
                cart.map((item, index) => (
                    <div key={item.id} className='item-container'>
                        <ItemTable data={data} item={item} deleteItem={this.deleteItem} index={index} handleChange={this.handleChange} 
                        handleOtherChange={this.handleOtherChange}
                        /> 
                        <Divider /> 
                    </div>
                ))
            }
            <MyFloatingButton onClick={this.addItem} />
            <MyFloatingButton onClick={this.handleOpen} done  disabled={cart.length && !Error ? false : true }   />
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

const mapStatetoProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStatetoProps)(Purchase);