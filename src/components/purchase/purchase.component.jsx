import React, { Component } from 'react';
import ItemTable from '../item-input/item-input.component';
import Divider from '@material-ui/core/Divider';
import MyFloatingButton from '../my-floating-button/my-floating-button'
import axios from 'axios';
import './purchase.styles.css'

class Purchase extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            data : [  ],

            cart : [ ]
        }

    }
    
    componentDidMount(){
        this.addItem();
    }


    addItem = () => {
        const { cart, data } = this.state;
        const newItem = {
            units: '',
            id: Date.now()
        };
        const newData = ['india', 'france', 'japan'];
        cart.push(newItem);
        data.push(newData);
        this.setState({});
    }

    deleteItem = (id, i) => {
        const newCart = this.state.cart.filter((item) => item.id !== id);
        const newData = this.state.data.filter((item, index) => index !== i);
        this.setState({
            cart: newCart,
            data: newData
        })
    }

    handleChange = (event, index) => {
        const { cart } = this.state;
        cart[index]['units'] = event.target.value;
        this.setState({});
    }

    submitItem = () => {
        const { cart } = this.state;
        for(let i=0; i<cart.length;i++){
            console.log(document.getElementById('name'+cart[i].id).value);
            console.log(document.getElementById('quantity'+cart[i].id).value);
            console.log(cart[i]['units']);
            axios.post( 'http://localhost:9999/item/add',
            {
                Name: document.getElementById('name'+cart[i].id).value,
                Unit: cart[i]['units'],
                Qty: document.getElementById('quantity'+cart[i].id).value
            }
            
            )
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        }
        }


       

    render() {
        const { data, cart } = this.state;
        return (
            <div>
            {
                cart.map((item, index) => (
                    <div key={item.id} className='item-container'>
                        <ItemTable data={data[index]} item={item} deleteItem={this.deleteItem} index={index} handleChange={this.handleChange} /> 
                        <Divider /> 
                    </div>
                ))
            }
            <MyFloatingButton onClick={this.addItem} />
            <MyFloatingButton onClick={this.submitItem} done/>
            </div>
        );
    }
}

export default Purchase;