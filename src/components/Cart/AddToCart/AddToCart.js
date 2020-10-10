import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from '../../../store/actions/cart'
import {message} from "antd";

const AddToCart = (props) => {

    const dispatch = useDispatch();

    // <div className="add-cart">
    //     <button className={"add"}>Add to cart</button>
    // </div>
    return(
        <div
            className={"add-cart"}
            onClick={
                () => {
                    message.success("Product Added")
                    dispatch(addToCart(
                        props.info.id,
                        props.info.name,
                        1,
                        props.info.price,
                        props.info.image
                    ))}}>
            <button className={"add"}>Add to cart</button>
        </div>
    )
};


export default AddToCart;
