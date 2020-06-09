import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const MyCheckBox = ({ label,...otherProps }) => {
    const theme = createMuiTheme({
        palette: {
        },
        typography: {
            fontSize: 15,
        }
    });
    return (
        <div>
            <ThemeProvider theme={theme}>
                <FormControlLabel
                    control={
                        <Checkbox {...otherProps} />
                    }
                    label={label}
                />
            </ThemeProvider>
        </div>
    );
};

export default MyCheckBox;