import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';


import InputField from '../input-field/inputfield.component'
import MyTypography from '../my-typography/my-typography'


import './add-item-input.styles.css'


class AddItemTable extends React.Component {


  shouldComponentUpdate( nextProps, nextState ) {

    return shallowCompare( this, nextProps, nextState );

  }

  render(){

    const { data, item, deleteItem, index, handleChange, handleOtherChange } = this.props;

    return(

      <div className='item' >

        <Grid container spacing={1} tent={'center'} justify={'center'}>

          <Grid item xs={12} sm={1}  >

            <div className='item-heading'><MyTypography className='item-heading' variant='h4'> { index+1 } </MyTypography></div>

          </Grid>

          <Grid item xs={10} sm={4} >

            <InputField 
              key={item.id+1}
              name='Name'
              type='text'
              value={item.Name}
              label='NAME'
              onChange={(event) => handleChange( event, item.id )}
              datalist={data}
              fullWidth
            />

          </Grid>

          <Grid item xs={10} sm={3}>

            <InputField 
              key={item.id+2}
              name='Qty'
              value={item.Qty}
              onChange={(event) => handleOtherChange( event, item.id )}
              type='number'
              label='QUANTITY'
              fullWidth
            />

          </Grid>

          <Grid item xs={10} sm={3}>
           
            <FormControl className='formControl' fullWidth >
            
                <InputLabel id="demo-simple-select-label">UNIT</InputLabel>
                <Select
                        name='Unit'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.Unit}
                        onChange={(event) => handleOtherChange( event, item.id )}
                    >

                    <MenuItem value={'UNITS'}>units</MenuItem>
                    <MenuItem value={'KG'}>kg</MenuItem>
                    <MenuItem value={'L'}>l</MenuItem>
                    <MenuItem value={'G'}>g</MenuItem>

                </Select>

            </FormControl>

          </Grid>

          <Grid item xs={12} sm={1}>

            <IconButton  aria-label="delete" onClick={() => deleteItem( item.id) } >
              <DeleteIcon fontSize="large" />
            </IconButton>

          </Grid>

        </Grid>

      </div>

    );

  }

}


export default AddItemTable;
