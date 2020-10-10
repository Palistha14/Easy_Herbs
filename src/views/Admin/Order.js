import React, {Component} from 'react';
import OrderSummary from "../../containers/OrderSummary/OrderSummary";
import OrderTable from "../../components/Admin/OrderTable";
import axios from "axios"

class Order extends Component {
    state = {
        data:[]
    }
    componentDidMount() {
        axios.get("http://localhost:8000/api/order/?ordering=-orderedDate")
            .then(res => {
                // console.log(res.data)
                this.setState({
                    data:res.data
                })
            })
    }

    render() {
        return (
            <div>
                <h3>Order Table</h3>
                <OrderTable data = {this.state.data}/>
            </div>
        );
    }
}

export default Order;