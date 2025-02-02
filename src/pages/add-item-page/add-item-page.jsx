import React from 'react';
import PropTypes from 'prop-types';


import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';


import { makeStyles, useTheme } from '@material-ui/core/styles';


import AddItem from '../../components/add-item/add-item.component'
import UpdateItem from '../../components/update-item/update-item.component'




function TabPanel( props ) {

    const { children, value, index, ...other } = props;
  
    return (

      <div

        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}

      >

        {value === index && (

          <Box p={3}>
            <Typography component="div" >{children}</Typography>
          </Box>

        )}

      </div>

    );

  }

  
TabPanel.propTypes = {

    children : PropTypes.node,
    index    : PropTypes.any.isRequired,
    value    : PropTypes.any.isRequired,

  };
  

  function a11yProps( index ) {

    return {

      id              : `full-width-tab-${index}`,
      'aria-controls' : `full-width-tabpanel-${index}`,

    };

  }

  const useStyles = makeStyles((theme) => ({

    root: {

      backgroundColor : theme.palette.background.paper,
      width           : '100%',
      display         : 'flexbox'

    },

    po: {

      position   : '-webkit-sticky',
      top        : 20,
      bottom     : 20, 
      paddingTop : '35px',
      zIndex     : 5,
      
    }

  }));



const AddItemPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <div className={classes.root}>
      <AppBar className={classes.po} position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="ADD ITEMS" {...a11yProps(0)} />
          <Tab label="UPDATE ITEMS" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <AddItem />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <UpdateItem />
      </TabPanel>
    </div>
    );
};

export default AddItemPage;
