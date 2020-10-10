import React, {Component} from 'react';
import TransactionTable from "../../components/Admin/TransactionTable";
import axios from "axios"
import moment from "moment";

class Transaction extends Component {
    state = {
        data:[],
        loadCheck:false,
        loadOrder:false,
    };
    componentDidMount() {

        axios.get("http://localhost:8000/api/checkin/")
            .then(res => {
                console.log(res.data)
                let check = res.data
                check.map(checks => {
                    let obj = {"id": null, "quantity": null, "date": null, "tags": null}
                    obj.id = checks.productId
                    obj.quantity = checks.quantity
                    obj.date = moment(checks.checkInDate).format('MMM DD, YYYY')
                    obj.tags = ["checkin",]
                    obj.order=checks.checkInDate
                    console.log(obj)
                    this.state.data.push(obj)
                    this.setState({
                        loadCheck: true
                    })
                    console.log("True")
                })
            })
        axios.get("http://localhost:8000/api/order/?status="+true)
            .then(res => {
                let ord = res.data
                ord.map(order => {
                    let obj = {"id": null, "quantity": null, "date": null, "tags": null}
                    obj.id = order.productId
                    obj.quantity = order.quantity
                    obj.date = moment(order.shippedDate).format('MMM DD, YYYY')
                    obj.tags = ["shipped",]
                    obj.order= order.shippedDate
                    this.state.data.push(obj)
                })
                this.setState({
                    loadOrder:true
                })
                console.log("True")
            })
    }


    render(){
        if (this.state.loadCheck || this.state.loadOrder)
            this.state.data.sort((a,b) => (a.order < b.order) ? 1 : -1)
        return (
            <div>
                {
                    this.state.loadCheck || this.state.loadOrder
                        ?
                        <div style={{width: '1080px'}}>
                            <h3>Transaction Table</h3>
                            <TransactionTable data={this.state.data}/>
                        </div>

                        :
                    ""
                }
            </div>
        );
    }
}

export default Transaction;