import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';


const ViewItemPopup = ({ historyData }) => {
    return (
        <div>
        <Paper style={{maxHeight: 500, overflow: 'auto'}}>
        <List dense={true}>
                    <ListItem  key ={} >
                        <ListItemText
                            primary={`${c.Name}       ${c.Qty} ${c.Unit}`}
                            secondary={`${data.indexOf(c.Name) !== -1 ? "This item is already added!" : countOccurrences(cart, c.Name) > 1 ? "This item is already in cart!" : c.Qty === '' ? "Quantity cannot be empty!" : ""  }`}
                            secondaryTypographyProps={{style: {color:'red'}}}
                            primaryTypographyProps={{style: {fontSize:'20px'}}}
                        />
                    </ListItem>
                    <ListItem  key ={} >
                        <ListItemText
                            primary={`${c.Name}       ${c.Qty} ${c.Unit}`}
                            secondary={`${data.indexOf(c.Name) !== -1 ? "This item is already added!" : countOccurrences(cart, c.Name) > 1 ? "This item is already in cart!" : c.Qty === '' ? "Quantity cannot be empty!" : ""  }`}
                            secondaryTypographyProps={{style: {color:'red'}}}
                            primaryTypographyProps={{style: {fontSize:'20px'}}}
                        />
                    </ListItem>
                    <ListItem  key ={} >
                        <ListItemText
                            primary={`${c.Name}       ${c.Qty} ${c.Unit}`}
                            secondary={`${data.indexOf(c.Name) !== -1 ? "This item is already added!" : countOccurrences(cart, c.Name) > 1 ? "This item is already in cart!" : c.Qty === '' ? "Quantity cannot be empty!" : ""  }`}
                            secondaryTypographyProps={{style: {color:'red'}}}
                            primaryTypographyProps={{style: {fontSize:'20px'}}}
                        />
                    </ListItem>
            </List>
            </Paper>
        </div>
    );
};

export default ViewItemPopup;