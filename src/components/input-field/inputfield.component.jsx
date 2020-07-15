import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './inputfield.styles.css'
import shallowCompare from 'react-addons-shallow-compare';

const theme = createMuiTheme({
    palette: {
    },
    typography: {
        fontSize: 20
       }
});

class  InputField extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value === this.props.value){
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
                        datalist ?
                            <TextField inputProps={{list: 'datalist1'}} autoComplete={'off'} value={value} {...otherProps}  />    
                        :
                            <TextField autoComplete={'off'} value={value} {...otherProps}  />
                    }
                </div>
            </ThemeProvider>
        );
    }
}
export default InputField;