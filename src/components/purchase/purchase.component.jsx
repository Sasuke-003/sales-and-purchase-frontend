import React, { Component } from 'react';
import ItemTable from '../item-input/item-input.component';
import MyButton from '../my-button/my-button';
import Divider from '@material-ui/core/Divider';
import MyFloatingButton from '../my-floating-button/my-floating-button'
import './purchase.styles.css'

class Purchase extends Component {
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

    handleChange = (event) => {
        
    }

    submitItem = () => {
        const { cart } = this.state;
        for(let i=0; i<cart.length;i++){
            console.log(document.getElementById('name'+cart[i].id).value);
            console.log(document.getElementById('quantity'+cart[i].id).value);
            console.log(document.getElementById('units'+cart[i].id).value);
        }
    }

    render() {
        const { data, cart } = this.state;
        return (
            <div>
            {
                cart.map((item, index) => (
                    <div key={item.id} className='item-container'>
                        <ItemTable data={data} item={item}  handleChange={this.handleChange} deleteItem={this.deleteItem} index={index} /> 
                        <Divider /> 
                    </div>
                ))
            }
            <MyFloatingButton onClick={this.addItem} />
            <MyButton className='button' variant='contained' type='button' color='secondary' onClick={this.submitItem}  >
                SUBMIT ITEM
            </MyButton>
            </div>
        );
    }
}

export default Purchase;