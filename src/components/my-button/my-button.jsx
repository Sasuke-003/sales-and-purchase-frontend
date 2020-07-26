import React from 'react';


import { Button } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import './my-button.styles.css'


const MyButton = ({ children, color,...otherProps  }) => {

    const theme = createMuiTheme({

        palette: {

          primary   : grey,
          secondary : blue,

        },

        typography: {

            fontSize : 15,

        }

    });

    return (

        <div>

            <ThemeProvider theme={theme}>

                <Button className='button' color={color} {...otherProps}>

                    {children}

                </Button>

            </ThemeProvider>

        </div>

    );

};


export default MyButton;