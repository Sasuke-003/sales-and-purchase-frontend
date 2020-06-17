import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

import MyTextField from '../my-text-field/my-text-field';
import MyTypography from '../my-typography/my-typography'
import './item-input.styles.css'


const ItemTable = ({ data, handleChange, item, deleteItem, index }) => {
  return(
    <div className='item' spacing={0}>
    <Grid container >
    <Grid item xs={12} sm={1} >
      <MyTypography className='item-heading' variant='h5'>{index+1}</MyTypography>
    </Grid>
    <Grid item xs={12} sm={4} >
      <MyTextField 
        id={'name'+item.id}
        type='text'
        label='NAME'
        datalist={data}
      />
      </Grid>
      <Grid item xs={12} sm={3}>
      <MyTextField 
        id={'quantity'+item.id}
        type='number'
        label='QUANTITY'
      />
      </Grid>
      <Grid item xs={12} sm={3}>
      <MyTextField 
        id={'units'+item.id}
        type='number'
        label='UNITS'
      /> 
      </Grid>
      <Grid item xs={12} sm={1}>
      <IconButton  aria-label="delete" onClick={() => deleteItem(item.id)} >
          <DeleteIcon fontSize="large" />
      </IconButton>
      </Grid>
      </Grid>
    </div>
    
  )
}


export default ItemTable;