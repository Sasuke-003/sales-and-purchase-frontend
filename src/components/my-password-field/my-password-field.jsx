import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import './my-password-field.styles.css'


const theme = createMuiTheme({

    palette: {

    },

    typography: {

        fontSize : 20

    }

});


class MyPasswordField extends React.Component  {


    constructor() {

        super();

        this.state ={

            showPassword : false,

        }

    }


    handleClickShowPassword = () => {

        this.setState( (prevState, props) => ({

            showPassword: !prevState.showPassword

        }));

    };
    

    handleMouseDownPassword = (event) => {

        event.preventDefault();

    };


    shouldComponentUpdate(nextProps, nextState) {

        return shallowCompare(this, nextProps, nextState);

    }


    render(){

        const { name, id, datalist, className, type, label , value,...otherProps } = this.props;
        const { showPassword } = this.state;

        return (  

            <ThemeProvider theme={theme}>

                    <div className='password-field'>

                        <FormControl className={className} >

                            <InputLabel  htmlFor="filled-adornment-password"  position="start">{label}</InputLabel>

                            <Input
                                name= {name}
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={value}
                                autoComplete={'off'}
                                endAdornment={
                                    <InputAdornment position="end">

                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >

                                            {showPassword ? <Visibility /> : <VisibilityOff />}

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


export default MyPasswordField;