import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import ItemPopup from "../popup/popup.component";
import MyTextField from "../my-text-field/my-text-field";
import ItemTable from "../item-input/item-input.component";
import MyFloatingButton from "../my-floating-button/my-floating-button";

import { seller } from "../../server/apis/seller.api.js";
import { purchase } from "../../server/apis/purchase.api.js";
import { item } from "../../server/apis/item.api";

let timerID;
const timeOutValue = 500;
let dataSet = new Set();
let sellerDataSet = new Set();

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.Name === val ? a + 1 : a), 0);

class EditItemPopup extends Component {
    constructor() {
        super();

        this.state = {
            sellerName: "",
            pid: "",
            data: [],
            cart: [],
            popperStatus: false,
            submitDisabled: false,
            sellerData: [],
            Error: false,
            helperText: "",
        };
    }

    handleOpen = (event) => {
        this.setState({ popperStatus: true });

        const { data, cart } = this.state;
        let disabled = false;

        for (let i = 0; i < cart.length; i++) {
            if (
                data.indexOf(cart[i].Name) === -1 ||
                cart[i].Name === "" ||
                cart[i].Qty === "" ||
                cart[i].Unit === "" ||
                countOccurrences(cart, cart[i].Name) > 1
            ) {
                disabled = true;
                break;
            }
        }

        this.setState({ submitDisabled: disabled });
    };

    handleClose = (event) => {
        this.setState({ popperStatus: false });
    };

    addItem = () => {
        this.setState({
            cart: [
                ...this.state.cart,

                {
                    Name: "",
                    Qty: "",
                    Unit: "",
                    AQty: "",
                    id: Date.now(),
                },
            ],
        });
    };

    deleteItem = (id) => {
        this.setState({ cart: this.state.cart.filter((c) => c.id !== id) });
    };

    handleOtherChange = (event, id) => {
        const { name, value } = event.target;

        this.setState({
            cart: this.state.cart.map((c) => {
                if (c.id !== id) return c;
                return { ...c, [name]: value };
            }),
        });
    };

    handleChange = (event, id) => {
        const { name, value } = event.target;

        this.setState({
            cart: this.state.cart.map((c) => {
                if (c.id !== id) return c;
                return { ...c, [name]: value };
            }),
        });

        if (name === "Name") {
            if (timerID) clearTimeout(timerID);

            timerID = setTimeout(async () => {
                timerID = undefined;
                const searchData = value;

                if (searchData !== "") {
                    let res = await item.search(searchData);
                    let arr = [];
                    if (res) {
                        for (let i = 0; i < res.Items.length; i++) {
                            arr.push({ Name: res.Items[i] });
                        }
                    }
                    res = arr;
                    for (let i = 0; i < res.length; i++) {
                        if (!dataSet.has(res[i].Name)) {
                            this.setState({ data: this.state.data.concat(res[i].Name) });
                            dataSet.add(res[i].Name);
                        }
                    }

                    if (this.state.data.indexOf(value) !== -1) {
                        const res = await item.detail(value);

                        this.setState({
                            cart: this.state.cart.map((c) => {
                                if (c.id !== id) return c;
                                return { ...c, AQty: res.Qty, Unit: res.Unit };
                            }),
                        });
                    }
                }
            }, timeOutValue);
        }
    };

    handleSellerChange = (event) => {
        let error = false;
        let helperText = "";
        const { name, value } = event.target;

        this.setState({ [name]: value });

        if (timerID) clearTimeout(timerID);

        timerID = setTimeout(async () => {
            timerID = undefined;
            const searchData = value;

            if (searchData !== "") {
                let res = await seller.search(searchData);
                let arr = [];
                if (res) {
                    for (let i = 0; i < res.SellerNames.length; i++) {
                        arr.push({ Name: res.SellerNames[i] });
                    }
                }
                res = arr;
                for (let i = 0; i < res.length; i++) {
                    if (!sellerDataSet.has(res[i].Name)) {
                        this.setState({ sellerData: this.state.sellerData.concat(res[i].Name) });
                        sellerDataSet.add(res[i].Name);
                    }
                }

                if (this.state.sellerData.indexOf(value) === -1) {
                    error = true;
                    helperText = "This seller is not Available!";
                }
            } else {
                error = true;
                helperText = "Seller name cannot be empty!";
            }

            this.setState({
                Error: error,
                helperText: helperText,
            });
        }, timeOutValue);
    };

    submitItem = async () => {
        let newCart = {};

        this.state.cart.map((c) => (newCart[c.Name] = c.Qty));

        const purchaseData = {
            SellerName: this.state.sellerName,
            PurchaseID: this.state.pid,
            Items: newCart,
        };

        await purchase.update(purchaseData);

        this.setState({ cart: [] });
        this.handleClose();
        alert("Successfully Purchased");
        window.location.reload(false);
    };

    componentDidMount = async () => {
        dataSet.clear();
        sellerDataSet.clear();

        const { historyData, sellerName, pid } = this.props;

        this.setState({ sellerName: sellerName, pid: pid });

        let newCart = [];
        let newData = [];

        for (let i = 0; i < historyData.length; i++) {
            const res = await item.detail(historyData[i].Name);

            newCart.push({
                Name: historyData[i].Name,
                Qty: historyData[i].Qty,
                Unit: historyData[i].Unit,
                AQty: res.Qty,
                id: Date.now() + i,
            });

            newData.push(historyData[i].Name);

            dataSet.add(historyData[i].Name);
        }

        this.setState({ data: newData });
        console.log(dataSet);

        this.setState({
            cart: newCart,
        });
    };

    render() {
        const { data, cart, popperStatus, submitDisabled, helperText, sellerData, sellerName, Error } = this.state;

        return (
            <div>
                <MyTextField
                    key={0}
                    className='col-4 col-s-4'
                    name='sellerName'
                    value={sellerName}
                    onChange={this.handleSellerChange}
                    type='text'
                    label='SELLER NAME'
                    error={Error}
                    helperText={helperText}
                    datalist={sellerData}
                />
                {cart.map((item, index) => (
                    <div key={item.id} className='item-container'>
                        <ItemTable
                            data={data}
                            item={item}
                            deleteItem={this.deleteItem}
                            index={index}
                            handleChange={this.handleChange}
                            handleOtherChange={this.handleOtherChange}
                        />
                        <Divider />
                    </div>
                ))}

                <MyFloatingButton onClick={this.addItem} />
                <MyFloatingButton onClick={this.handleOpen} done disabled={cart.length ? false : true} />

                <Dialog
                    open={popperStatus}
                    onClose={this.handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    fullWidth
                    maxWidth='md'>
                    <DialogTitle id='alert-dialog-title'>{"Confirm Items"}</DialogTitle>

                    <DialogContent>
                        <ItemPopup data={data} cart={cart} />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.submitItem} color='primary' autoFocus disabled={submitDisabled}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditItemPopup;
