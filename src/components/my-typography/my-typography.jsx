import React from 'react';


import Typography from '@material-ui/core/Typography';


import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


const MyTypography = ({ children, ...otherProps }) => {

  return (

    <ThemeProvider theme={theme}>

      <Typography {...otherProps}>{children}</Typography>

    </ThemeProvider>

  );

}


export default MyTypography;