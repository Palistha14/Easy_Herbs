import React, {Component} from 'react';
import {connect, useSelector} from "react-redux";
import axios from 'axios';
import {Alert} from "antd";


class Order extends Component {
    state = {
        product: '',
        id:"",
        price: '',
        quantity: '',
        user_id: '',
        random: 0,
        success:false,
        error:false,
    };
    handleSubmit = () => {
        const orderId = getOrderId(10);
        let form_data;
        let date = new Date();
        console.log(this.props.username)
        axios.get(`http://localhost:8000/api/customer/?username=${this.props.username}`)
            .then(res=>{
                console.log(res.data)
                this.setState({
                    user_id: res.data[0].id
                })
                this.props.cart.map((item,index)=> {
                    {console.log(this.state.user_id)}
                    form_data = new FormData();
                    form_data.append('orderId', orderId);
                    form_data.append('productId', item.id);
                    form_data.append('userId', this.state.user_id);
                    form_data.append('quantity', item.quantity);
                    let url = 'http://localhost:8000/api/order/';
                    axios.post(url, form_data, {
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                        .then(res => {
                            console.log(res.data);
                            this.setState({
                                success: true
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            this.setState({
                                error: true
                            })
                        })
                    console.log(form_data)
                })
            });

    };

    render() {
        console.log(this.props.username)
        return (
            <div className="checkout">
                {this.state.success?
                    <Alert message="Success Text" type="success" />
                     :
                    ""
                }
                {/*{this.state.success? window.location="/" : ""}*/}
                {this.state.error? <Alert message="Error Text" type="error" /> : ""}
                <div className="orderSummary fullWidth">
                    <h2 className="fullWidth">Order Summary</h2>
                    <ul className="fullWidth">
                        {this.props.cart.map((item,index)=>(
                            <ItemList key={index} info={item}/>
                        ))}
                        <li className="summaryTotal">
                            <span className="floatleft">Total</span>
                            <span className="floatright"><em className="rupeeSymbol">रू  </em> {getTotal(this.props.cart)}</span>
                        </li>
                    </ul>
                    <button className="buy" onClick={this.handleSubmit}>Order</button>
                    <i className="fullWidth">Above prices are inclusive of taxes, if applicable</i>
                </div>
            </div>
        );
    }
}

const OrderSummary = props => {
    const cart = useSelector(state=>state.cart);
    return (
        <Order cart={cart} {...props}/>
    );
};

function getOrderId(string_length){
    let random_string = '';
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
}

const getTotal=cart=>{
    let sum=0;
    cart.map(item=>{
        sum+=item.price*item.quantity
    });
    return (sum);

};

const ItemList=props=>{
    return(
        <li>
            <span className="floatleft">{props.info.name}</span>
            <span className="floatright"><em className="rupeeSymbol">रू  </em> {props.info.price*props.info.quantity}</span>
        </li>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.logged.token !== null,
        username: state.logged.username
    }
};

export default connect(mapStateToProps, null)(OrderSummary);