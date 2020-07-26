import React from 'react';


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import './inputfield.styles.css'


const theme = createMuiTheme({

    typography: {

        fontSize : 20,

       }

});


class  InputField extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {

        if  (nextProps.value === this.props.value && nextProps.datalist === this.props.datalist ){

            return false

        }

        return true

    }

    render(){

        const { datalist, value, ...otherProps } = this.props;

        return (

            <ThemeProvider theme={theme}>

                <div className='text-field'>

                    {

                        datalist ? 

                            <datalist id='datalist2'>

                                {
                                    datalist.map(( option, index ) => (

                                        <option key={index} value={option} />

                                    ))
                                }

                            </datalist>

                        :

                            null

                    }

                    {

                        datalist ?

                            <TextField inputProps={{list: 'datalist2'}} autoComplete={'off'} value={value} {...otherProps}  />    

                        :
                        
                            <TextField autoComplete={'off'} value={value} {...otherProps}  />
                            
                    }

                </div>

            </ThemeProvider>

        );

    }

}


export default InputField;