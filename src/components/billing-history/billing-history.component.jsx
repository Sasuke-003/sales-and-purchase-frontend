import { connect } from "react-redux";
import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import BillingHistoryDisplay from "../billing-history-display/billing-history-display.component";

import { sale } from "../../server/apis/sale.api";

class BillingHistory extends Component {
    constructor() {
        super();

        this.state = {
            page: 0,
            maxPage: 0,
            history: [],
        };
    }

    incrementPage = () => {
        this.setState(
            (prevState, props) => ({
                page: prevState.page + 1,
            }),
            () => {
                this.setHistoryToState();
            }
        );
    };

    decrementPage = () => {
        if (this.state.page !== 0) {
            this.setState(
                (prevState, props) => ({
                    page: prevState.page - 1,
                }),
                () => {
                    this.setHistoryToState();
                }
            );
        }
    };

    setHistoryToState = async () => {
        let res = null;
        if (this.props.currentUser.Type === "a") {
            res = await sale.list(this.state.page, this.props.currentUser.Uid);
        } else {
            res = await sale.list(this.state.page, 0);
        }
        for (let i = 0; i < res.length; i++) {
            res[i]["_id"] = res[i].SaleID;
        }
        this.setState({ history: res });
    };

    componentDidMount() {
        this.setHistoryToState();
    }

    render() {
        return (
            <div>
                <IconButton aria-label='delete' onClick={this.decrementPage} disabled={this.state.page === 0 ? true : false}>
                    <NavigateBeforeIcon fontSize='large' />
                </IconButton>

                {this.state.page + 1}

                <IconButton aria-label='delete' onClick={this.incrementPage}>
                    <NavigateNextIcon fontSize='large' />
                </IconButton>

                {this.state.history.map((h) => (
                    <div key={h._id}>
                        <BillingHistoryDisplay billingHistory={h} setHistoryToState={this.setHistoryToState} />
                        <Divider />
                    </div>
                ))}
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStatetoProps)(BillingHistory);
