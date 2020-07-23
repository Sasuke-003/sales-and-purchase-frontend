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


class HistoryDisplay extends React.Component {
constructor(props) {
    super(props);
    
    this.state ={
        historyData: []
    }
}

  
render(){
    const { purchaseHistory } = this.props;
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
            <Button size="small" color="primary">
            Edit
            </Button>
            <Button size="small" color="primary">
            Delete
            </Button>
        </CardActions>
        </Card>
    );
}
}

export default HistoryDisplay;