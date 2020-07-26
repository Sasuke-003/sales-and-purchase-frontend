import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


import MyTypography from '../my-typography/my-typography'
import InputField from '../input-field/inputfield.component'


import './item-input.styles.css'


class ItemTable extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {

    return shallowCompare( this, nextProps, nextState );

  }

  render(){

    const { data, item, deleteItem, index, handleChange, handleOtherChange } = this.props;

    return(
      
      <div className='item' >

        <Grid container spacing={1} tent={'center'} justify={'center'}>

          <Grid item xs={12} sm={1}  >

            <div className='item-heading'><MyTypography className='item-heading' variant='h4'>{index+1}</MyTypography></div>
            
          </Grid>

          <Grid item xs={10} sm={3} >

            <InputField 
              key={item.id+1}
              name='Name'
              type='text'
              value={item.Name}
              label='NAME'
              onChange={(event) => handleChange(event, item.id)}
              datalist={data}
              fullWidth
            />

          </Grid>

          <Grid item xs={10} sm={3}>

            <InputField 
              key={item.id+2}
              name='Qty'
              value={item.Qty}
              onChange={(event) => handleOtherChange(event, item.id)}
              type='number'
              label='QUANTITY'
              fullWidth
            />

          </Grid>

          <Grid item xs={10} sm={2}>

            <InputField  
              key={item.id+3}
              name='Unit'
              value={item.Unit}
              onChange={(event) => handleOtherChange(event, item.id)}
              label="Units"
              fullWidth
              disabled
            />

          </Grid>
          <Grid item xs={10} sm={2}>

            <InputField  
              key={item.id+4}
              name='AQty'
              value={item.AQty}
              onChange={(event) => handleOtherChange(event, item.id)}
              label="AVAILABLE"
              fullWidth
              disabled
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
  
}


export default ItemTable;
