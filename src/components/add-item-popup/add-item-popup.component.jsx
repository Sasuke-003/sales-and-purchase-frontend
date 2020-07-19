import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import './add-item-popup.styles.css'

const AddItemPopup = ({ data, cart }) => {
    return (
        <div>
        <Paper style={{maxHeight: 500, overflow: 'auto'}}>
        <List dense={true}>
            {
                cart.map((c, index) => (
                    <ListItem  key ={index} >
                        <ListItemText
                            primary={`${c.Name}       ${c.Qty} ${c.Unit}`}
                            secondary={`${data.indexOf(c.Name) !== -1 ? "This item is already added!" : ""}`}
                            secondaryTypographyProps={{style: {color:'red'}}}
                            primaryTypographyProps={{style: {fontSize:'20px'}}}
                        />
                </ListItem>
                ))
            }
            {
                console.log("yo")
            }
            </List>
            </Paper>
        </div>
    );
};

export default AddItemPopup;