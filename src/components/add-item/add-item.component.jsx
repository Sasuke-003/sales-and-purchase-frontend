import React, { Component } from "react";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import MyFloatingButton from "../my-floating-button/my-floating-button";
import AddItemTable from "../add-item-input/add-iten-input.component";
import AddItemPopup from "../add-item-popup/add-item-popup.component";

import { item } from "../../server/apis/item.api";

let timerID;
const timeOutValue = 100;
let s = new Set();
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.Name === val ? a + 1 : a), 0);

class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            cart: [],
            popperStatus: false,
            submitDisabled: false,
        };
    }

    handleOpen = (event) => {
        this.setState({ popperStatus: true });

        const { data, cart } = this.state;
        let disabled = false;

        for (let i = 0; i < cart.length; i++) {
            if (
                data.indexOf(cart[i].Name) !== -1 ||
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
                    id: Date.now(),
                },
            ],
        });
    };

    deleteItem = (id) => {
        this.setState({ cart: this.state.cart.filter((c) => c.id !== id) });
    };

    handleOtherChange = (event, id) => {
        const { value } = event.target;

        this.setState({
            cart: this.state.cart.map((c) => {
                if (c.id !== id) return c;
                return { ...c, [event.target.name]: value };
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
                }
            }, timeOutValue);
        }
    };

    submitItem = () => {
        try {
            this.state.cart.map(
                async (c) =>
                    await item.add({
                        Name: c.Name,
                        Unit: c.Unit,
                        Qty: c.Qty,
                    })
            );
        } catch (error) {
            console.log(error);
        }

        this.setState({ cart: [] });
        this.handleClose();

        alert(" Successfully Added ");
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
                        <AddItemTable
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
                        <AddItemPopup data={data} cart={cart} />
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

export default AddItem;
