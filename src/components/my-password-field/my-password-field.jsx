import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './my-password-field.styles.css'

const theme = createMuiTheme({
    palette: {
    },
    typography: {
        fontSize: 20
       }
});

class MyTextField extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            showPassword: false,
        }
    }
    handleClickShowPassword = () => {
        this.setState((prevState, props) => ({
            showPassword: !prevState.showPassword
        }))
    };
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    shouldComponentUpdate( nextProps,nextState) {
        if(nextProps === this.props)
            return false
        return true
    }

    render(){
        const { name, id, datalist, className, type, label ,...otherProps } = this.props;
        return (  
            <ThemeProvider theme={theme}>
                    <div className='password-field'>
                        <FormControl className={className} >
                            <InputLabel  htmlFor="filled-adornment-password"  position="start">{label}</InputLabel>
                            <Input
                                name= {name}
                                id="filled-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                autoComplete={'off'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                </InputAdornment>
                                }
                                {
                                    ...otherProps
                                }
                            />
                        </FormControl>
                    </div>
            </ThemeProvider>
        );
    }
}

export default MyTextField;