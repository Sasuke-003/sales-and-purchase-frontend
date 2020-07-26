import React from 'react';
import moment from 'moment'


import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TableContainer from '@material-ui/core/TableContainer';


import ViewItemPopup from '../view-item-popup/view-item-popup.component'


import { reqItemUnit } from '../../data'
import { req } from '../../url/url'


class BillingHistoryDisplay extends React.Component {

    constructor() {

        super();
        
        this.state ={

            historyData  : [],
            editPopper   : false,
            deletePopper : false,
            viewPopper   : false,

        }

    }


    setHistoryData = async () => {

        const { historyData } = this.state;
        const { billingHistory } = this.props;
        const billingDetailData = { _id : billingHistory._id };

        if( historyData.length === 0 ) {

            const res = await req.sale.detail( billingDetailData );

            console.log( res );

            for(let i=0; i<res.Items.length;i++){

                this.setState({

                    historyData: this.state.historyData.concat({

                        Name :res.Items[i].Name,
                        Qty  :res.Items[i].Qty,
                        Unit :await reqItemUnit(res.Items[i].Name),

                    })

                });

            }

        }
        
    }

    idToDate = ( id ) => {

        return moment(parseInt(id.substring(0,8), 16)* 1000).format("DD/MM/YYYY-hh:mm:ss A");

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
        });
        this.setHistoryData();  
    }
    handleDeleteClose = () => {
        this.setState({
            deletePopper: false
        });
        
    }
    handleViewOpen = async () => {
        this.setState({
            viewPopper: true
        })
        this.setHistoryData();                      
    }
    handleViewClose = () => {
        this.setState({
            viewPopper: false
        })
    }


    handleDeleteClick = async () => {

        const billingDeleteData = { _id:this.props.billingHistory._id };
        await req.sale.delete( billingDeleteData );
        alert("Successfully Deleted");
        this.handleDeleteClose();
        this.props.setHistoryToState()
       
    }

    
    render(){
        const { billingHistory } = this.props;

        const { deletePopper, editPopper, viewPopper, historyData } = this.state;

        return (
            <Card >
            
                <CardContent>

                    <TableContainer>

                        <Table aria-label="simple table">

                             <TableBody>

                                <TableRow key={billingHistory._id+0}>

                                    <TableCell component="th" scope="row" size="small" padding='checkbox'>
                                        PURCHASED BY
                                    </TableCell>

                                    <TableCell size="small" >
                                        {billingHistory.UserName}
                                    </TableCell>

                                </TableRow>

                                <TableRow key={billingHistory._id+1}>

                                    <TableCell component="th" scope="row" size="small">
                                        SOLD BY
                                    </TableCell>

                                    <TableCell size="small">
                                        {billingHistory.SellerName}
                                    </TableCell>

                                </TableRow>

                                <TableRow key={billingHistory._id+2}>

                                    <TableCell component="th" scope="row" size="small">
                                        ITEM COUNT
                                    </TableCell>

                                    <TableCell size="small">
                                        {billingHistory.ItemCount}
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow key={billingHistory._id+3}>

                                    <TableCell component="th" scope="row" size="small">
                                        PURCHASE DATE
                                    </TableCell>

                                    <TableCell size="small">
                                        {this.idToDate(billingHistory._id)}
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
                    aria-labelledby="b-view-popup"
                    aria-describedby="b-alert-dialog-description-view"
                    fullWidth
                    maxWidth='md'
                >

                    <DialogTitle id="b-view-popup">{"ITEMS"}</DialogTitle>

                    <DialogContent>

                        <ViewItemPopup historyData={historyData} />

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
                    aria-labelledby="b-edit-popup"
                    aria-describedby="b-alert-dialog-description-edit"
                    fullWidth
                    maxWidth='md'
                >

                    <DialogTitle id="b-edit-popup">{"EDIT"}</DialogTitle>

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
                    aria-labelledby="b-delete-popup"
                    aria-describedby="b-alert-dialog-description-delete"
                    fullWidth
                    maxWidth='md'
                >

                    <DialogTitle id="b-delete-popup">{"The below purchased items will be deleted!"}</DialogTitle>

                    <DialogContent>

                        <ViewItemPopup historyData={historyData} />

                    </DialogContent>

                    <DialogActions>

                    <Button onClick={this.handleDeleteClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={this.handleDeleteClick}  color="primary" autoFocus >
                        Delete
                    </Button>

                    </DialogActions>

                </Dialog>

            </Card>

        );

    }

}


export default BillingHistoryDisplay;