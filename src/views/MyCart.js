import React, {Component} from 'react';
import "../assets/css/MyCart.scss"
import ShoppingCart from "../containers/ShoppingCart/ShoppingCart";
import OrderSummary from "../containers/OrderSummary/OrderSummary";

class MyCart extends Component {
    render(){
        if(!localStorage.getItem("token")){
            window.location = "/"
        }
        return(
            <section className={"home-style"}>
                <ShoppingCart/>
                <OrderSummary/>
            </section>
        );
    }
}

export default MyCart;