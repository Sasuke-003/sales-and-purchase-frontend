import React from "react";
import moment from "moment";

import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import StockDetailView from "../StockDetailView/StockDetailView";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import { item } from "../../server/apis/item.api";

class StockSales extends React.Component {
    constructor() {
        super();

        this.state = {
            historyData: [],
            pageNo: 0,
            viewPopper: false,
            currentSaleID: 0,
        };
    }

    incrementPage = () => {
        this.setState(
            (prevState, props) => ({
                pageNo: prevState.pageNo + 1,
            }),
            () => {
                this.setHistoryData();
                console.log(this.state.pageNo);
            }
        );
    };

    decrementPage = () => {
        if (this.state.page !== 0) {
            this.setState(
                (prevState, props) => ({
                    pageNo: prevState.pageNo - 1,
                }),
                () => {
                    this.setHistoryData();
                    console.log(this.state.pageNo);
                }
            );
        }
    };

    setHistoryData = async () => {
        const { pageNo } = this.state;
        const { ItemName } = this.props;

        let res = await item.sales(pageNo, ItemName);

        this.setState({
            historyData: res,
        });
    };

    idToDate = (id) => {
        return moment(parseInt(id.substring(0, 8), 16) * 1000).format("DD/MM/YYYY-hh:mm:ss A");
    };

    handleViewOpen = async (SaleId) => {
        this.setState({
            viewPopper: true,
            currentSaleID: SaleId,
        });
        this.setHistoryData();
    };
    handleViewClose = () => {
        this.setState({
            viewPopper: false,
        });
    };

    componentDidMount() {
        this.setHistoryData();
    }

    render() {
        const { viewPopper, historyData, pageNo, currentSaleID } = this.state;

        return (
            <div>
                <IconButton aria-label='delete' onClick={this.decrementPage} disabled={pageNo === 0 ? true : false}>
                    <NavigateBeforeIcon fontSize='large' />
                </IconButton>

                {pageNo + 1}

                <IconButton aria-label='delete' onClick={this.incrementPage} disabled={historyData.length < 10 ? true : false}>
                    <NavigateNextIcon fontSize='large' />
                </IconButton>
                {historyData.map(({ CreatedAt, SaleID, UserName, Qty }, index) => (
                    <Card key={CreatedAt + index}>
                        <CardContent>
                            <TableContainer>
                                <Table aria-label='simple table'>
                                    <TableBody>
                                        <TableRow key={SaleID + 0}>
                                            <TableCell component='th' scope='row' size='small' padding='checkbox'>
                                                CREATED AT
                                            </TableCell>

                                            <TableCell size='small'>{this.idToDate(CreatedAt)}</TableCell>
                                        </TableRow>

                                        <TableRow key={SaleID + 1}>
                                            <TableCell component='th' scope='row' size='small'>
                                                SALE ID
                                            </TableCell>

                                            <TableCell size='small'>{SaleID}</TableCell>
                                        </TableRow>

                                        <TableRow key={SaleID + 2}>
                                            <TableCell component='th' scope='row' size='small'>
                                                SOLD BY
                                            </TableCell>

                                            <TableCell size='small'>{UserName}</TableCell>
                                        </TableRow>

                                        <TableRow key={SaleID + 3}>
                                            <TableCell component='th' scope='row' size='small'>
                                                SOLD QUANTITY
                                            </TableCell>

                                            <TableCell size='small'>{Qty}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>

                        <CardActions>
                            <Button size='small' color='primary' onClick={() => this.handleViewOpen(SaleID)}>
                                View
                            </Button>
                        </CardActions>
                    </Card>
                ))}
                <Dialog
                    open={viewPopper}
                    onClose={this.handleViewClose}
                    aria-labelledby='b-view-popup'
                    aria-describedby='b-alert-dialog-description-view'
                    fullWidth
                    maxWidth='md'>
                    <DialogTitle id='b-view-popup'>{"ITEMS"}</DialogTitle>

                    <DialogContent>
                        <StockDetailView SaleID={currentSaleID} PurchaseID={0} />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleViewClose} color='primary' autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default StockSales;
