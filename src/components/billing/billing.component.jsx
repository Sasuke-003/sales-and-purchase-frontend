import React, { Component } from 'react';
import ItemTable from '../item-input/item-input.component';
import Divider from '@material-ui/core/Divider';
import MyFloatingButton from '../my-floating-button/my-floating-button';
import axios from 'axios';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ItemPopup from '../popup/popup.component';



let timerID ;
const timeOutValue = 500 ;
let s = new Set();


const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.Name === val ? a + 1 : a), 0);


class Billing extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            data : [ ],

            cart : [ ],

            popperStatus : false,

            submitDisabled : false
        }

    }

    handleClick = (event) => {
        this.setState({
            popperStatus: !this.state.popperStatus
        })
        const { data, cart } = this.state;
        let disabled = false;
        for ( let i=0; i<cart.length; i++ ){
            if ( data.indexOf(cart[i].Name) === -1 || cart[i].Name === '' || cart[i].Qty === '' || countOccurrences(cart, cart[i].Name) > 1  ){
                disabled = true;
                break;
            }
        }
        this.setState({
            submitDisabled: disabled
        })

      }
    
    
    componentDidMount(){
        this.addItem();
    }


    addItem = () => {
        this.setState({
            cart: [...this.state.cart, {
                            Name: '',
                            Qty: '',
                            Unit: '',
                            id: Date.now()
                    }]
        });
    }

    deleteItem = (id, i) => {
        this.setState({
            cart: this.state.cart.filter((c) => c.id !== id ),
        })
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
            timerID = setTimeout( () =>{
                timerID = undefined ;
                const searchword = value;
                if (  searchword !== ''){
                    axios.post('/item', {"S":searchword}).then(
                        (res) => {
                            for(let i=0; i<res.length; i++){
                                if(!s.has(res[i].Name)){
                                    this.setState({
                                        data: this.state.data.concat(res[i].Name)
                                    });
                                    s.add(res[i].Name);
                                }
                            }
                        }
        
                    ).catch((error) => {
                        console.log(error)
                    })
                }
    
            } , timeOutValue ) ;
        }
        if (this.state.data.indexOf(value) !== -1){
            axios.post('/item/detail', {Name: value}).then((res) => {
                console.log(res);
                this.setState({
                    cart: this.state.cart.map((c) => {
                            if (c.id !== id) return c;
                    return {...c, 'Unit': res[0].Unit }
                })});
                console.log(res[0].Name);
            })
        }
    }

    submitItem = () => {
        // const { cart } = this.state;
        // for(let i=0; i<cart.length;i++){
        //     console.log(document.getElementById('name'+cart[i].id).value);
        //     console.log(document.getElementById('quantity'+cart[i].id).value);
        //     console.log(cart[i]['units']);
        // }
        console.log(this.state);
    }

    render() {
        const { data, cart, popperStatus, submitDisabled } = this.state;
        return (
            <div>
            {
                cart.map((item, index) => (
                    <div key={item.id} className='item-container'>
                        <ItemTable data={data} item={item} deleteItem={this.deleteItem} index={index} handleChange={this.handleChange}
                        /> 
                        <Divider /> 
                    </div>
                ))
            }
            <MyFloatingButton onClick={this.addItem} />
            <MyFloatingButton onClick={this.handleClick} done  disabled={cart.length ? false : true }   />
                <Dialog
                    open={popperStatus}
                    onClose={this.handleClick}
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
                    <Button onClick={this.handleClick} color="primary">
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


export default connect(mapStatetoProps)(Billing);
