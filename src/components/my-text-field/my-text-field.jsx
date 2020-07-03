import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './my-text-field.styles.css'

const theme = createMuiTheme({
    palette: {
    },
    typography: {
        fontSize: 20
       }
});
const MyTextField = ({ datalist, ...otherProps}) => {
    return (
        
      <ThemeProvider theme={theme}>
        <div className='text-field'>
            {
                datalist ? 
                    <datalist id='datalist1'>
                        {
                            datalist.map((option, index) => (
                                <option key={index} value={option} />
                            ))
                        }
                    </datalist>
                :
                    null
            }
            {
                datalist?
                <TextField inputProps={{list: 'datalist1'}} autoComplete={'off'} {...otherProps}  />    
                :
                <TextField autoComplete={'off'} {...otherProps}  />
            }
        </div>
      </ThemeProvider>
      
  );
}

export default MyTextField;