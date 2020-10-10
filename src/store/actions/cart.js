import * as aT from "./actionTypes";

export const addToCart = (id, name, quantity, price, image) => {
    return {
        type: aT.ADD_TO_CART,
        payload:{
            id,
            name,
            quantity,
            price,
            image
        }
    }
};

export const removeFromCart = (id) => {
    return {
        type:aT.REMOVE_FROM_CART,
        payload:{
            id,
        }
    }
};

export const quantify = () => {
    return {
        type:aT.QUANTIFY_CART,
    }
};