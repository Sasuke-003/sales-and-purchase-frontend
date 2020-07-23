import React, { Component } from 'react';
import HistoryDisplay from '../history-display/history-display.component'
import Divider from '@material-ui/core/Divider';
import axios from 'axios';




class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            page: 0,
            history: [],
        }
    }

    setHistoryToState = () => {
        axios.post('/purchase/list-all', {P:this.state.page}).then((res) => {
            this.setState({
                history: res
            })}
            ).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount(){
            this.setHistoryToState();
    }
    
    render() {
        return (
            <div>
                {
                    this.state.history.map((h,) => (
                        <div key={h._id}>
                            <HistoryDisplay purchaseHistory={h} setHistoryToState={this.setHistoryToState} />
                            <Divider />
                        </div>
                    ))
                }
            </div>
        );
    }
}


const mapStatetoProps = state => ({
    currentUser: state.user.currentUser
});


export default PurchaseHistory