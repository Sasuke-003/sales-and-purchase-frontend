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
        this.setState({
            cart: [...this.state.cart, {
                            name: '',
                            quantity: '',
                            units: '',
                            id: Date.now()
                    }]
        });
    }

    deleteItem = (id, i) => {
        this.setState({
            cart: this.state.cart.filter((c, index) => index !== i ),
        })
    }

    handleChange = (event, index, id) => {
        this.setState({
            cart: this.state.cart.map((c, i) => {
                if (i !== index) return c;
                return {...c, [event.target.name]: event.target.value }
            })
        });
        if ( timerID ) clearTimeout( timerID ) ;
        timerID = setTimeout( () =>{
            timerID = undefined ;
            const searchword = this.state.cart[index].name;
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
        console.log(this.state);
    }

    render() {
        const { data, cart } = this.state;
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
            <MyFloatingButton onClick={this.submitItem} done/>
            </div>
        );
    }
}

const mapStatetoProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStatetoProps)(Billing);




// import React, { Component } from 'react';
// import ItemTable from '../item-input/item-input.component';
// import Divider from '@material-ui/core/Divider';
// import MyFloatingButton from '../my-floating-button/my-floating-button';
// import axios from 'axios';
// import { connect } from 'react-redux'



// let timerID ;
// const timeOutValue = 500 ;
// let s = new Set();

// class Billing extends Component {
//     constructor(props) {
//         super(props);
        
//         this.state={
//             data : [ ],

//             cart : [ ]
//         }

//     }
    
//     componentDidMount(){
//         this.addItem();
//     }


//     addItem = () => {
//         const { cart } = this.state;
//         const newItem = {
//             units: '',
//             id: Date.now()
//         };
//         cart.push(newItem);
//         this.setState({});
//     }

//     deleteItem = (id, i) => {
//         const newCart = this.state.cart.filter((item) => item.id !== id);
//         const newData = this.state.data.filter((item, index) => index !== i);
//         this.setState({
//             cart: newCart,
//             data: newData
//         })
//     }

//     handleChange = (event, index) => {
//         const { cart } = this.state;
//         cart[index]['units'] = event.target.value;
//         this.setState({});
//     }

//     handleItemChange = id => {
//         if ( timerID ) clearTimeout( timerID ) ;
//         timerID = setTimeout( () =>{
//             timerID = undefined ;
//             const searchword = document.getElementById('name'+id).value;
//             axios.get('/item?s='+searchword).then(
//                 (res) => {
//                     const { data } = this.state;
//                     for(let i=0; i<res.data.length; i++){
//                         if(!s.has(res.data[i].Name)){
//                             data.push(res.data[i].Name);
//                             s.add(res.data[i].Name);
//                         }
//                     }
//                     this.setState({})
//                 }
 
//             ).catch((error) => {
//                 console.log(error)
//             })
 
//         } , timeOutValue ) ;
//     }

//     submitItem = () => {
//         const { cart } = this.state;
//         for(let i=0; i<cart.length;i++){
//             console.log(document.getElementById('name'+cart[i].id).value);
//             console.log(document.getElementById('quantity'+cart[i].id).value);
//             console.log(cart[i]['units']);
//         }
//     }

//     render() {
//         const { data, cart } = this.state;
//         return (
//             <div>
//             {
//                 cart.map((item, index) => (
//                     <div key={item.id} className='item-container'>
//                         <ItemTable data={data} item={item} deleteItem={this.deleteItem} index={index} handleChange={this.handleChange}
//                             handleItemChange={this.handleItemChange}
//                         /> 
//                         <Divider /> 
//                     </div>
//                 ))
//             }
//             <MyFloatingButton onClick={this.addItem} />
//             <MyFloatingButton onClick={this.submitItem} done/>
//             </div>
//         );
//     }
// }

// const mapStatetoProps = state => ({
//     currentUser: state.user.currentUser
// });


// export default connect(mapStatetoProps)(Billing);