import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { addToCart } from '../../../store/actions/cart'

const ManageCart = (props) => {
    const logInfo = useSelector(state => state.logged)
    const dispatch = useDispatch();

    if(logInfo.status)
        return(
            <div className={"add-to-cart"} onClick={()=> {dispatch(addToCart(props.info.id, props.info.name))}}>
                Add to cart
            </div>
        )
    else return null
};

export default ManageCart;
