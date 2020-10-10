import React from 'react';
import ProductCartList from "../../components/ProductCartList/ProductCartList";
import {useHistory} from "react-router";

const ShoppingCart = () => {

        const history = useHistory()
        return (
            <div className="combine-div">
                <div><p className="p2-cart">Your shopping cart</p></div>
                <div className="pro-title">
                    <div className="t1">Products</div>
                    <div className="t2">Total Price</div>
                </div>
                <ProductCartList/>
                <div className="shop-button">
                    <button className="b1-continue" onClick={()=>{history.push("/home");}}>Continue Shopping</button>
                </div>
            </div>
        );
}

export default ShoppingCart;