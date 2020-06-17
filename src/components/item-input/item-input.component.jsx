import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

import MyTextField from '../my-text-field/my-text-field';
import MyTypography from '../my-typography/my-typography'
import './item-input.styles.css'


const ItemTable = ({ data, handleChange, item, deleteItem, index }) => {
  return(
    <div className='item'>
    <MyTypography className='item-heading' variant='h5'>ITEM {index+1}</MyTypography>
    <Grid container >
    <Grid item xs={12} sm={4} >
      <MyTextField 
        name='name'
        type='text'
        onChange={(event) => handleChange(event, item.id)}
        value={item.name}
        label='NAME'
        datalist={data}
      />
      </Grid>
      <Grid item xs={12} sm={3}>
      <MyTextField 
        name='quantity'
        type='number'
        onChange={(event) => handleChange(event, item.id)}
        value={item.quantity}
        label='QUANTITY'
      />
      </Grid>
      <Grid item xs={12} sm={3}>
      <MyTextField 
        name='units'
        type='number'
        onChange={(event) => handleChange(event, item.id)}
        value={item.units}
        label='UNITS'
      /> 
      </Grid>
      <Grid item xs={12} sm={2}>
      <IconButton  aria-label="delete" onClick={() => deleteItem(item.id)} >
          <DeleteIcon fontSize="large" />
      </IconButton>
      </Grid>
      </Grid>
    </div>
    
  )
}


export default ItemTable;