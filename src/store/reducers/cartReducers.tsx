import * as actions from "./cartActions";
import { Reducer } from 'redux';
interface IProduct {
    _id: string;
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
    payload:string,
}

interface UpdateQuantityInterface{
    type:typeof actions.UPDATE_QT,
    payload:{_id:string; qty:number}
}

type CartAction=AddItemInterface|RemoveItemInterface| UpdateQuantityInterface;


export const cartReducer:Reducer<CartState, CartAction> =(state=initialState,action)=>{
    switch(action.type){
        case actions.ADD_ITEM:{
            const newItem=action.payload;
            const existingItem=state.items.find((item)=> item._id===newItem._id);
            if(!existingItem){
                return {...state,items:[...state.items,newItem]}
            }
            else{
                return state;
            }
        }
        case actions.REMOVE_ITEM:{
            const itemId=action.payload;
            return {...state,items:state.items.filter((item)=>item._id !==itemId)};
        }
        case actions.UPDATE_QT:{
            const {_id,qty}=action.payload;
            const updatedItems=state.items.map((item)=>
                item._id===_id ? {...item,qty} :item
            )
            return {...state,items:updatedItems};
        }
        default: return state;
    }
}