import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../../store/actions/cart";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const ProductCartList = () => {
    const cart = useSelector(state => state.cart);

    return (
        <main>
            {cart.length>0 ? cart.map((item,index) => (
                <CartItem key={index} item={item}/>
                )) : "You have nothing in the cart"}
        </main>
    )
};

const CartItem = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div className="items">
            <div className="image-name">
                <div className="pro-image">
                    <img src={props.item.image} alt=""/>
                </div>
                <div className="pro-detail">
                    <div className="pro_name">
                        {props.item.name}
                    </div>
                    <div className="main-quantity">
                        <div className="pro-quantity">
                            <div className="qty">Qty</div>
                            <div className="input-qty">
                                <form>
                                    <input type="number" id={props.key} className="qty-textbox" value={props.item.quantity}/>
                                </form>
                            </div>
                        </div>
                        <div className="add-qty">
                            <button
                                className="add"
                                onClick={
                                    () => {
                                        dispatch(addToCart(
                                            props.item.id,
                                            props.item.name,
                                            1,
                                            props.item.price,
                                            props.item.image
                                        ));
                                        history.push('/mycart');
                                    }}>
                                +
                            </button>
                        </div>
                        <div className="subtract-qty">
                            <button
                                className="subtract"
                                onClick={
                                    () => {
                                        dispatch(addToCart(
                                            props.item.id,
                                            props.item.name,
                                            -1,
                                            props.item.price,
                                            props.item.image
                                        ));
                                        history.push('/mycart');
                                    }}>
                                -
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pro-price">
                <span className="offer-price"><em className="rupeeSymbol">रू  </em> {props.item.price}</span>
                <div className="cartAction">
                    {/*<div className="move">*/}
                    {/*    <a className="moveToCart" href="#">Move To Wishlist</a>*/}
                    {/*</div>*/}
                    <div className="clear">
                        <Link className="clearCart" to={"/mycart"} onClick={()=>{dispatch(removeFromCart(props.item.id))}}>Delete Item</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCartList