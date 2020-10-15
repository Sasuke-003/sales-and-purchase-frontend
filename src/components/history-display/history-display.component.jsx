import React from "react";
import moment from "moment";
import shallowCompare from "react-addons-shallow-compare";

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
import ViewItemPopup from "../view-item-popup/view-item-popup.component";
import EditItemPopup from "../edit-item-popup/edit-item-popup.component";

import { reqItemUnit } from "../../data";
import { req } from "../../url/url";

class HistoryDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
      historyData: [],
      pid: "",
      sellerName: "",
      editPopper: false,
      deletePopper: false,
      viewPopper: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  setHistoryData = async () => {
    const { historyData } = this.state;
    const { purchaseHistory } = this.props;
    const purchaseDetailData = { _id: purchaseHistory._id };

    this.setState({ sellerName: purchaseHistory.SellerName, pid: purchaseHistory._id });

    if (historyData.length === 0) {
      const res = await req.purchase.detail(purchaseDetailData);

      for (let i = 0; i < res.Items.length; i++) {
        this.setState({
          historyData: this.state.historyData.concat({
            Name: res.Items[i].Name,
            Qty: res.Items[i].Qty,
            Unit: await reqItemUnit(res.Items[i].Name),
          }),
        });
      }
    }
  };

  idToDate = (id) => {
    return moment(parseInt(id.substring(0, 8), 16) * 1000).format("DD/MM/YYYY-hh:mm:ss A");
  };

  handleEditOpen = async () => {
    await this.setHistoryData();
    this.setState({
      editPopper: true,
    });
  };
  handleEditClose = () => {
    this.setState({
      editPopper: false,
    });
  };
  handleDeleteOpen = () => {
    this.setState({
      deletePopper: true,
    });
    this.setHistoryData();
  };
  handleDeleteClose = () => {
    this.setState({
      deletePopper: false,
    });
  };
  handleViewOpen = async () => {
    this.setState({
      viewPopper: true,
    });
    this.setHistoryData();
  };
  handleViewClose = () => {
    this.setState({
      viewPopper: false,
    });
  };

  handleDeleteClick = async () => {
    const purchaseDeleteData = { PurchaseID: this.state.pid };
    await req.purchase.delete(purchaseDeleteData);
    alert("Successfully Deleted");
    this.handleDeleteClose();
    this.props.setHistoryToState();
  };

  render() {
    const { purchaseHistory } = this.props;

    const { deletePopper, editPopper, viewPopper, historyData, sellerName, pid } = this.state;

    return (
      <Card>
        <CardContent>
          <TableContainer>
            <Table aria-label='simple table'>
              <TableBody>
                <TableRow key={purchaseHistory._id + 0}>
                  <TableCell component='th' scope='row' size='small' padding='checkbox'>
                    PURCHASED BY
                  </TableCell>

                  <TableCell size='small'>{purchaseHistory.UserName}</TableCell>
                </TableRow>

                <TableRow key={purchaseHistory._id + 1}>
                  <TableCell component='th' scope='row' size='small'>
                    PURCHASED FROM
                  </TableCell>

                  <TableCell size='small'>{purchaseHistory.SellerName}</TableCell>
                </TableRow>

                <TableRow key={purchaseHistory._id + 2}>
                  <TableCell component='th' scope='row' size='small'>
                    ITEM COUNT
                  </TableCell>

                  <TableCell size='small'>{purchaseHistory.ItemCount}</TableCell>
                </TableRow>

                <TableRow key={purchaseHistory._id + 3}>
                  <TableCell component='th' scope='row' size='small'>
                    PURCHASE DATE
                  </TableCell>

                  <TableCell size='small'>{this.idToDate(purchaseHistory._id)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <CardActions>
          <Button size='small' color='primary' onClick={this.handleViewOpen}>
            View
          </Button>

          <Button size='small' color='primary' onClick={this.handleEditOpen}>
            Edit
          </Button>

          <Button size='small' color='primary' onClick={this.handleDeleteOpen}>
            Delete
          </Button>
        </CardActions>

        <Dialog
          open={viewPopper}
          onClose={this.handleViewClose}
          aria-labelledby='view-popup'
          aria-describedby='alert-dialog-description-view'
          fullWidth
          maxWidth='md'>
          <DialogTitle id='view-popup'>{"ITEMS"}</DialogTitle>

          <DialogContent>
            <ViewItemPopup historyData={historyData} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleViewClose} color='primary' autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={editPopper}
          onClose={this.handleEditClose}
          aria-labelledby='edit-popup'
          aria-describedby='alert-dialog-description-edit'
          fullWidth
          maxWidth='md'>
          <DialogTitle id='edit-popup'>{"EDIT"}</DialogTitle>

          <DialogContent>
            <EditItemPopup historyData={historyData} sellerName={sellerName} pid={pid} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleEditClose} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deletePopper}
          onClose={this.handleDeleteClose}
          aria-labelledby='delete-popup'
          aria-describedby='alert-dialog-description-delete'
          fullWidth
          maxWidth='md'>
          <DialogTitle id='delete-popup'>{"The below purchased items will be deleted!"}</DialogTitle>

          <DialogContent>
            <ViewItemPopup historyData={historyData} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDeleteClose} color='primary'>
              Cancel
            </Button>

            <Button onClick={this.handleDeleteClick} color='primary' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

export default HistoryDisplay;
