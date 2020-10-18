import React, { Component } from "react";

import MyButton from "../my-button/my-button";
import InputField from "../input-field/inputfield.component";

import { seller } from "../../server/apis/seller.api.js";

let timerID;
const timeOutValue = 500;
let sellerDataSet = new Set();

class Seller extends Component {
    constructor() {
        super();

        this.state = {
            Name: "",
            Error: false,
            helperText: "",
            data: [],
        };
    }

    handleChange = (event) => {
        let error = false;
        let helperText = "";
        const { name, value } = event.target;

        this.setState({ [name]: value });

        if (timerID) clearTimeout(timerID);

        timerID = setTimeout(async () => {
            timerID = undefined;
            const searchData = value;

            if (searchData !== "") {
                let res = await seller.autoCompleteData(searchData);
                let arr = [];
                if (res) {
                    for (let i = 0; i < res.SellerNames.length; i++) {
                        arr.push({ Name: res.SellerNames[i] });
                    }
                }
                res = arr;
                for (let i = 0; i < res.length; i++) {
                    if (!sellerDataSet.has(res[i].Name)) {
                        this.setState({ data: this.state.data.concat(res[i].Name) });
                        sellerDataSet.add(res[i].Name);
                    }
                }
            }
        }, timeOutValue);

        if (this.state.data.indexOf(value) !== -1) {
            error = true;
            helperText = "This Seller is already added";
        } else if (value === "") {
            error = true;
            helperText = "Seller name cannot be empty";
        }

        this.setState({
            Error: error,
            helperText: helperText,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const sellerData = {
            Name: this.state.Name,
        };

        if (!this.state.Error) {
            try {
                await seller.add(sellerData);

                alert("successfully Registered");

                this.setState({
                    Name: "",
                    Error: false,
                    helperText: "",
                });
            } catch (error) {
                alert(" something went wring try again ");
            }
        } else {
            alert("Enter valid Name");
        }
    };

    componentDidMount() {
        sellerDataSet.clear();
    }

    render() {
        const { Name, Error, data, helperText } = this.state;

        return (
            <div className='sign-up'>
                <form onSubmit={this.handleSubmit}>
                    <InputField
                        className='col-4 col-s-4'
                        name='Name'
                        value={Name}
                        onChange={this.handleChange}
                        type='text'
                        label='FULL NAME'
                        error={Error}
                        helperText={helperText}
                        datalist={data}
                    />

                    <MyButton className='button' variant='contained' type='submit' color='secondary'>
                        ADD SELLER
                    </MyButton>
                </form>
            </div>
        );
    }
}

export default Seller;
