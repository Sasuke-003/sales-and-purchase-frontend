import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 20,
    right: 20,
    position: 'fixed',
  },

}));

const MyFloatingButton = ({...otherProps}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab className={classes.fab} color="primary" aria-label="add" {...otherProps}>
        <AddIcon />
      </Fab>
    </div>
  );

}

export default MyFloatingButton;