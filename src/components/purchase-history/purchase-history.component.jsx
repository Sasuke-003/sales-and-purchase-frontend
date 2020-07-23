import React, { Component } from 'react';
import HistoryDisplay from '../history-display/history-display.component'
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { connect } from 'react-redux'



class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            page: 0,
            history: [{},{},{}],
        }
    }

    componentDidMount(){
        const { currentUser } = this.props;
        let url = '';
        if (currentUser.Type === 'a'){
            url = '/purchase/list-all';
        }
        else{
            url = '/purchase/list-my';
        }
        axios.post(url, {P:this.state.page}).then((res) => {
            this.setState({
                history: res
            })}
            ).catch((error) => {
                console.log(error)
            })
            
    }
    
    render() {
        return (
            <div>
                {
                    this.state.history.map((h, index) => (
                        <div>
                            <HistoryDisplay  key={index} purchaseHistory={h} />
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


export default connect(mapStatetoProps)(PurchaseHistory);