import React, { Component } from 'react';
import ItemTable from '../item-input/item-input.component';
import MyButton from '../my-button/my-button';
import Divider from '@material-ui/core/Divider';
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
            name:'',
            quantity:0,
            units:0,
            id: Date.now()
        };
        cart.push(newItem);
        this.setState({
            cart: cart
        });
    }

    deleteItem = (id) => {
        const newCart = this.state.cart.filter((item) => item.id !== id);
        this.setState({
            cart: newCart
        })
    }

    handleChange = (event, id) => {
        const { cart } = this.state;
        const { name, value } = event.target;
        cart.map((item) => {
            if (item.id === id){
                item[name] = value;
            }
            console.log(item.id);
                console.log(id);
        });
        this.setState({
            cart: cart
        }, () => {
            console.log(this.state)
        })
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
            <MyButton className='button' variant='contained' type='button' color='secondary' onClick={this.addItem}  >
                ADD ITEM
            </MyButton>
            </div>
        );
    }
}

export default Purchase;