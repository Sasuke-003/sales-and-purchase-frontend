import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'

import MyTextField from '../my-text-field/my-text-field';
import MyTypography from '../my-typography/my-typography'
import './item-input.styles.css'



const ItemTable = ({ data, item, deleteItem, index, handleChange }) => {
  const currencies = [
    {
      value: 'kg',
      label: 'KG',
    },
    {
      value: 'l',
      label: 'L',
    },
    {
      value: 'units',
      label: 'UNITS',
    },
  ];

  
  return(
    <div className='item' >
    <Grid container spacing={1} tent={'center'} justify={'center'}>
    <Grid item xs={12} sm={1} justify='center' alignContent='center' >
    <div className='item-heading'><MyTypography className='item-heading' variant='h4'>{index+1}</MyTypography></div>
    </Grid>
    <Grid item xs={10} sm={4} >
      <MyTextField 
        className='item-detail'
        id={'name'+item.id}
        type='text'
        label='NAME'
        datalist={data}
        fullWidth
      />
      </Grid>
      <Grid item xs={10} sm={3}>
      <MyTextField 
        className='item-detail'
        id={'quantity'+item.id}
        type='number'
        label='QUANTITY'
        fullWidth
      />
      </Grid>
      <Grid item xs={10} sm={3}>
      <TextField  
        className='item-detail'
        id="standard-select-currency"
        select
        value={item.units}
        onChange={(event) => handleChange(event, index)}
        label="Select"
        fullWidth
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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