import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { reqItemUnit } from '../../units'


let m = new Map()

class HistoryDisplay extends React.Component {
constructor(props) {
    super(props);
    
    this.state ={
        historyData: [],
        editPopper: false,
        deletePopper: false,
        viewPopper: false,
    }
}

handleEditOpen = () => {
    this.setState({
        editPopper: true
    })

}
handleEditClose = () => {
    this.setState({
        editPopper: false
    })
}
handleDeleteOpen = () => {
    this.setState({
        deletePopper: true
    })
}
handleDeleteClose = () => {
    this.setState({
        deletePopper: false
    })
}
handleViewOpen = async () => {
    this.setState({
        viewPopper: true
    })
    const res = await axios.post('/purchase/detail', {_id:this.props.purchaseHistory._id});
    for(let i=0; i<res.length;i++){
        this.setState({
            historyData: this.state.historyData.concat({
                Name:res.Items[i].Name,
                Qty:res.Items[i].Qty,
                Unit:reqItemUnit(res.Items[i].Name)
            })
        });
    }
    console.log(this.state);
                            
}
handleViewClose = () => {
    this.setState({
        viewPopper: false
    })
}

  
render(){
    const { purchaseHistory } = this.props;

    const { deletePopper, editPopper, viewPopper } = this.state;
    return (
        <Card >
            <CardContent>
            <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                    <TableRow key={purchaseHistory._id+0}>
                        <TableCell component="th" scope="row" size="small" padding='checkbox'>
                            PURCHASED BY
                        </TableCell>
                        <TableCell size="small" >
                            {purchaseHistory.UserName}
                        </TableCell>
                    </TableRow>
                    <TableRow key={purchaseHistory._id+1}>
                        <TableCell component="th" scope="row" size="small">
                            PURCHASED FROM
                        </TableCell>
                        <TableCell size="small">
                            {purchaseHistory.SellerName}
                        </TableCell>
                    </TableRow>
                    <TableRow key={purchaseHistory._id+2}>
                        <TableCell component="th" scope="row" size="small">
                            ITEM COUNT
                        </TableCell>
                        <TableCell size="small">
                            {purchaseHistory.ItemCount}
                        </TableCell>
                    </TableRow>
                    <TableRow key={purchaseHistory._id+3}>
                        <TableCell component="th" scope="row" size="small">
                            PURCHASE DATE
                        </TableCell>
                        <TableCell size="small">
                            {purchaseHistory._id}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </TableContainer>
            </CardContent>
        
        <CardActions>
        <Button size="small" color="primary" onClick={this.handleViewOpen} >
            View
            </Button>
            <Button size="small" color="primary" onClick={this.handleEditOpen} >
            Edit
            </Button>
            <Button size="small" color="primary" onClick={this.handleDeleteOpen}  >
            Delete
            </Button>
        </CardActions>
        <Dialog
                    open={viewPopper}
                    onClose={this.handleViewClose}
                    aria-labelledby="view-popup"
                    aria-describedby="alert-dialog-description-view"
                    fullWidth
                    maxWidth='md'
                >
                    <DialogTitle id="view-popup">{"ITEMS"}</DialogTitle>
                    <DialogContent>
                    {purchaseHistory._id}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleViewClose}  color="primary" autoFocus >
                        Ok
                    </Button>
                    </DialogActions>
        </Dialog>
        <Dialog
                    open={editPopper}
                    onClose={this.handleEditClose}
                    aria-labelledby="edit-popup"
                    aria-describedby="alert-dialog-description-edit"
                    fullWidth
                    maxWidth='md'
                >
                    <DialogTitle id="edit-popup">{"EDIT"}</DialogTitle>
                    <DialogContent>
                        edit
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleEditClose}  color="primary" autoFocus >
                        Submit
                    </Button>
                    </DialogActions>
        </Dialog>
        <Dialog
                    open={deletePopper}
                    onClose={this.handleDeleteClose}
                    aria-labelledby="delete-popup"
                    aria-describedby="alert-dialog-description-delete"
                    fullWidth
                    maxWidth='md'
                >
                    <DialogTitle id="delete-popup">{"The below items will be deleted!"}</DialogTitle>
                    <DialogContent>
                        delete
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleDeleteClose}  color="primary" autoFocus >
                        Delete
                    </Button>
                    </DialogActions>
        </Dialog>
        </Card>
    );
}
}

export default HistoryDisplay;