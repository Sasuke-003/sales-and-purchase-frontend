import React, { Component } from "react";

import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import HistoryDisplay from "../history-display/history-display.component";

import { purchase } from "../../server/apis/purchase.api";

class PurchaseHistory extends Component {
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
        let uid = this.props.currentUser.Uid;
        let res = null;
        if (this.props.currentUser.Type === "a") {
            res = await purchase.list(this.state.page, uid);
        } else {
            res = await purchase.list(this.state.page, 0);
        }
        for (let i = 0; i < res.length; i++) {
            res[i]["_id"] = res[i].PurchaseID;
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
                        <HistoryDisplay purchaseHistory={h} setHistoryToState={this.setHistoryToState} />
                        <br />
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

export default connect(mapStatetoProps)(PurchaseHistory);
