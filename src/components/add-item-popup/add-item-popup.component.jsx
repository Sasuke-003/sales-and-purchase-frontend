import React from 'react';


import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';


const countOccurrences = ( arr, val ) => arr.reduce( ( a, v ) => ( v.Name === val ? a + 1 : a ) , 0 );


const AddItemPopup = ( { data, cart, text } ) => {

    return (

        <div>

            <Paper style={{maxHeight: 500, overflow: 'auto'}}>

                <List dense={true}>

                    {
                        cart.map(( c, index ) => (
                            <ListItem  key ={index} >
                                <ListItemText

                                    primary={ `${c.Name} ${c.Qty} ${c.Unit}` }
                                    secondary={`${data.indexOf(c.Name) !== -1 ? "This item is already added!" : countOccurrences(cart, c.Name) > 1 ? "This item is already in cart!" : c.Qty === '' ? "Quantity cannot be empty!" : ""  }`}
                                    secondaryTypographyProps={{style: {color:'red'}}}
                                    primaryTypographyProps={{style: {fontSize:'20px'}}}

                                />
                            </ListItem>
                        ))
                    }

                </List>

            </Paper>

        </div>

    );

};


export default AddItemPopup;