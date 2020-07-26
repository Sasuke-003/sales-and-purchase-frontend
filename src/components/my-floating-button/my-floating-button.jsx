import React from 'react';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';


import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles( ( theme ) => ({

  root: {

    '& > *': {

      margin : theme.spacing(1),

    },

  },

  extendedIcon: {

    marginRight : theme.spacing(1),

  },

  fab: {

    margin   : 0,
    top      : 'auto',
    left     : 20,
    bottom   : 20,
    right    : 'auto',
    position : 'fixed',

  },

  fabb: {

    margin   : 0,
    top      : 'auto',
    left     : 'auto',
    bottom   : 20,
    right    : 20,
    position : 'fixed',

  },

}));


const MyFloatingButton = (  {done, ...otherProps } ) => {

  const classes = useStyles();

  return (

    <div className={classes.root}>

      {

        done?

          <Fab className={`${classes.fabb} ${classes.extendedIcon}`} variant='extended' color="primary"  {...otherProps}>
           
            <DoneIcon />
            
            Confirm
              
          </Fab>

        :

          <Fab className={classes.fab} color="primary" aria-label="add" {...otherProps}>

            <AddIcon />

          </Fab>

      }

    </div>

  );

}


export default MyFloatingButton;