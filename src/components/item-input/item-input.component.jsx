import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'
import InputField from '../input-field/inputfield.component'

import MyTypography from '../my-typography/my-typography'
import './item-input.styles.css'

import shallowCompare from 'react-addons-shallow-compare';


class ItemTable extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }


  render(){
    const { data, item, deleteItem, index, handleChange } = this.props;
    return(
      <div className='item' >
        <Grid container spacing={1} tent={'center'} justify={'center'}>
          <Grid item xs={12} sm={1}  >
            <div className='item-heading'><MyTypography className='item-heading' variant='h4'>{index+1}</MyTypography></div>
          </Grid>
          <Grid item xs={10} sm={4} >
            <InputField 
              key={item.id+1}
              className='item-detail'
              name='name'
              type='text'
              value={item.name}
              label='NAME'
              onChange={(event) => handleChange(event, index, item.id)}
              datalist={data}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} sm={3}>
            <InputField 
              key={item.id+2}
              className='item-detail'
              name='quantity'
              value={item.quantity}
              onChange={(event) => handleChange(event, index, item.id)}
              type='number'
              label='QUANTITY'
              fullWidth
            />
          </Grid>
          <Grid item xs={10} sm={3}>
            <InputField  
              key={item.id+3}
              name='units'
              className='item-detail'
              value={item.units}
              onChange={(event) => handleChange(event, index, item.id)}
              label="Select"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <IconButton  aria-label="delete" onClick={() => deleteItem(item.id, index)} >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
  )
  }
}


export default ItemTable;



// import React from 'react';

// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem'

// import MyTextField from '../my-text-field/my-text-field';
// import MyTypography from '../my-typography/my-typography'
// import './item-input.styles.css'



// const ItemTable = ({ data, item, deleteItem, index, handleChange,  handleItemChange }) => {



//   const currencies = [
//     {
//       value: 'kg',
//       label: 'KG',
//     },
//     {
//       value: 'l',
//       label: 'L',
//     },
//     {
//       value: 'units',
//       label: 'UNITS',
//     },
//   ];

  
//   return(
//     <div className='item' >
//     <Grid container spacing={1} tent={'center'} justify={'center'}>
//     <Grid item xs={12} sm={1}  >
//     <div className='item-heading'><MyTypography className='item-heading' variant='h4'>{index+1}</MyTypography></div>
//     </Grid>
//     <Grid item xs={10} sm={4} >
//       <MyTextField 
//         key={1}
//         className='item-detail'
//         id={'name'+item.id}
//         type='text'
//         label='NAME'
//         onChange={() => handleItemChange(item.id)}
//         datalist={data}
//         fullWidth
//       />
//       </Grid>
//       <Grid item xs={10} sm={3}>
//       <MyTextField 
//         key={2}
//         className='item-detail'
//         id={'quantity'+item.id}
//         type='number'
//         label='QUANTITY'
//         fullWidth
//       />
//       </Grid>
//       <Grid item xs={10} sm={3}>
//       <TextField  
//         key={3}
//         className='item-detail'
//         id="standard-select-currency"
//         select
//         value={item.units}
//         onChange={(event) => handleChange(event, index)}
//         label="Select"
//         fullWidth
//       >
//         {currencies.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField>
//       </Grid>
//       <Grid item xs={12} sm={1}>
//       <IconButton  aria-label="delete" onClick={() => deleteItem(item.id, index)} >
//           <DeleteIcon fontSize="large" />
//       </IconButton>
//       </Grid>
//       </Grid>
//     </div>

    
//   )
// }


// export default ItemTable;