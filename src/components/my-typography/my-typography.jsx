import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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