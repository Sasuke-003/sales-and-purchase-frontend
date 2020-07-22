import React, { Component } from 'react';
import axios from 'axios';

import InputField from '../input-field/inputfield.component'
import MyButton from '../my-button/my-button';




let timerID ;
const timeOutValue = 500 ;
let s = new Set();


class Seller extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            Name: '',
            Error: false,
            helperText: '',
            data: ''
        };

    }

    componentDidMount(){
        s.clear();
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
                ...this.state,
                [name]: value
        });
        if ( timerID ) clearTimeout( timerID ) ;
        timerID = setTimeout( () =>{
            timerID = undefined ;
            const searchword = value;
            if (  searchword !== ''){
                axios.post('/seller', {"S":searchword}).then(
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

    handleSubmit = (event) => {
        event.preventDefault();
        const SellerData = {
            Name: this.state.Name
        }
        if (!this.state.isPasswordError){
            axios.post( '/seller/add', SellerData)
            .then((res) => {
                alert("successfully Registered")      
            })
            .catch((error) => {
                console.log('gone')
            });
        }
        else{
            // alert('password does not match')
        }
    }

    render() {
        const { Name, Error, data, helperText } = this.state;
        return (
            <div className='sign-up'>
            <form onSubmit={this.handleSubmit} >
                    <InputField 
                        className='col-4 col-s-4'
                        name='Name'
                        value={Name}
                        onChange={this.handleChange}
                        type='text'
                        label='FULL NAME'
                        error={Error}
                        helperText={helperText}
                        datalist={data}
                    />
                    <MyButton className='button' variant='contained' type='submit' color='secondary'>
                        ADD SELLER
                    </MyButton>
                    </form>
            </div>
        );
    }
}


export default Seller;