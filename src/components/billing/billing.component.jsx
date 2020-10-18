import React, { Component } from "react";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import MyFloatingButton from "../my-floating-button/my-floating-button";
import ItemTable from "../item-input/item-input.component";
import ItemPopup from "../popup/popup.component";

import { item } from "../../server/apis/item.api";
import { sale } from "../../server/apis/sale.api";

let timerID;
const timeOutValue = 500;
let s = new Set();

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.Name === val ? a + 1 : a), 0);

class Billing extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            cart: [],
            popperStatus: false,
            submitDisabled: false,
        };
    }

    handleOpen = () => {
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
                        if (!s.has(res[i].Name)) {
                            this.setState({ data: this.state.data.concat(res[i].Name) });
                            s.add(res[i].Name);
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

    submitItem = async () => {
        let newCart = {};

        this.state.cart.map((c) => (newCart[c.Name] = c.Qty));

        const billingData = {
            Items: newCart,
        };

        try {
            await sale.create(billingData);
            alert("Successfully Purchased");
            this.setState({ cart: [] });
            this.handleClose();
        } catch (error) {}
    };

    componentDidMount() {
        this.addItem();
        s.clear();
    }

    render() {
        const { data, cart, popperStatus, submitDisabled } = this.state;

        return (
            <div>
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

export default Billing;
