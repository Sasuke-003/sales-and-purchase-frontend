import React, { Component } from 'react';
import AddItemTable from '../add-item-input/add-iten-input.component';
import Divider from '@material-ui/core/Divider';
import MyFloatingButton from '../my-floating-button/my-floating-button';
import axios from 'axios';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddItemPopup from '../add-item-popup/add-item-popup.component';


let timerID ;
const timeOutValue = 100 ;
let s = new Set();

class AddItem extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            data : [ ],

            cart : [ ],

            popperStatus : false
        }

    }

     handleClick = (event) => {
        this.setState({
            popperStatus: !this.state.popperStatus
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
        if ( timerID ) clearTimeout( timerID ) ;
        timerID = setTimeout( () =>{
            timerID = undefined ;
            const searchword = value;
            if (searchword !== ''){
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

    submitItem = () => {
        // const { cart } = this.state;
        // for(let i=0; i<cart.length;i++){
        //     console.log(document.getElementById('name'+cart[i].id).value);
        //     console.log(document.getElementById('quantity'+cart[i].id).value);
        //     console.log(cart[i]['units']);
        // }
        this.state.cart.map(async (c) => (
           await axios.post('/item/add', {
                Name: c.Name,
                Unit: c.Unit,
                Qty: c.Qty,
            })
        ));
        this.setState({cart: []})
        console.log(this.state.cart);
    }


    render() {
        const { data, cart, popperStatus } = this.state;
        return (
            <div>
                {
                    cart.map((item, index) => (
                        <div key={item.id} className='item-container'>
                            <AddItemTable data={data} item={item} deleteItem={this.deleteItem} index={index} handleChange={this.handleChange}
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
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Items"}</DialogTitle>
                    <DialogContent>
                        <AddItemPopup data={data} cart={cart} />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.submitItem} color="primary" autoFocus>
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


export default connect(mapStatetoProps)(AddItem);


