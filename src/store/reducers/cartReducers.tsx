import * as actions from "./cartActions";
import { Reducer } from 'redux';
interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    ratingCount: number;
    image_url: string;
    qty:number;
}
interface CartState{
    items:IProduct[];
}

const initialState:CartState={
    items:[]
}

interface AddItemInterface{
    type:typeof actions.ADD_ITEM,
    payload:IProduct,
}

interface RemoveItemInterface{
    type:typeof actions.REMOVE_ITEM,
    payload:{
        itemId:string;
    },
}

interface UpdateQuantityInterface{
    type:typeof actions.UPDATE_QT,
    payload:{_id:string; qty:number}
}
interface ClearCartInterface{
    type:typeof actions.CLEAR_CART,
};
type CartAction=AddItemInterface|RemoveItemInterface| UpdateQuantityInterface |ClearCartInterface;


export const cartReducer:Reducer<CartState, CartAction> =(state=initialState,action)=>{
    switch(action.type){
        case actions.ADD_ITEM:{
            let newItem=action.payload;
            newItem={...newItem,qty:1};
            const existingItem=state.items.find((item)=> item._id===newItem._id);
            if(!existingItem){
                return {...state,items:[...state.items,newItem]}
            }
            else{
                return state;
            }
        }
        case actions.REMOVE_ITEM: {
            const {itemId} = action.payload;
            const updatedItems = state.items.filter((item) => item._id !== itemId);
            return { ...state, items: [...updatedItems] };
        }
        case actions.UPDATE_QT:{
            const {_id,qty}=action.payload;
            let updatedItems=state.items.map((item)=>
                item._id===_id ? {...item,qty} :item
            )
            updatedItems = updatedItems.filter((item) => item.qty > 0);
            return {...state,items:updatedItems};
        }
        case actions.CLEAR_CART:{
            return {items:[]};
        }
        default: return state;
    }
}