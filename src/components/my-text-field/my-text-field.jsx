import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './my-text-field.styles.css'

const theme = createMuiTheme({
    palette: {
    },
    typography: {
        fontSize: 20
       }
});


// const useStyles = makeStyles((theme) => ({
//   root: {
//   },
// }));


const MyTextField = ({ id, datalist, className, type, label ,...otherProps}) => {

    // const classes = useStyles();

    const [values, setValues] = React.useState({
        showPassword: false,
    });
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  
    return (
        
      <ThemeProvider theme={theme}>
        {
            type === 'password' ?
            <div className='text-field'>
                <FormControl className={className} >
                    <InputLabel  htmlFor="filled-adornment-password"  position="start">{label}</InputLabel>
                    <Input
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        autoComplete={'off'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                        </InputAdornment>
                        }
                        {
                            ...otherProps
                        }
                    />
                    </FormControl>
                </div>
            :
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
                <TextField className={className} label={label} type={type} inputProps={{list: 'datalist1'}} autoComplete={'off'} id={id} {...otherProps}  />    
                :
                <TextField className={className} label={label} type={type} autoComplete={'off'} id={id} {...otherProps}  />
            }
            </div>
        }
      </ThemeProvider>
      
  );
}

export default MyTextField;