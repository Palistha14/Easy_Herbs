const initState =[];

const cartReducer = (state, action)=>{
    let id;
    if(typeof state === 'undefined')
        return initState;
    switch (action.type) {

        case 'ADD_TO_CART':
            id = state.findIndex(item=>{
                return item.id===action.payload.id
            });
            if(id>=0) state[id].quantity += action.payload.quantity;
            else state.push(action.payload);
            // if(state[id].quantity < 1) state[id].quantity=1;
            return state;

        case  'REMOVE_FROM_CART':
            return state.filter(item=>{
                return item.id!==action.payload.id
            });

        case 'QUANTIFY':
            id = state.findIndex(item=>{
                return item.id===action.payload.id
            });
            if(id>0) state[id].quantity = action.payload.quantity;
            else state.push(action.payload)
            return state;

        default :
            return state;
    }
};

export default cartReducer;