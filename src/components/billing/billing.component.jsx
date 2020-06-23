import React, { Component } from 'react';
import ItemTable from '../item-input/item-input.component';
import Divider from '@material-ui/core/Divider';
import MyFloatingButton from '../my-floating-button/my-floating-button'

class Billing extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            data : [  
                'india',
                'usa',
                'canada',
                'germany',
                'england',
                'russia'
            ],

            cart : [ ]
        }

    }
    
    componentDidMount(){
        this.addItem();
    }


    addItem = () => {
        const { cart } = this.state;
        const newItem = {
            units: '',
            id: Date.now()
        };
        cart.push(newItem);
        this.setState({});
    }

    deleteItem = (id) => {
        const newCart = this.state.cart.filter((item) => item.id !== id);
        this.setState({
            cart: newCart
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
        }
    }

    render() {
        const { data, cart } = this.state;
        return (
            <div>
            {
                cart.map((item, index) => (
                    <div key={item.id} className='item-container'>
                        <ItemTable data={data} item={item} deleteItem={this.deleteItem} index={index} handleChange={this.handleChange} /> 
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

export default Billing;