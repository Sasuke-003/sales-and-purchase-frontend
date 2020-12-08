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

class StockPurchase extends React.Component {
    constructor() {
        super();

        this.state = {
            historyData: [],
            pageNo: 0,
            viewPopper: false,
            currentPurchaseID: 0,
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

        let res = await item.purchases(pageNo, ItemName);

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
            currentPurchaseID: SaleId,
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
        const { viewPopper, historyData, pageNo, currentPurchaseID } = this.state;

        return (
            <div>
                <IconButton aria-label='delete' onClick={this.decrementPage} disabled={pageNo === 0 ? true : false}>
                    <NavigateBeforeIcon fontSize='large' />
                </IconButton>

                {pageNo + 1}

                <IconButton aria-label='delete' onClick={this.incrementPage} disabled={historyData.length < 10 ? true : false}>
                    <NavigateNextIcon fontSize='large' />
                </IconButton>
                {historyData.map(({ CreatedAt, PurchaseID, UserName, SellerName, Qty }, index) => (
                    <Card key={CreatedAt + index}>
                        <CardContent>
                            <TableContainer>
                                <Table aria-label='simple table'>
                                    <TableBody>
                                        <TableRow key={PurchaseID + 0}>
                                            <TableCell component='th' scope='row' size='small' padding='checkbox'>
                                                CREATED AT
                                            </TableCell>

                                            <TableCell size='small'>{this.idToDate(CreatedAt)}</TableCell>
                                        </TableRow>

                                        <TableRow key={PurchaseID + 1}>
                                            <TableCell component='th' scope='row' size='small'>
                                                PURCHASEID ID
                                            </TableCell>

                                            <TableCell size='small'>{PurchaseID}</TableCell>
                                        </TableRow>

                                        <TableRow key={PurchaseID + 2}>
                                            <TableCell component='th' scope='row' size='small'>
                                                PURCHASED BY
                                            </TableCell>

                                            <TableCell size='small'>{UserName}</TableCell>
                                        </TableRow>

                                        <TableRow key={PurchaseID + 3}>
                                            <TableCell component='th' scope='row' size='small'>
                                                PURCHASED FROM
                                            </TableCell>

                                            <TableCell size='small'>{SellerName}</TableCell>
                                        </TableRow>

                                        <TableRow key={PurchaseID + 4}>
                                            <TableCell component='th' scope='row' size='small'>
                                                PURCHASED QUANTITY
                                            </TableCell>

                                            <TableCell size='small'>{Qty}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>

                        <CardActions>
                            <Button size='small' color='primary' onClick={() => this.handleViewOpen(PurchaseID)}>
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
                        <StockDetailView SaleID={0} PurchaseID={currentPurchaseID} />
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

export default StockPurchase;
