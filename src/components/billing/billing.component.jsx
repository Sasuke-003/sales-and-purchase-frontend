import React, { Component } from 'react';
import ItemTable from '../item-input/item-input.component';
import Divider from '@material-ui/core/Divider';
import MyFloatingButton from '../my-floating-button/my-floating-button';
import axios from 'axios';
import { connect } from 'react-redux'



let timerID ;
const timeOutValue = 500 ;
let s = new Set();

class Billing extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            data : [ ],

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
        }
    }

    handleItemChange = id => {
        if ( timerID ) clearTimeout( timerID ) ;
        timerID = setTimeout( () =>{
            timerID = undefined ;
            const config = {
             headers: {
               'Authorization': this.props.currentUser.userToken,
             }
         }
            const searchword = document.getElementById('name'+id).value;
            axios.get('http://localhost:9999/item?s='+searchword, config).then(
                (res) => {
                 const { data } = this.state;
                 for(let i=0; i<res.data.data.length; i++){
                     if(!s.has(res.data.data[i].Name)){
                         data.push(res.data.data[i].Name);
                         s.add(res.data.data[i].Name);
                     }
                 }
                 this.setState({})
             }
 
            ).catch((error) => {
             
                 console.log(error)
         })
 
        } , timeOutValue ) ;
     }

    render() {
        const { data, cart } = this.state;
        return (
            <div>
            {
                cart.map((item, index) => (
                    <div key={item.id} className='item-container'>
                        <ItemTable data={data} item={item} deleteItem={this.deleteItem} index={index} handleChange={this.handleChange}
                        handleItemChange={this.handleItemChange}
                         /> 
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

const mapStatetoProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStatetoProps)(Billing);